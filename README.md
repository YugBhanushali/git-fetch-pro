# Git Fetch Pro

Git Fetch Pro simplifies the process of downloading specific subfolders from any Public GitHub repository and provides a CLI tool for advanced usage.

## Features

- **Easy Subfolder Download:** Download any subfolder from a GitHub repository by simply pasting the repository folder URL.
- **Copy cURL Command:** Copy the generated cURL command and execute it in your terminal to download the folder directly to your desired location.
- **User-Friendly Interface:** Clean and intuitive design makes it easy for anyone to use.
- **Quick Access:** No need to clone the entire repository—get only what you need.
- **CLI Tool:** Use the `npx` package or install globally to download specific folders directly from the terminal.

## Web Usage

1. Visit [Git Fetch Pro](https://gitfetchpro.vercel.app/).
2. Paste the GitHub repository URL. For example: `https://github.com/useplunk/plunk/tree/main/packages/api`.
3. Click the "Fetch" button.
4. Choose to either download the subfolder directly or copy the cURL command for terminal execution.

## CLI Usage

### Installation

You can use GitFetchPro in two ways:

#### 1. Using `npx` (No Installation Required)

Run GitFetchPro directly without installing it:

```bash
npx gitfetchpro <url> [options]
```

#### 2. Global Installation

To install the package globally using npm:

```bash
npm install -g gitfetchpro
```

### Arguments

- `<url>`: GitHub URL of the folder you want to clone.

### Options

- `-o, --output <directory>`: Specify the output directory. Defaults to the current working directory.

### Example

```bash
gitfetchpro https://github.com/YugBhanushali/git-fetch-pro/tree/main/client -o ./downloaded-folder
```

Or using `npx`:

```bash
npx gitfetchpro https://github.com/YugBhanushali/git-fetch-pro/tree/main/client -o ./downloaded-folder
```

This command will clone the `src` folder from the specified GitHub repository into the `downloaded-folder` directory.

## Example

To download the `api` folder from the repository `https://github.com/useplunk/plunk/tree/main/packages/api`, simply paste this URL into Git Fetch Pro or use the CLI tool as demonstrated above.

## Contributing

Feel free to contribute to this project! Check out the [Git Fetch Pro repository](https://github.com/YugBhanushali/git-fetch-pro) for more details.

## Disclaimer

Git Fetch Pro is not affiliated with or sponsored by GitHub.
