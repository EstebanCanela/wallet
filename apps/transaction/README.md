# Transaction

The Transaction Service allows for the generation of deposit or transfer operations. Transfers are stored in MongoDB and deposits are stored in MySQL.

## Features

- Transfers
- Deposits
- Retrieve Balances

## Requirements

- Node.js
- MongoDB
- MySQL
- SQS

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
SQL_HOST=""
SQL_PORT=""
SQL_USER=""
SQL_PASSWORD=""
SQL_DATABASE=""
MONGO_DB_HOST=""
MONGO_DB_PORT=""
MONGO_DB_USER=""
MONGO_DB_PASSWORD=""
MONGO_DB_DATABASE=""
SQS_REGION=""
SQS_NAME=""
SQS_BANK_QUEUE_URL=""
```

### Step 3

Run the service:

```
pnpm run dev
```

## Usage

You can import the Postman collection in the root of the project.
