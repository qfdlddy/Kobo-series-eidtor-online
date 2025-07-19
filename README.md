# Kobo Series Editor (Kepubify Web UI)

This is a web-based tool designed to process EPUB files for Kobo e-readers, offering features such as series index generation and conversion to KEPUB format. It provides a user-friendly interface for managing your e-book collection.

## Features

*   **EPUB File Selection:** Easily add EPUB files via drag-and-drop or file selection.
*   **Cover Image Adjustment:** Automatically resize cover images to optimize for various Kobo device resolutions.
*   **Series Metadata Management:** Add or edit series names and indices for better organization on your Kobo device.
*   **Duokan Fullscreen Fix:** Applies a fix for Duokan fullscreen display.
*   **KEPUB Conversion:** Convert processed EPUB files to the KEPUB format using the integrated Kepubify engine.
*   **Batch Processing:** Process multiple EPUB files simultaneously.
*   **Dark/Light Theme:** Toggle between dark and light themes for comfortable viewing.

## How to Use

1.  **Select EPUB Files:** Drag and drop your `.epub` files into the designated area, or click to browse and select them. You can add multiple files at once.
2.  **Choose Processing Options:**
    *   **Cover Image Adjustment:** Select your Kobo device model to automatically resize cover images to the optimal resolution. You can also choose to skip this step.
    *   **Series Information:** Check the box to enable adding series metadata to your books.
3.  **Prepare for Conversion:** Click the "準備轉換" (Prepare Conversion) button.
4.  **Enter Series Information (if enabled):** If you enabled series metadata, you will be prompted to enter a series name and adjust the index for each book. The tool attempts to extract initial indices from filenames.
5.  **Convert to KEPUB:** Click the "轉換為 KEPUB" (Convert to KEPUB) button to start the processing.
6.  **Download:** Once processed, you can download individual files or use the "一鍵下載所有文件" (Download All Files) button to get all processed books.

## Local Development / Running the Tool

This is a client-side web application. To run it locally:

1.  **Clone the repository:**
    ```bash
    git clone [repository_url]
    cd Kobo-series-eidtor-online
    ```
2.  **Serve the files:** Due to security restrictions (especially for WASM module loading), you cannot simply open `index.html` directly in your browser. You need a local web server.
    *   **Using Python:**
        ```bash
        python -m http.server 8000
        ```
    *   **Using Node.js (if you have `npx`):**
        ```bash
        npx http-server
        ```
    *   **Using VS Code Live Server Extension:** If you use VS Code, install the "Live Server" extension and open `index.html` with it.

    After starting the server, open your web browser and navigate to `http://localhost:8000` (or the address provided by your server).

## Credits

*   **Original Kepubify Project:** [pgaskin/kepubify](https://github.com/pgaskin/kepubify/)
*   **Website Code Contributions:**
    *   [Kiro](https://kiro.dev/)
    *   [Gemini-cli](https://github.com/google-gemini/gemini-cli)

This project is intended for personal learning and exchange only, and is strictly prohibited for commercial use.
