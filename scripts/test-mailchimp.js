// Test script to verify Mailchimp configuration
require('dotenv').config({ path: '.env.local' });
const mailchimp = require('@mailchimp/mailchimp_marketing');

// Initialize Mailchimp
const apiKey = process.env.MAILCHIMP_API_KEY;
const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
const listId = process.env.MAILCHIMP_LIST_ID;

console.log('Testing Mailchimp configuration...');

// Validate API key format and extract datacenter
if (apiKey) {
  const apiKeyParts = apiKey.split('-');
  if (apiKeyParts.length !== 2) {
    console.error('Invalid API key format. The API key should be in the format "key-dcX" where X is your datacenter.');
    process.exit(1);
  }
  const extractedDc = apiKeyParts[1];
  console.log('API Key:', 'API key is set');
  console.log('Extracted datacenter from API key:', extractedDc);
  console.log('Configured server prefix:', serverPrefix);
  if (extractedDc !== serverPrefix) {
    console.error(`Warning: The server prefix (${serverPrefix}) does not match the datacenter in your API key (${extractedDc})`);
    console.error('Please update MAILCHIMP_SERVER_PREFIX in your .env.local file to match the datacenter from your API key');
    process.exit(1);
  }
} else {
  console.error('API key is missing');
  process.exit(1);
}

console.log('List ID:', listId ? 'List ID is set' : 'List ID is missing');

if (!apiKey || !serverPrefix || !listId) {
  console.error('Missing required Mailchimp configuration. Please check your .env.local file.');
  process.exit(1);
}

mailchimp.setConfig({
  apiKey,
  server: serverPrefix,
});

async function testMailchimp() {
  try {
    console.log('Testing Mailchimp API connection...');
    
    // Test getting list information
    const list = await mailchimp.lists.getList(listId);
    console.log('List information retrieved successfully:');
    console.log(`List Name: ${list.name}`);
    console.log(`List ID: ${list.id}`);
    
    console.log('Mailchimp configuration is valid!');
  } catch (error) {
    console.error('Error testing Mailchimp configuration:');
    if (error.response && error.response.body) {
      console.error('Error details:', error.response.body);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

testMailchimp(); 