# React 18 Next.js Template

This project serves as a starting point for building modern web applications using **React** and **Next.js**. It also incorporates **TypeScript** (a statically typed superset of JavaScript), **Storybook** for UI component development, and **Jest** for automated testing.

If you are familiar with other programming languages but new to JavaScript, this guide will provide the necessary instructions to get started.

## Tech Stack

- **React** v18 - A JavaScript library for building user interfaces.
- **Next.js** v14 - A framework that simplifies React development with built-in routing and server-side rendering.
- **TypeScript** v5.5 - A typed version of JavaScript that helps improve code safety.
- **Storybook** v8.2 - A tool for developing and testing UI components in isolation.
- **Jest** v29 - A testing framework to ensure your code works as expected.

## Minimum requirements
- **Node** v20 - [Node.js](https://nodejs.org/en) is a JavaScript runtime built on Chrome's V8 JavaScript engine.

tip: try use a Node Version Manager like [nvm](https://docs.redwoodjs.com/docs/how-to/using-nvm/#:~:text=nvm%20is%20a%20Node%20Version,js%20on%20the%20same%20machine.)

## What You Need to Know Before Starting

### 1. Node.js and npm

**Node.js** is a runtime that allows you to execute JavaScript outside of the browser. It comes with **npm** (Node Package Manager), which handles the project’s libraries and dependencies.

### 2. Yarn (npm Alternative)

**Yarn** is an alternative to npm for managing packages and dependencies. You can think of **npm** and **yarn** as equivalent to package managers like **pip** (Python) or **Maven** (Java).

## Prerequisites

1. **Install Node.js**: You’ll need **Node.js** installed on your system to run this project. Download the latest version from the [official Node.js website](https://nodejs.org). During installation, **npm** will be installed automatically.

   Verify that Node.js is installed correctly by running the following command in your terminal:

   ```bash
   node -v
   ```

   This should output the version of Node.js installed.

2. **Install Yarn (Optional)**: You can use either **npm** or **yarn** to manage dependencies. If you prefer to use **yarn**, install it globally with:

   ```bash
   npm install -g yarn
   ```

   Verify the installation with:

   ```bash
   yarn -v
   ```

## Initializing the Project

### 1. Installing Dependencies

Similar to other languages, this project relies on various external libraries (called **dependencies**). To install them, follow the steps below in your terminal, inside the project folder.

If using **npm**:
```bash
npm install
```

Or, if using **yarn**:
```bash
yarn
```

### 2. Running the Development Server

This project uses **Next.js**, which includes a built-in development server. To start the server and view the application in your browser, use the following command:

If using **npm**:
```bash
npm run dev
```

Or, if using **yarn**:
```bash
yarn dev
```

This will start the local server, and you can access the application at [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Building for Production

Before deploying the application, you need to compile it for production. This process creates an optimized set of files that can be served by a web server.

If using **npm**:
```bash
npm run build
npm start
```

Or, if using **yarn**:
```bash
yarn build
yarn start
```

### 4. Using Storybook

**Storybook** is a tool that allows you to build and test UI components in isolation. To run Storybook, use the following commands:

If using **npm**:
```bash
npm run build-storybook
npm run storybook
```

Or, if using **yarn**:
```bash
yarn build-storybook
yarn storybook
```

This will launch Storybook in the browser, where you can interact with the UI components independently from the main application.

## Troubleshooting

### Node.js Not Installed?

Ensure that **Node.js** is installed by running:

```bash
node -v
```

If you see an error, it means **Node.js** is not installed. Download and install the latest version from the [official Node.js website](https://nodejs.org).

### Command `yarn` Not Found?

If you prefer to use **yarn** and encounter the error `command not found: yarn`, install it globally by running:

```bash
npm install -g yarn
```

Then, try running the commands with **yarn** again.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs) - Learn more about Next.js.
- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction) - Discover how to use Storybook.
- [Jest Documentation](https://jestjs.io/docs/getting-started) - Get started with Jest for testing.
