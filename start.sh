#!/bin/sh

# Start the backend server
node dist/index.js &

# Start the frontend development server
cd /app/frontend && npm start &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
