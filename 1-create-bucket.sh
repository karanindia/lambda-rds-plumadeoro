#!/bin/bash
set -eo pipefail
BUCKET_NAME=lambda-plumadeoro-db
echo $BUCKET_NAME > bucket-name.txt
aws s3 mb s3://$BUCKET_NAME