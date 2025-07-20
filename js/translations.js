// Translation data for Kobo Series Editor
const translations = {
    'zh-TW': {
        // Page title and header
        title: 'Kobo Series Editor - EPUB 系列索引生成工具',
        header: {
            title: 'Kobo Series Editor',
            subtitle: 'EPUB 系列索引生成 與 轉換成 KEPUB'
        },

        // Navigation and UI
        ui: {
            themeToggle: '切換主題',
            languageToggle: '切換語言',
            currentLanguage: '中文'
        },

        // Steps
        steps: {
            step1: {
                title: '選擇 EPUB 文件',
                description: '拖放您的 EPUB 文件/文件夹到下方區域，或點擊選擇文件',
                dropzone: {
                    title: '拖放 EPUB 文件/文件夹到這裡',
                    subtitle: '或點擊選擇文件 • 支援多個文件同時處理'
                },
                clearFiles: '清空所有文件'
            },
            step2: {
                title: '處理選項',
                description: '選擇您的 Kobo 設備型號和處理選項',
                coverAdjustment: {
                    title: '🖼️ 封面圖片調整',
                    description: '選擇您的 Kobo 設備型號以自動調整封面圖片尺寸'
                },
                seriesInfo: {
                    title: '📖 系列信息',
                    description: '為您的書籍添加系列名稱與索引，方便在 Kobo eReader中管理 <span class="info-tooltip"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg><span class="tooltip-content">此功能需要安裝 <a href="https://pgaskin.net/kepubify/ns/" target="_blank" class="nickelseries-link">NickelSeries</a></span></span>',
                    checkbox: '添加系列信息到書籍 Metadata'
                }
            },
            step3: {
                title: '開始處理',
                description: '準備處理您的 EPUB 文件',
                button: '🚀 準備轉換'
            },
            step4: {
                title: '輸入系列信息',
                description: '為您的書籍設置系列名稱和索引',
                seriesName: '系列名稱',
                placeholder: '例如：哈利波特系列',
                button: '⚡ 轉換為 KEPUB'
            },
            step5: {
                title: '轉換進度',
                description: '正在處理您的文件...',
                downloadAll: '📦 一鍵下載所有文件'
            }
        },

        // Device options
        devices: {
            skip: {
                name: '跳過',
                description: '不調整圖片'
            },
            clara: {
                name: 'Clara HD/Clara 2E',
                resolution: '1072×1448'
            },
            libra: {
                name: 'Libra H2O/Libra 2',
                resolution: '1264×1680'
            },
            forma: {
                name: 'Forma/Sage',
                resolution: '1440×1920'
            },
            elipsa: {
                name: 'Elipsa',
                resolution: '1404×1872'
            },
            aura: {
                name: 'Aura/Nia',
                resolution: '758×1024'
            }
        },

        // Status and progress messages
        status: {
            processing: '處理中...',
            completed: '完成',
            error: '錯誤',
            downloading: '下載中...',
            ready: '準備就緒',
            parsingEpub: '解析 EPUB 文件...',
            findingOpf: '查找 OPF 文件...',
            processingCover: '處理封面圖片...',
            applyingDuokan: '應用多看全屏設置...',
            addingSeries: '添加系列信息...',
            repackaging: '重新打包 EPUB...',
            convertingKepub: '轉換為 KEPUB...',
            allFilesCompleted: '所有文件處理完成！',
            fileCompleted: '文件處理完成！',
            download: '📥 下載',
            waiting: '等待中...',
            allDownloadsTriggered: '所有文件下載已觸發！',
            downloadTriggered: '已觸發下載',
            filesAdded: '已添加',
            totalFiles: '個文件，總計',
            fileRemoved: '文件已移除',
            allFilesCleared: '所有文件已清除',
            remove: '移除',
            addedSeriesInfo: '已添加系列信息'
        },

        // Footer
        footer: {
            originalProject: '原始項目：',
            codeBy: '，網站其餘代碼由',
            and: '與',
            generated: '產出',
            personalUse: '僅供個人學習交流使用，禁作商業用途'
        }
    },

    'en': {
        // Page title and header
        title: 'Kobo Series Editor - EPUB Series Index Generation Tool',
        header: {
            title: 'Kobo Series Editor',
            subtitle: 'EPUB Series Index Generation & KEPUB Conversion'
        },

        // Navigation and UI
        ui: {
            themeToggle: 'Toggle Theme',
            languageToggle: 'Switch Language',
            currentLanguage: 'English'
        },

        // Steps
        steps: {
            step1: {
                title: 'Select EPUB Files',
                description: 'Drag and drop your EPUB files/folders to the area below, or click to select files',
                dropzone: {
                    title: 'Drag and drop EPUB files/folders here',
                    subtitle: 'Or click to select files • Support multiple files processing'
                },
                clearFiles: 'Clear All Files'
            },
            step2: {
                title: 'Processing Options',
                description: 'Choose your Kobo device model and processing options',
                coverAdjustment: {
                    title: '🖼️ Cover Image Adjustment',
                    description: 'Select your Kobo device model to automatically adjust cover image size'
                },
                seriesInfo: {
                    title: '📖 Series Information',
                    description: 'Add series names and index to your ebooks for better organization on your Kobo eReader <span class="info-tooltip"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg><span class="tooltip-content">This feature requires <a href="https://pgaskin.net/kepubify/ns/" target="_blank" class="nickelseries-link">NickelSeries</a> to be installed</span></span>',
                    checkbox: 'Add series information to book metadata'
                }
            },
            step3: {
                title: 'Start Processing',
                description: 'Prepare to process your EPUB files',
                button: '🚀 Prepare Conversion'
            },
            step4: {
                title: 'Enter Series Information',
                description: 'Set series names and index for your books',
                seriesName: 'Series Name',
                placeholder: 'e.g., Harry Potter Series',
                button: '⚡ Convert to KEPUB'
            },
            step5: {
                title: 'Conversion Progress',
                description: 'Processing your files...',
                downloadAll: '📦 Download All Files'
            }
        },

        // Device options
        devices: {
            skip: {
                name: 'Skip',
                description: 'No image adjustment'
            },
            clara: {
                name: 'Clara HD/Clara 2E',
                resolution: '1072×1448'
            },
            libra: {
                name: 'Libra H2O/Libra 2',
                resolution: '1264×1680'
            },
            forma: {
                name: 'Forma/Sage',
                resolution: '1440×1920'
            },
            elipsa: {
                name: 'Elipsa',
                resolution: '1404×1872'
            },
            aura: {
                name: 'Aura/Nia',
                resolution: '758×1024'
            }
        },

        // Status and progress messages
        status: {
            processing: 'Processing...',
            completed: 'Completed',
            error: 'Error',
            downloading: 'Downloading...',
            ready: 'Ready',
            parsingEpub: 'Parsing EPUB file...',
            findingOpf: 'Finding OPF file...',
            processingCover: 'Processing cover image...',
            applyingDuokan: 'Applying Duokan fullscreen settings...',
            addingSeries: 'Adding series information...',
            repackaging: 'Repackaging EPUB...',
            convertingKepub: 'Converting to KEPUB...',
            allFilesCompleted: 'All files processing completed!',
            fileCompleted: 'File processing completed!',
            download: '📥 Download',
            waiting: 'Waiting...',
            allDownloadsTriggered: 'All file downloads triggered!',
            downloadTriggered: 'Download triggered',
            filesAdded: 'Added',
            totalFiles: 'files, total',
            fileRemoved: 'File removed',
            allFilesCleared: 'All files cleared',
            remove: 'Remove',
            addedSeriesInfo: 'Added series information'
        },

        // Footer
        footer: {
            originalProject: 'Original Project: ',
            codeBy: ', website code generated using ',
            and: ' and ',
            generated: ' ',
            personalUse: ' '
        }
    }
};

