#!/usr/bin/env bash

# Setup DB
mongo <<EOF
use arduino

db.createCollection("clients")
db.createCollection("bases")
db.createCollection("sensors")

exit
EOF

echo "Database is now installed and configured"
