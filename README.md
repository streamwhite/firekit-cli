# Quick Fire CLI

A command-line tool to quickly set up Firebase projects and web apps with minimal configuration.

## Features

- 🔥 **Quick Firebase Setup**: Login, create project, create web app, and get app SDK config.
- 🔐 **TOTP Support**: Enable Time-based One-Time Password authentication
- ⚡ **One-Command Setup**: Complete Firebase project setup in a single command

## Prerequisites

- Node.js 16.0.0 or higher
- Firebase CLI (`firebase-tools`)
- For TOTP: Google Cloud SDK and login

## Installation

```bash
npm install -g quick-fire-cli
```

## Usage

### Setup a new Firebase project and web app

```bash
qfc setup <projectId> <appName>
```

This command will:

1. Log you into Firebase
2. Create a new Firebase project (or use existing one)
3. Create a web app for the project
4. Generate and save the SDK configuration to `app-config.json`

**Example:**

```bash
qfc setup my-awesome-app my-web-app
```

### Enable TOTP for a Firebase project

```bash
qfc enableTotp <projectId> [adjacentIntervals]
```

This command enables Time-based One-Time Password authentication for your Firebase project.
adjacentIntervals, You can specify the number of adjacent intervals to accept, from 0 to 10. The default is five, meaning the service will accept a password from the current window, plus five before and five after.

**Prerequisites:**

- Google Cloud SDK must be installed
- You must be authenticated with `gcloud auth login`

**Example:**

```bash
qfc enableTotp my-awesome-app 5
```

## Commands

| Command      | Description                         | Required Arguments     |
| ------------ | ----------------------------------- | ---------------------- |
| `setup`      | Create Firebase project and web app | `projectId`, `appName` |
| `enableTotp` | Enable TOTP authentication          | `projectId`            |

## Configuration

After running the setup command, you'll find your Firebase SDK configuration saved in `app-config.json`. This file contains all the necessary configuration to initialize Firebase in your web application.

## License

Apache License 2.0

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you encounter any issues, please report them on the [GitHub Issues page](https://github.com/streamwhite/firekit-cli/issues).
