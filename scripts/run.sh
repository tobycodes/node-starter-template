#!/bin/bash

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install it and try again."
    exit 1
fi

# Start the containers using Docker Compose
docker-compose up -d

# Check if the containers started successfully
if [ $? -eq 0 ]; then
    echo "Project started successfully!"
else
    echo "Failed to start the project. Please check the logs for more information."
fi
