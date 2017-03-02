#!/bin/bash

if [ ! -e app.js ]
then
    echo "Error: could not find main application app.js file"
    echo "You should run the generate-ssl-certs.sh script from the main MEAN application root directory"
    echo "i.e: bash scripts/generate-ssl-certs.sh"
    exit -1
fi

echo "Generating self-signed certificates..."
mkdir -p ../../certificate/ssl
openssl genrsa -out ../../certificate/ssl/prkey.pem 4096
openssl req -new -key ../../certificate/ssl/prkey.pem -out ../../certificate/ssl/pukey.pem
openssl rsa -in ../../certificate/ssl/prkey.pem -pubout > ../../certificate/ssl/pukey.pub
openssl x509 -req -days 365 -in ../../certificate/ssl/pukey.pem -signkey ../../certificate/ssl/prkey.pem -out ../../certificate/ssl/cert.pem
# rm ../../certificate/ssl/pukey.pem
chmod 600 ../../certificate/ssl/prkey.pem ../../certificate/ssl/cert.pem
