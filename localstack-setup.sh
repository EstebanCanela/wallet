#!/bin/sh
echo "Initializing localstack"

awslocal sqs create-queue --queue-name sqs-bank-account

awslocal dynamodb create-table \
    --table-name Auth \
    --attribute-definitions \
        AttributeName=email,AttributeType=S \
        AttributeName=access,AttributeType=S \
    --key-schema \
        AttributeName=email,KeyType=HASH \
        AttributeName=access,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5