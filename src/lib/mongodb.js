import { MongoClient } from 'mongodb';

// Replace with your actual MongoDB Atlas connection string
// For a real application, this should be in an environment variable
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/api-gateway-db?retryWrites=true&w=majority';
const MONGODB_DB = process.env.MONGODB_DB || 'api-gateway-db';

// Connection caching
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // If we have a cached connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // If no cached connection, create a new one
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  
  if (!MONGODB_DB) {
    throw new Error('Please define the MONGODB_DB environment variable');
  }

  // For development purposes, we'll use a mock database if the connection string
  // contains placeholders
  if (MONGODB_URI.includes('<username>')) {
    console.log('Using mock database - MongoDB Atlas connection string not configured');
    return getMockDatabase();
  }

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(MONGODB_DB);

    // Cache the connection
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return getMockDatabase();
  }
}

// Mock database for development/demo purposes
function getMockDatabase() {
  return {
    client: null,
    db: {
      collection: (collectionName) => ({
        find: () => ({
          toArray: async () => {
            // Return mock data based on the collection
            if (collectionName === 'secureData') {
              return [
                { id: 1, name: 'Confidential Project A', status: 'Active', lastUpdated: new Date() },
                { id: 2, name: 'Secure Initiative B', status: 'Planning', lastUpdated: new Date() },
                { id: 3, name: 'Protected System C', status: 'Development', lastUpdated: new Date() },
                { id: 4, name: 'Restricted API D', status: 'Testing', lastUpdated: new Date() },
                { id: 5, name: 'Private Database E', status: 'Production', lastUpdated: new Date() }
              ];
            }
            return [];
          }
        }),
        findOne: async (query) => {
          if (collectionName === 'secureData') {
            const mockData = [
              { id: 1, name: 'Confidential Project A', status: 'Active', lastUpdated: new Date() },
              { id: 2, name: 'Secure Initiative B', status: 'Planning', lastUpdated: new Date() },
              { id: 3, name: 'Protected System C', status: 'Development', lastUpdated: new Date() }
            ];
            return mockData.find(item => item.id === query.id) || null;
          }
          return null;
        },
        insertOne: async () => ({ insertedId: 'mock-id-' + Date.now() })
      })
    }
  };
}
