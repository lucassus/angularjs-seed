#!/bin/bash

# Execute end-to-end tests

set -e

PORT=8080
TIMEOUT=30

function available() {
  curl -f "http://localhost:$PORT" > /dev/null 2> /dev/null
}

echo -n 'Waiting for the server'
while ! available; do
  echo -n '.'
  sleep 1
  ((TIMEOUT--)) && [[ $TIMEOUT -eq 0 ]] && exit 1
done
echo ' OK'

node_modules/webdriver-manager/bin/webdriver-manager update
node_modules/protractor/bin/protractor config/protractor.config.js
