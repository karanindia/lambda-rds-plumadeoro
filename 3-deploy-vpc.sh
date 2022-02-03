#!/bin/bash
set -eo pipefail
aws cloudformation deploy --template-file template-vpcrds.yml --stack-name stack-plumadeoro-vpc
