# Bulk SAML Connection Updater

A Node.js script to update multiple Auth0 SAML connections in bulk. This tool helps you modify SAML connection settings across multiple connections simultaneously, with the ability to backup existing configurations.

## Features

- Bulk update multiple SAML connections
- Automatic backup of existing connection configurations
- Saves connection details to JSON files for reference
- Error handling and logging
- Support for updating entity IDs, destination URLs, and recipient URLs

## Prerequisites

- Node.js installed
- Auth0 account with appropriate permissions
- Auth0 Management API token with the following permissions:
  - `read:connections`
  - `update:connections`

## Setup

1. Clone the repository:
```bash
git clone https://github.com/pravinady/bulk-saml-connection-updater.git
cd bulk-saml-connection-updater
```

2. Install dependencies:
```bash
npm install
```

3. Configure your Auth0 credentials in `index.js`:
```javascript
const management = new ManagementClient({
  domain: 'YOUR_AUTH0_DOMAIN',
  token: 'YOUR_MANAGEMENT_API_TOKEN'
});
```

## Usage

1. Update the `connectionIds` array in `index.js` with the IDs of the SAML connections you want to modify:
```javascript
const connectionIds = [
  'con_example1',
  'con_example2'
];
```

2. Run the script:
```bash
node index.js
```

The script will:
- Create a `connections` directory
- Save existing connection configurations as JSON files
- Update the specified SAML connections
- Log success/failure for each operation

## Output

Connection backups are saved in the `connections` directory with filenames in the format:
```
connection_[CONNECTION_ID]_[TIMESTAMP].json
```

## Error Handling

- The script includes error handling for both file operations and API calls
- Failed operations are logged to the console
- Each connection is processed independently, so failures don't affect other updates

## License

MIT
