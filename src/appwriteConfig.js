import { Client, Databases, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_END_POINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);

export const databases = new Databases(client);
export const account = new Account(client);

export default client;