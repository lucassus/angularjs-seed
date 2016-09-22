#!/bin/bash

# Execute end-to-end tests

set -e

PORT=8080
TIMEOUT=30

node_modules/protractor/bin/webdriver-manager update

function available() {
  curl -f "http://localhost:$PORT" > /dev/null 2> /dev/null
}

echo -n 'Waiting for the servers'
while ! available; do
  echo -n '.'
  sleep 1
  ((TIMEOUT--)) && [[ $TIMEOUT -eq 0 ]] && exit 1
done
echo ' OK'

node_modules/protractor/bin/protractor protractor.config.js
