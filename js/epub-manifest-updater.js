/**
 * EpubManifestUpdater - Handles EPUB OPF file modifications for chapter splitting
 * Manages manifest item insertion, spine reordering, and XML namespace preservation
 */

class EpubManifestUpdater {
    constructor() {
        // Common EPUB namespaces
        this.namespaces = {
            opf: 'http://www.idpf.org/2007/opf',
            dc: 'http://purl.org/dc/elements/1.1/',
            dcterms: 'http://purl.org/dc/terms/',
            xsi: 'http://www.w3.org/2001/XMLSchema-instance'
        };
    }

    /**
     * Updates the OPF manifest with new chapter files, inserting them after the original item.
     * @param {string} opfContent - Original OPF file content
     * @param {string} originalId - The ID of the original manifest item to insert after.
     * @param {Array<Object>} newFiles - Array of new file objects to add
     * @returns {string} - Updated OPF content
     */
    updateManifest(opfContent, originalId, newFiles) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(opfContent, 'application/xml');
            
            const parserError = doc.querySelector('parsererror');
            if (parserError) {
                throw new Error('Failed to parse OPF file: ' + parserError.textContent);
            }

            const manifest = doc.querySelector('manifest');
            if (!manifest) throw new Error('No manifest element found in OPF file');

            const originalItem = manifest.querySelector(`item[id="${originalId}"]`);
            if (!originalItem) throw new Error(`Original item with id "${originalId}" not found in manifest`);

            let currentItem = originalItem;
            for (const file of newFiles) {
                const item = doc.createElementNS(this.namespaces.opf, 'item');
                item.setAttribute('id', file.id);
                item.setAttribute('href', file.href);
                item.setAttribute('media-type', file.mediaType || 'application/xhtml+xml');
                
                if (file.properties) {
                    item.setAttribute('properties', file.properties);
                }
                
                // Insert after the current item (the original, then the previously inserted one)
                currentItem.parentNode.insertBefore(item, currentItem.nextSibling);
                currentItem = item; // Next item will be inserted after this one
            }

