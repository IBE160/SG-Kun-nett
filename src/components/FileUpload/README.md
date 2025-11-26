
# FileUpload Component

This directory contains a reusable `FileUpload` component for React, built with Material-UI.

## Description

The `FileUpload` component provides a user-friendly drag-and-drop interface for uploading files. It includes the following features:

-   Drag-and-drop and click-to-browse functionality.
-   Visual feedback for drag-over state.
-   Support for PDF, DOCX, and TXT file types.
-   Display of uploaded files with their names and sizes.
-   Option to remove uploaded files.
-   A "Ready for analysis" message when two files are uploaded.

## Dependencies

To use this component, you need to have the following libraries installed in your project:

-   `react`
-   `@mui/material`
-   `@mui/icons-material`
-   `@emotion/react`
-   `@emotion/styled`

You can install them using npm:

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

## How to Use

1.  **Import the component:**

    ```javascript
    import FileUpload from './src/components/FileUpload';
    ```

2.  **Add the component to your JSX:**

    ```javascript
    <FileUpload />
    ```

## Running with Storybook

This component comes with a Storybook file (`FileUpload.stories.js`) for easy visualization and testing. To run Storybook, you first need to install it in your project.

1.  **Install Storybook:**

    ```bash
    npx storybook init
    ```

2.  **Run Storybook:**

    ```bash
    npm run storybook
    ```
