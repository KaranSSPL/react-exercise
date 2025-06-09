# File Uploader React Project

This project is a modern React + TypeScript application bootstrapped with Vite. It demonstrates the use of a custom file uploader component, allowing users to upload, preview, and delete files with a user-friendly interface.

## Features

- Drag & drop file upload and file selector support
- File type and size validation (supports `.jpg`, `.jpeg`, `.png`, `.txt`, `.pdf` up to 6MB)
- Duplicate file detection with overwrite confirmation
- Persistent storage using `localStorage`
- File deletion from preview and storage
- Responsive and accessible UI

## Project Structure

```
.
├── File Uploader Package/      # Source code for the file-uploader-plugin package
│   ├── src/
│   │   ├── components/
│   │   │   ├── FilesSave.tsx
│   │   │   ├── PreviewFiles.tsx
│   │   │   └── RenderPreviewContent.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── rollup.config.mjs
│   └── tsconfig.json
├── public/
├── src/
│   ├── App.tsx                 # Uses the file-uploader-plugin
│   ├── main.tsx
│   ├── index.css
│   └── ...
├── package.json
├── vite.config.ts
└── ...
```

## Usage

The main application imports the `file-uploader-plugin` package and renders it in [`App.tsx`](src/App.tsx):

```tsx
import FileUpload from 'file-uploader-plugin';

const App = () => (
  <FileUpload />
);

export default App;
```

## About the File Uploader Plugin

- The `file-uploader-plugin` is a reusable React component for file uploading, previewing, and deletion.
- In this project, it is installed via npm and used as a dependency.
- The full source code for the plugin is also included in the [`File Uploader Package`](File%20Uploader%20Package/) directory. This allows for local development, customization, or publishing updates to npm.

## Development

### Install dependencies

```sh
npm install
```

### Start the development server

```sh
npm run dev
```

### Build for production

```sh
npm run build
```

## Customizing the File Uploader Plugin

To modify or extend the file uploader functionality:

1. Edit the source files in [`File Uploader Package/src/`](File%20Uploader%20Package/src/).
2. Run the build script in the package directory:

   ```sh
   cd "File Uploader Package"
   npm install
   npm run build
   ```

3. If you want to use the local build of the package in the main project instead of the npm-installed version, follow these steps:

   - **Uninstall the npm package** from the main project:
     ```sh
     npm uninstall file-uploader-plugin
     ```
   - **Link the local package** by installing it directly from the local folder:
     ```sh
     npm install "./File Uploader Package"
     ```
   - Now, the main project will use the local build of the package. Any changes you make to the package source code (in `File Uploader Package/src/`) should be followed by running the build script in the package directory:
     ```sh
     cd "File Uploader Package"
     npm run build
     ```
   - After building, your changes will be reflected in the main project.

   - Once all issues are fixed and you are ready to publish, log in to npm and publish the package:
     ```sh
     npm login
     npm publish
     ```

   - If you make new changes after publishing, update the `version` field in `package.json` of the package folder to a new version number before running `npm run build` and `npm publish` again. This ensures that the new version is published and can be installed in the main project.

## License

This project and the file-uploader-plugin are licensed under the ISC License.

---

**Author:** Aman Sharma