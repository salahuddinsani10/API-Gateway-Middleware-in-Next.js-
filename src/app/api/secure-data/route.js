import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req) {
  // Get user information from middleware
  const user = req.headers.get('x-user') || 'anonymous';
  const requestId = req.headers.get('x-request-id') || 'unknown';
  const timestamp = req.headers.get('x-request-timestamp') || new Date().toISOString();
  
  // Log access to the secure endpoint with request ID for tracing
  console.log(`[${timestamp}] [ReqID: ${requestId}] Secure data accessed by user: ${user}`);
  
  try {
    // Connect to MongoDB and fetch secure data
    const { db } = await connectToDatabase();
    const secureDataCollection = db.collection('secureData');
    
    // Log database operation
    console.log(`[${timestamp}] [ReqID: ${requestId}] Fetching data from MongoDB`);
    
    // Fetch data from the collection
    const data = await secureDataCollection.find({}).toArray();
    
    // Create response with the fetched data
    const secureData = {
      message: "This is secured data from MongoDB!",
      user: user,
      timestamp: timestamp,
      requestId: requestId,
      accessLevel: user === 'authenticated-user' ? 'full' : 'restricted',
      dataSource: 'MongoDB Atlas',
      count: data.length,
      data: data
    };
    
    console.log(`[${timestamp}] [ReqID: ${requestId}] Successfully retrieved ${data.length} records`);
    
    return Response.json(secureData, { status: 200 });
  } catch (error) {
    // Log error
    console.error(`[${timestamp}] [ReqID: ${requestId}] Error fetching data: ${error.message}`);
    
    // Return error response
    return Response.json({
      message: "Error fetching secure data",
      error: error.message,
      timestamp: timestamp,
      requestId: requestId
    }, { status: 500 });
  }
}
