# MongoDB Database Infrastructure

This directory contains the MongoDB database infrastructure for the Next.js application.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and copy the contents from `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection details:
```
MONGODB_URI=mongodb://localhost:27017/your_database_name
```

## Directory Structure

- `lib/mongodb.ts` - MongoDB connection utility
- `models/` - MongoDB schemas and models
- `.env` - Environment configuration (create from .env.example)

## Usage Example

```typescript
// In your Next.js API route or server-side code
import connectDB from '../lib/mongodb';

// Connect to MongoDB
await connectDB();

// Create a new document
const newExample = await User.create({
  name: 'John Doe',
  email: 'john@example.com',
  coins: 0,
  scores: []
});

// Find documents
const examples = await User.getUserById("id");
```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `MONGODB_USER`: (Optional) MongoDB username if using authentication
- `MONGODB_PASSWORD`: (Optional) MongoDB password if using authentication

## Notes

- The connection utility implements connection pooling and caching
- Models are defined using Mongoose schemas with TypeScript interfaces
- Environment variables must be properly set before running the application
