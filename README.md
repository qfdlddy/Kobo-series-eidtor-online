# Kobo Series Editor

[English](#english) | [中文](#中文)

---

## English

Web-based tool for processing EPUB files for Kobo e-readers with series metadata management and KEPUB conversion. (KEPUB conversion is using [Kepubify](https://github.com/pgaskin/kepubify/)).

### Features

- **EPUB File Management**
  - Drag-and-drop file selection
  - Batch processing
  - Folder upload with automatic series name detection

- **Cover Image Optimization**
  - Automatic resizing for Kobo devices (Clara HD/2E, Libra H2O/2, Forma/Sage, Elipsa, Aura/Nia)
  - Option to skip image processing

- **Series Metadata Management**
  - Add series names and indices
  - Automatic index extraction from filenames

- **KEPUB Conversion**
  - Convert EPUB to KEPUB format using Kepubify engine
  - Maintains metadata and formatting

- **Interface**
  - Dark/Light theme toggle
  - Multilingual support (English/Chinese)
  - Real-time progress tracking

### Quick Start

1. **Start a local web server:**
   ```bash
   # Using Python 3
   python -m http.server 8000
   

2. **Access the application:**
   Open `http://localhost:8000` in your browser

### Credits

- **Original Kepubify Project**: [pgaskin/kepubify](https://github.com/pgaskin/kepubify/)
- **NickelSeries Plugin**: [pgaskin/kepubify/ns](https://pgaskin.net/kepubify/ns/)
- **Code**: [Kiro](https://kiro.dev/), [Gemini CLI](https://github.com/google-gemini/gemini-cli)

---

## 中文

為 Kobo 電子書閱讀器處理 EPUB 文件的網頁工具，支持系列元數據管理和 KEPUB 轉換。

### 功能

- **EPUB 文件管理**
  - 拖放文件選擇
  - 批量處理
  - 文件夾上傳並自動檢測系列名稱

- **封面圖片優化**
  - 針對 Kobo 設備自動調整尺寸 (Clara HD/2E, Libra H2O/2, Forma/Sage, Elipsa, Aura/Nia)
  - 可選擇跳過圖片處理

- **系列元數據管理**
  - 添加系列名稱和索引
  - 從文件名自動提取索引

- **KEPUB 轉換**
  - 使用 Kepubify 引擎轉換 EPUB 為 KEPUB 格式
  - 保持元數據和格式

- **界面**
  - 深色/淺色主題切換
  - 多語言支持（英文/中文）
  - 實時進度跟踪

### 快速開始

1. **啟動本地網頁服務器：**
   ```bash
   # 使用 Python 3
   python -m http.server 8000
   
2. **訪問應用程序：**
   在瀏覽器中打開 `http://localhost:8000`

### 致謝

- **原始 Kepubify 項目**：[pgaskin/kepubify](https://github.com/pgaskin/kepubify/)
- **NickelSeries 插件**：[pgaskin/kepubify/ns](https://pgaskin.net/kepubify/ns/)
- **Code**：[Kiro](https://kiro.dev/)、[Gemini CLI](https://github.com/google-gemini/gemini-cli)