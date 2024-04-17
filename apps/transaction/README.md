# Auth

This service provides authentication functionality for managing user authentication in your application.

## Features

- User registration
- User login
- Token-based authentication
- Password hashing for security

## Requirements

- Node.js
- PNPM

## How to run it

### Step 1

Install dependencies using PNPM:

```bash
pnpm install
```

### Step 2

Set environment variables:

Create a .env file in the root of the project and add the following environment variables:

```
PORT=""
DYNAMO_REGION=""
DYNAMO_ENDPOINT=""
SQS_REGION=""
SQS_BANK_QUEUE_URL=""
SECURITY_PRIVATE_KEY=""
SECURITY_EXPIRES_IN=""
```

### Step 3

Run the service:

```
pnpm run dev
```

## Usage

You can import the Postman collection in the root of the project.
