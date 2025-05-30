# API Gateway & Middleware in Next.js

This project demonstrates how to implement an API Gateway pattern and middleware for authentication in a Next.js application.

## Features

- **API Gateway**: Secure API route at `/api/secure-data` that returns protected information
- **Authentication Middleware**: Token-based authentication using the `Authorization` header
- **Logging**: Detailed logging of requests and authentication attempts

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd api-gateway-lab

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## API Usage

### Accessing Protected Data

```bash
# With valid token
curl -H "Authorization: Bearer vercel-lab-token" http://localhost:3000/api/secure-data

# Without token (will return 401 Unauthorized)
curl http://localhost:3000/api/secure-data
```

## How It Works

1. The middleware intercepts requests to `/api/secure-data`
2. It checks for a valid authorization token
3. If valid, the request proceeds to the API route
4. If invalid, a 401 Unauthorized response is returned

## Deployment

This project is configured for easy deployment on Vercel.

```bash
vercel
```

## License

MIT
