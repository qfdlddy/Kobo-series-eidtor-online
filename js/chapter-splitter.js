/**
 * ChapterSplitter - JavaScript implementation of EPUB chapter splitting functionality
 * Ports the Python logic from main.py to JavaScript for web-based processing
 */

class ChapterSplitter {
    constructor() {
        this.filenameWhitelist = new Set([
            'nav.xhtml',
            'toc.xhtml',
            'title.xhtml',
            'contents.xhtml',
            'content.xhtml',
            'author.xhtml',
            'cover.xhtml'
        ]);
    }

    /**
     * Determines the type of content in an HTML element
     * @param {Element} element - DOM element to analyze
     * @returns {string} - 'text', 'image', or 'whitespace'
     */
    getElementType(element) {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return 'whitespace';
        }

        // Check if the element itself is an image or SVG
        if (element.tagName === 'IMG' || element.tagName === 'SVG') {
            return 'image';
        }

        // Check if element contains images or SVGs
        const hasImage = element.querySelector('img, svg');
        
        if (!hasImage) {
            // No images found, check if it has meaningful text content
            const textContent = element.textContent?.trim() || '';
            return textContent ? 'text' : 'whitespace';
        } else {
            // Has images, check if it also has text after removing images
            const clonedElement = element.cloneNode(true);
            const images = clonedElement.querySelectorAll('img, svg');
            images.forEach(img => img.remove());
            
            const textContent = clonedElement.textContent?.trim() || '';
            return textContent ? 'text' : 'image';
        }
    }

    /**
     * Finds the main content container in the HTML body
     * @param {Element} bodyElement - The body element of the HTML document
     * @returns {Element|null} - The content container element
     */
    findContentContainer(bodyElement) {
        if (!bodyElement) return null;

        // Get direct child elements (not text nodes)
        const childElements = Array.from(bodyElement.children);
        
        // If there's only one child div, use it as the container
        if (childElements.length === 1 && childElements[0].tagName.toLowerCase() === 'div') {
            return childElements[0];
        }
        
        return bodyElement;
    }

    /**
     * Checks if a chapter needs splitting based on content analysis
     * @param {string} htmlContent - Raw HTML content of the chapter
     * @returns {boolean} - True if chapter needs splitting
     */
    needsSplitting(htmlContent) {
        try {
            const parser = new DOMParser();
            let doc = parser.parseFromString(htmlContent, 'application/xhtml+xml');
            
            // Check for parsing errors or missing body
            const parserError = doc.querySelector('parsererror');
            if (parserError || !doc.body) {
                console.warn('XHTML parsing failed, falling back to HTML parser');
                doc = new DOMParser().parseFromString(htmlContent, 'text/html');
            }
            
            return this._analyzeContentForSplitting(doc.body);
        } catch (error) {
            console.error('Error analyzing content for splitting:', error);
            return false;
        }
    }

    /**
     * Internal method to analyze content structure for splitting needs
     * @param {Element} bodyElement - Body element to analyze
     * @returns {boolean} - True if splitting is needed
     * @private
     */
    _analyzeContentForSplitting(bodyElement) {
        const contentContainer = this.findContentContainer(bodyElement);
        if (!contentContainer) return false;

        // Get meaningful child elements (skip whitespace-only text nodes)
        const children = Array.from(contentContainer.childNodes).filter(child => {
            if (child.nodeType === Node.ELEMENT_NODE) return true;
            if (child.nodeType === Node.TEXT_NODE) return child.textContent.trim() !== '';
            return false;
        });

        if (children.length < 2) return false;

        // Group consecutive elements by type
        const groups = this._groupElementsByType(children);
        
        // Need splitting if we have more than one group
        return groups.length > 1;
    }

    /**
     * Groups consecutive elements by their content type
     * @param {Array} children - Array of child nodes
     * @returns {Array} - Array of grouped elements
     * @private
     */
    _groupElementsByType(children) {
        const groups = [];
        let currentGroup = null;

        for (const child of children) {
            const elementType = this.getElementType(child);
            
            if (elementType === 'whitespace') continue;

            if (!currentGroup || currentGroup.type !== elementType) {
                currentGroup = {
                    type: elementType,
                    elements: []
                };
                groups.push(currentGroup);
            }
            
            currentGroup.elements.push(child);
        }

        return groups.filter(group => group.elements.length > 0);
    }

    /**
     * Splits chapter content into separate HTML files
     * @param {string} htmlContent - Original HTML content
     * @returns {Array<string>} - Array of HTML content strings for each split part
     */
    splitChapterContent(htmlContent) {
        try {
            const parser = new DOMParser();
            let doc = parser.parseFromString(htmlContent, 'application/xhtml+xml');
            
            const parserError = doc.querySelector('parsererror');
            if (parserError || !doc.body) {
                console.warn('XHTML parsing failed, trying HTML parser for splitting.');
                doc = new DOMParser().parseFromString(htmlContent, 'text/html');
            }

            const contentContainer = this.findContentContainer(doc.body);
            if (!contentContainer) {
                console.warn('No content container found for splitting.');
                return [];
            }

            const children = Array.from(contentContainer.childNodes).filter(child => {
                if (child.nodeType === Node.ELEMENT_NODE) return true;
                if (child.nodeType === Node.TEXT_NODE) return child.textContent.trim() !== '';
                return false;
            });

            if (children.length < 2) return [];

            const groups = this._groupElementsByType(children);
            if (groups.length <= 1) return [];

            const serializer = new XMLSerializer();
            const splitContents = [];

            for (const group of groups) {
                // Create a new document for each part, cloning the original's structure
                const newDoc = doc.cloneNode(true);
                const newContentContainer = this.findContentContainer(newDoc.body);
                
                // Clear the container in the new document
                while (newContentContainer.firstChild) {
                    newContentContainer.removeChild(newContentContainer.firstChild);
                }

                // Append the elements for the current group
                for (const element of group.elements) {
                    // Import the node into the new document before appending to handle namespaces correctly
                    const importedNode = newDoc.importNode(element, true);
                    newContentContainer.appendChild(importedNode);
                }

                // Serialize the new document to a string
                const fullHtml = serializer.serializeToString(newDoc);
                splitContents.push(fullHtml);
            }

            return splitContents;
        } catch (error) {
            console.error('Error splitting chapter content:', error);
            return [];
        }
    }

    /**
     * Extracts header and footer parts from HTML content
     * @param {string} htmlContent - Original HTML content
     * @param {string} containerTagName - Name of the container tag
     * @returns {Object|null} - Object with header and footer strings
     * @private
     */
    _extractHeaderFooter(htmlContent, containerTagName) {
        try {
            const lowerContent = htmlContent.toLowerCase();
            const openTagStart = lowerContent.indexOf(`<${containerTagName}`);
            const openTagEnd = htmlContent.indexOf('>', openTagStart);
            const closeTagStart = lowerContent.lastIndexOf(`</${containerTagName}>`);

            if (openTagStart === -1 || openTagEnd === -1 || closeTagStart === -1) {
                return null;
            }

            const header = htmlContent.substring(0, openTagEnd + 1);
            const footer = htmlContent.substring(closeTagStart);

            return { header, footer };
        } catch (error) {
            console.error('Error extracting header/footer:', error);
            return null;
        }
    }

    /**
     * Generates filenames for split chapter parts
     * @param {string} originalFilename - Original chapter filename
     * @param {number} partCount - Number of parts the chapter was split into
     * @returns {Array<string>} - Array of new filenames
     */
    generateSplitFilenames(originalFilename, partCount) {
        const lastDotIndex = originalFilename.lastIndexOf('.');
        const baseName = lastDotIndex !== -1 
            ? originalFilename.substring(0, lastDotIndex)
            : originalFilename;
        const extension = lastDotIndex !== -1 
            ? originalFilename.substring(lastDotIndex)
            : '';

        const filenames = [originalFilename]; // First part keeps original name
        
        for (let i = 1; i < partCount; i++) {
            filenames.push(`${baseName}_-${i}${extension}`);
        }

        return filenames;
    }

    /**
     * Checks if a filename should be skipped (is in whitelist)
     * @param {string} filename - Filename to check
     * @returns {boolean} - True if file should be skipped
     */
    shouldSkipFile(filename) {
        const baseName = filename.split('/').pop(); // Get just the filename part
        return this.filenameWhitelist.has(baseName);
    }

    /**
     * Main method to process chapter content and return splitting results
     * @param {string} htmlContent - Original HTML content
     * @param {string} filename - Original filename
     * @returns {Object} - Splitting result with success flag and data
     */
    processChapter(htmlContent, filename) {
        try {
            // Check if file should be skipped
            if (this.shouldSkipFile(filename)) {
                return {
                    success: true,
                    skipped: true,
                    reason: 'File in whitelist',
                    originalContent: htmlContent
                };
            }

            // Check if splitting is needed
            if (!this.needsSplitting(htmlContent)) {
                return {
                    success: true,
                    skipped: true,
                    reason: 'No splitting needed',
                    originalContent: htmlContent
                };
            }

            // Perform splitting
            const splitContents = this.splitChapterContent(htmlContent);
            
            if (splitContents.length <= 1) {
                return {
                    success: true,
                    skipped: true,
                    reason: 'Splitting failed or not beneficial',
                    originalContent: htmlContent
                };
            }

            // Generate filenames
            const filenames = this.generateSplitFilenames(filename, splitContents.length);

            return {
                success: true,
                skipped: false,
                splitCount: splitContents.length,
                contents: splitContents,
                filenames: filenames,
                originalFilename: filename
            };

        } catch (error) {
            console.error('Error processing chapter:', error);
            return {
                success: false,
                error: error.message,
                originalContent: htmlContent
            };
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChapterSplitter;
}

// Make available globally for browser use
if (typeof window !== 'undefined') {
    window.ChapterSplitter = ChapterSplitter;
}