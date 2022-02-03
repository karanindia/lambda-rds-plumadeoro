#!/bin/bash
set -eo pipefail
FUNCTION=$(aws cloudformation describe-stack-resource --stack-name rds-plumadeoro --logical-resource-id function --query 'StackResourceDetail.PhysicalResourceId' --output text)

# invoke just one time 
aws lambda invoke --function-name $FUNCTION --payload file://events/db-insert-usuario.json out.json
cat out.json
echo ""
