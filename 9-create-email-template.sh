#!/bin/bash
set -eo pipefail
aws ses create-template --cli-input-json file://events/mytemplate.json out.json
  cat out.json
  echo ""