            return this._serializeXml(doc);
        } catch (error) {
            throw new Error(`Failed to update manifest: ${error.message}`);
        }
    }

    /**
     * Updates the spine, inserting new itemrefs after the original.
     * @param {string} opfContent - Original OPF file content
     * @param {string} originalId - ID of the original chapter to insert after
     * @param {Array<string>} newIds - Array of new chapter IDs to insert
     * @returns {string} - Updated OPF content
     */
    updateSpine(opfContent, originalId, newIds) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(opfContent, 'application/xml');
            
            const parserError = doc.querySelector('parsererror');
            if (parserError) {
                throw new Error('Failed to parse OPF file: ' + parserError.textContent);
            }

            const spine = doc.querySelector('spine');
            if (!spine) throw new Error('No spine element found in OPF file');

            const originalItemref = spine.querySelector(`itemref[idref="${originalId}"]`);
            if (!originalItemref) {
                 // If the original ID is not in the spine, we don't need to do anything.
                console.warn(`Original itemref with id "${originalId}" not found in spine, skipping spine update for it.`);
                return opfContent;
            }

            const linearValue = originalItemref.getAttribute('linear') || 'yes';
            
            let currentItemref = originalItemref;
            for (const id of newIds) {
                const itemref = doc.createElementNS(this.namespaces.opf, 'itemref');
                itemref.setAttribute('idref', id);
                if (linearValue) {
                    itemref.setAttribute('linear', linearValue);
                }
                
                currentItemref.parentNode.insertBefore(itemref, currentItemref.nextSibling);
                currentItemref = itemref;
            }

            return this._serializeXml(doc);
        } catch (error) {
            throw new Error(`Failed to update spine: ${error.message}`);
        }
    }

    /**
     * Performs both manifest and spine updates in a single operation
     * @param {string} opfContent - Original OPF file content
     * @param {Object} updateData - Object containing update information
     * @returns {string} - Updated OPF content
     */
    updateManifestAndSpine(opfContent, updateData) {
        try {
            const { originalId, newFiles } = updateData;
            
            if (!originalId || !newFiles || !Array.isArray(newFiles)) {
                throw new Error('Invalid update data: originalId and newFiles array required');
            }

            // First update the manifest
            let updatedContent = this.updateManifest(opfContent, newFiles);
            
            // Then update the spine with the new IDs
            const newIds = newFiles.map(file => file.id);
            updatedContent = this.updateSpine(updatedContent, originalId, newIds);

            return updatedContent;
        } catch (error) {
            throw new Error(`Failed to update manifest and spine: ${error.message}`);
        }
    }

    /**
     * Preserves XML structure and namespaces during serialization
     * @param {Document} doc - XML document to serialize
     * @returns {string} - Serialized XML content
     * @private
     */
    _serializeXml(doc) {
        try {
            const serializer = new XMLSerializer();
            let xmlString = serializer.serializeToString(doc);
            
            // Ensure proper XML declaration if missing
            if (!xmlString.startsWith('<?xml')) {
                xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlString;
            }

            return xmlString;
        } catch (error) {
            throw new Error(`Failed to serialize XML: ${error.message}`);
        }
    }

    /**
     * Validates OPF file structure and required elements
     * @param {string} opfContent - OPF file content to validate
     * @returns {Object} - Validation result with success flag and details
     */
    validateOpfStructure(opfContent) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(opfContent, 'application/xml');
            
            // Check for parsing errors
            const parserError = doc.querySelector('parsererror');
            if (parserError) {
                return {
                    valid: false,
                    error: 'XML parsing error: ' + parserError.textContent
                };
            }

            // Check for required elements
            const packageElement = doc.querySelector('package');
            const manifest = doc.querySelector('manifest');
            const spine = doc.querySelector('spine');
            const metadata = doc.querySelector('metadata');

            const missing = [];
            if (!packageElement) missing.push('package');
            if (!manifest) missing.push('manifest');
            if (!spine) missing.push('spine');
            if (!metadata) missing.push('metadata');

            if (missing.length > 0) {
                return {
                    valid: false,
                    error: `Missing required elements: ${missing.join(', ')}`
                };
            }

            return {
                valid: true,
                elements: {
                    package: packageElement,
                    manifest: manifest,
                    spine: spine,
                    metadata: metadata
                }
            };
        } catch (error) {
            return {
                valid: false,
                error: `Validation error: ${error.message}`
            };
        }
    }

    /**
     * Extracts existing manifest items for reference
     * @param {string} opfContent - OPF file content
     * @returns {Array<Object>} - Array of existing manifest items
     */
    getExistingManifestItems(opfContent) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(opfContent, 'application/xml');
            
            const manifest = doc.querySelector('manifest');
            if (!manifest) {
                return [];
            }

            const items = Array.from(manifest.querySelectorAll('item'));
            return items.map(item => ({
                id: item.getAttribute('id'),
                href: item.getAttribute('href'),
                mediaType: item.getAttribute('media-type'),
                properties: item.getAttribute('properties')
            }));
        } catch (error) {
            console.error('Error extracting manifest items:', error);
            return [];
        }
    }

    /**
     * Extracts existing spine items for reference
     * @param {string} opfContent - OPF file content
     * @returns {Array<Object>} - Array of existing spine items
     */
    getExistingSpineItems(opfContent) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(opfContent, 'application/xml');
            
            const spine = doc.querySelector('spine');
            if (!spine) {
                return [];
            }

            const items = Array.from(spine.querySelectorAll('itemref'));
            return items.map(item => ({
                idref: item.getAttribute('idref'),
                linear: item.getAttribute('linear') || 'yes'
            }));
        } catch (error) {
            console.error('Error extracting spine items:', error);
            return [];
        }
    }

    /**
     * Generates unique IDs for new manifest items
     * @param {string} baseId - Base ID to use for generation
     * @param {number} count - Number of IDs to generate
     * @param {Array<string>} existingIds - Array of existing IDs to avoid conflicts
     * @returns {Array<string>} - Array of unique IDs
     */
    generateUniqueIds(baseId, count, existingIds = []) {
        const ids = [];
        const existingSet = new Set(existingIds);
        
        for (let i = 0; i < count; i++) {
            let newId;
            if (i === 0) {
                // First ID keeps the original base ID
                newId = baseId;
            } else {
                // Subsequent IDs get suffix
                newId = `${baseId}_-${i}`;
            }
            
            // Ensure uniqueness
            let counter = 0;
            let candidateId = newId;
            while (existingSet.has(candidateId)) {
                counter++;
                candidateId = `${newId}_${counter}`;
            }
            
            ids.push(candidateId);
            existingSet.add(candidateId);
        }
        
        return ids;
    }

    /**
     * Creates file objects for manifest updates from split chapter data
     * @param {Object} splitResult - Result from chapter splitting
     * @param {string} originalId - Original chapter ID
     * @param {Array<string>} existingIds - Existing manifest IDs
     * @returns {Array<Object>} - Array of file objects for manifest update
     */
    createManifestFiles(splitResult, originalId, existingIds = []) {
        try {
            if (!splitResult.filenames || !splitResult.contents) {
                throw new Error('Invalid split result: missing filenames or contents');
            }

            const uniqueIds = this.generateUniqueIds(originalId, splitResult.filenames.length, existingIds);
            
            return splitResult.filenames.map((filename, index) => ({
                id: uniqueIds[index],
                href: filename,
                mediaType: 'application/xhtml+xml'
            }));
        } catch (error) {
            throw new Error(`Failed to create manifest files: ${error.message}`);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EpubManifestUpdater;
}

// Make available globally for browser use
if (typeof window !== 'undefined') {
    window.EpubManifestUpdater = EpubManifestUpdater;
}