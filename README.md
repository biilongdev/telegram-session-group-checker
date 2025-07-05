# Telegram Session Group Checker 🚀

![Telegram Session Group Checker](https://img.shields.io/badge/Telegram%20Session%20Group%20Checker-v1.0.0-blue)

Welcome to the **Telegram Session Group Checker**! This is a powerful tool built on Node.js designed to help you generate sessions using Telethon or Pyrogram. It allows you to audit all the groups or channels you manage, providing detailed information and the ability to export your findings to CSV format.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)
- [Links](#links)

## Features

- **Session Generation**: Create sessions for Telegram using Telethon or Pyrogram.
- **Group Audit**: Check all groups and channels you own.
- **Detailed Information**: Get comprehensive details about each group.
- **CSV Export**: Easily export the audit results to CSV format for further analysis.

## Installation

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/biilongdev/telegram-session-group-checker.git
cd telegram-session-group-checker
```

Next, install the required dependencies:

```bash
npm install
```

## Usage

To use the tool, you will need to generate a session first. After setting up your session, you can check your groups and export the data. 

### Generating a Session

Run the following command to generate a session:

```bash
node generateSession.js
```

Follow the prompts to log in to your Telegram account. Once you complete this, your session will be created.

### Auditing Groups

After generating a session, you can audit your groups:

```bash
node auditGroups.js
```

This command will scan all the groups you manage and provide detailed information.

### Exporting to CSV

To export the audit results to CSV, run:

```bash
node exportToCSV.js
```

You will receive a CSV file containing all the details of your groups.

## How It Works

The **Telegram Session Group Checker** uses the Telegram API to interact with your account. It utilizes the Telethon and Pyrogram libraries to handle the complexities of the API. 

1. **Session Management**: The tool manages your sessions securely, allowing you to generate and reuse them without re-entering your credentials.
  
2. **Data Retrieval**: It retrieves data about your groups and channels using the Telegram API, ensuring you have the latest information.

3. **Export Functionality**: The tool formats the data into a CSV file, making it easy to share or analyze.

## Contributing

We welcome contributions to enhance the functionality of the Telegram Session Group Checker. If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push to your branch.
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Links

For the latest releases, visit the [Releases](https://github.com/biilongdev/telegram-session-group-checker/releases) section. You can download the latest version and execute it to start using the tool.

Additionally, you can check the [Releases](https://github.com/biilongdev/telegram-session-group-checker/releases) section for updates and new features.

---

This README provides a comprehensive overview of the **Telegram Session Group Checker**. For any issues or suggestions, feel free to open an issue in the repository. Thank you for using our tool!