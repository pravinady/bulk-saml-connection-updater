const { ManagementClient } = require('auth0');
const fs = require('fs').promises;

const AUTH0_DOMAIN = '<AUTH0_DOMAIN>'; // Replace with your Auth0 domain

const management = new ManagementClient({
  domain: AUTH0_DOMAIN,
  token: '<MGMT_API_TOKEN>' // Replace with your Auth0 Management API token
});

const EU_ENTITY_ID = 'urn:auth0:navan-eu:';
const EU_TENANT_DOMAIN = 'https://login-eu.navan.com/login/callback?connection=';

// Replace with your list of SAML connection IDs
const connectionIds = [  
  'con_9S0kmVLHLVq9elQl',
  'con_9S0kmVLHLVq9elQl',
  'con_9S0kmVLHLVq9elQl'
];

async function updateMultipleSAMLConnections() {
console.log(`Number of connections found are: ${connectionIds.length}`);

  for (const connectionId of connectionIds) {
    try {
      // 1. Get the existing connection details
      const existingConnection = await management.connections.get({ id: connectionId });
      console.log(`Processing Connection ID: ${connectionId}`);

      // Write connection details to a file in the connections folder
      await writeConnectionToFile(connectionId, existingConnection);

      // New options to apply to each connections in the list
        let newOptions = {
        // Example: Setting the same new attribute mapping for all connections        
            'entityId': EU_ENTITY_ID + existingConnection.data.name,
            'destinationUrl': EU_TENANT_DOMAIN + existingConnection.data.name,
            'recipientUrl': EU_TENANT_DOMAIN + existingConnection.data.name
        };

      // 2. Safely merge the new options with the existing ones
      const updatedOptions = { ...existingConnection.data.options, ...newOptions };

      // 3. Prepare the update payload
      const updatePayload = {
        options: updatedOptions
      };

      // 4. Update the connection
      const updatedConnection = await management.connections.update(
        { id: connectionId },
        updatePayload
      );

      console.log(`✅ Successfully updated connection: ${updatedConnection.data.name}`);
    } catch (err) {
      console.error(`❌ Error updating connection ${connectionId}:`, err);
    }
  }

    async function writeConnectionToFile(connectionId, existingConnection) {
        try {
            const outputDir = './connections';
            await fs.mkdir(outputDir, { recursive: true });

            const filename = `${outputDir}/connection_${connectionId}_${Date.now()}.json`;
            await fs.writeFile(
                filename,
                JSON.stringify(existingConnection.data, null, 2),
                'utf8'
            );
            console.log(`✅ Connection details written to ${filename}`);
        } catch (writeErr) {
            console.error('Error writing to file:', writeErr);
        }
    }
}

updateMultipleSAMLConnections();