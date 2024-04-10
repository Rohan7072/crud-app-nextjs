# Crud App using Firebase and Nextjs

This project is a simple crud todo application built with Nextjs and Firebase Firestore. It allows users to create, update, and delete todos, with the data being stored in a Firestore database.

## Installation

To run this project locally, you need to have Node.js and npm installed on your machine.

1. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/todo-app.git


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.





# Run Project using Docker:
Prerequisites:
Docker installed on your machine.

1. Create a Dockerfile in the root of your project:
# Use the official Node.js image as base
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the application
RUN npm run build

# Start Nginx when the container starts
CMD ["npm", "start"]

2. Build the Docker Image:

Open a terminal, navigate to the root directory of your Next.js project, and run the following command to build the Docker image:

      docker build -t crud-app .

 3. Run the Docker Container:

After successfully building the Docker image, you can run a Docker container using the following command:

     docker run -dp 3000:3000 crud-app

     npm run build

     docker ps
   # docker container id start and stop commands:
     docker start d2b80ef85f55 [d2b80ef85f55 container Id]
     docker stop d2b80ef85f55

4. Access Your Next.js Application:

Once the Docker container is running, you can access your Next.js application by navigating to http://localhost:3000 in your web browser.
     

     




