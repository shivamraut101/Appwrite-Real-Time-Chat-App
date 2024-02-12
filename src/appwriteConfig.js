import { Client, Databases, Account } from 'appwrite';

const client = new Client();

// Fetch environment variables
const appwriteEndpoint = import.meta.env.VITE_END_POINT;
const appwriteProjectId = import.meta.env.VITE_PROJECT_ID;

// Check if environment variables are defined
if (!appwriteEndpoint || !appwriteProjectId) {
    console.error('Missing Appwrite environment variables');
}

// Set Appwrite client endpoint and project ID
client
    .setEndpoint(appwriteEndpoint)
    .setProject(appwriteProjectId);

// Export Appwrite services
export const databases = new Databases(client);
export const account = new Account(client);

export default client;
