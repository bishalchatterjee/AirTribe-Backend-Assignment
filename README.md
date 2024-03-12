Docker Commands
  # Use the official Node.js 14 image
   FROM node:14

  # Set the working directory in the container
    WORKDIR /app

  # Copy package.json and package-lock.json to the working directory
   COPY package*.json ./

 # Install dependencies
  RUN npm install

# Copy the rest of the application code to the working directory
  COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
This Dockerfile sets up a Node.js environment, installs dependencies, and exposes port 3000 for your Express server.

docker-compose.yml:
This docker-compose.yml file sets up two services: your Node.js application and a PostgreSQL database. It links the Node.js application container to the PostgreSQL container and sets up the necessary environment variables for the connection.

version: '3.8'

services:
   app:
    build: .
      ports:
       - "3000:3000"
 environment:
  - DATABASE_URL=postgres://postgres:bishal@postgres:3000/AirtribeDB
depends_on:
  - postgres
 postgres:
image: postgres
environment:
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: bishalc
  POSTGRES_DB: AirtribeDB



