# Git Fetch Pro

Git Fetch Pro is a CLI tool that allows you to download specific folders from GitHub repositories.

## Installation

You can use GitFetchPro in two ways:

### 1. Using `npx` (No Installation Required)

You can run GitFetchPro directly without installing it:

```bash
npx gitfetchpro <url> [options]
```

### 2. Global Installation

To install the package globally using npm:

```bash
npm install -g gitfetchpro
```

## Usage

### Arguments

- `<url>`: GitHub URL of the folder you want to clone.

### Options

- `-o, --output <directory>`: Specify the output directory. Defaults to the current working directory.

### Example

```bash
gitfetchpro https://github.com/YugBhanushali/git-fetch-pro/tree/main/src -o ./downloaded-folder
```

Or using `npx`:

```bash
npx gitfetchpro https://github.com/YugBhanushali/git-fetch-pro/tree/main/src -o ./downloaded-folder
```

This command will clone the `src` folder from the specified GitHub repository into the `downloaded-folder` directory.