// Language Manager Class
class LanguageManager {
    constructor() {
        this.currentLanguage = this.loadPreference() || 'zh-TW';
        this.translations = translations;
        this.init();
    }

    init() {
        this.updateAllText();
        this.setupLanguageToggle();
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    setLanguage(languageCode) {
        if (this.translations[languageCode]) {
            this.currentLanguage = languageCode;
            this.savePreference(languageCode);
            this.updateAllText();
            this.updateLanguageToggle();

            // Update document title
            document.title = this.getTranslation('title');
        }
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];

        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                // Fallback to Chinese if English translation missing
                translation = this.translations['zh-TW'];
                for (const fallbackKey of keys) {
                    if (translation && translation[fallbackKey]) {
                        translation = translation[fallbackKey];
                    } else {
                        console.warn(`Missing translation for key: ${key}`);
                        return key; // Return key as fallback
                    }
                }
                break;
            }
        }

        return translation;
    }

    updateAllText() {
        // Update elements with data-i18n attributes
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);

            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else {
                // Check if translation contains HTML (links, formatting)
                if (translation.includes('<a ') || translation.includes('**')) {
                    // Handle HTML content and markdown-style formatting
                    let htmlContent = translation
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Convert **text** to <strong>text</strong>
                    element.innerHTML = htmlContent;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update download buttons
        const downloadButtons = document.querySelectorAll('.btn-download');
        downloadButtons.forEach(button => {
            button.innerHTML = this.getTranslation('status.download');
        });

        // Update remove buttons in file list by regenerating the file list
        if (typeof updateFileList === 'function') {
            updateFileList();
        }

        // Update document title
        document.title = this.getTranslation('title');
    }

    setupLanguageToggle() {
        // Create language toggle button if it doesn't exist
        let langToggle = document.getElementById('languageToggleBtn');
        if (!langToggle) {
            langToggle = document.createElement('button');
            langToggle.id = 'languageToggleBtn';
            langToggle.className = 'language-toggle-btn';
            langToggle.setAttribute('aria-label', 'Switch Language');

            // Insert after theme toggle button
            const themeToggle = document.getElementById('themeToggleBtn');
            if (themeToggle) {
                themeToggle.parentNode.insertBefore(langToggle, themeToggle.nextSibling);
            } else {
                document.body.appendChild(langToggle);
            }
        }

        // Set up click handler
        langToggle.addEventListener('click', () => {
            const newLanguage = this.currentLanguage === 'zh-TW' ? 'en' : 'zh-TW';
            this.setLanguage(newLanguage);
        });

        this.updateLanguageToggle();
    }

    updateLanguageToggle() {
        const langToggle = document.getElementById('languageToggleBtn');
        if (langToggle) {
            langToggle.textContent = this.currentLanguage === 'zh-TW' ? '中' : 'EN';
            langToggle.title = this.getTranslation('ui.languageToggle');
        }
    }

    savePreference(languageCode) {
        try {
            localStorage.setItem('kobo-editor-language', languageCode);
        } catch (error) {
            console.warn('Could not save language preference:', error);
            // Fallback to sessionStorage
            try {
                sessionStorage.setItem('kobo-editor-language', languageCode);
            } catch (sessionError) {
                console.warn('Could not save language preference to sessionStorage:', sessionError);
            }
        }
    }

    loadPreference() {
        try {
            return localStorage.getItem('kobo-editor-language') ||
                sessionStorage.getItem('kobo-editor-language');
        } catch (error) {
            console.warn('Could not load language preference:', error);
            return null;
        }
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, LanguageManager };
}