# Oniko Test Sign-Up Endpoint

This is an implementation demonstrating the sign up and login flow using express Js, typescrypt, bcrypt for password hashing and JWT for authentication.

## Table of Contents

* [Features](#features)
* [Technology Stack](#technology-stack)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Configuration](#configuration)
* [Running the Application](#running-the-application)
* [API Endpoints](#api-endpoints)
* [Testing](#testing)
* [Testing with cURL](#testing-with-curl)
* [Resources](#resources)

## Features

* User Sign-Up functionality
* User Sign-in up functionality
* Password Hashing
* Input Validation
* JWT Token Generation
* Error Handling
* Integration and Unit Tests


## Technology Stack

* **Framework:** Express.Js
* **Language:** TypeScript
* **Database:** MongoDB (Mongoose as ODM)
* **Authentication:** JWT
* **Password Hashing:** bcrypt
* **Testing:** Jest, Supertest

## Prerequisites

* To set up this app locally the following must be made availabe.
    * Node.js
    * npm or yarn
    * MongoDB instance (running locally or connection string to a cloud instance like MongoDB Atlas)
    * Git (for cloning)

## Installation

1.  **Clone the repository:**
    ```bash
    $ git clone [https://github.com/timiwritescode/oniko-test-sign-up-endpoint.git](https://github.com/timiwritescode/oniko-test-sign-up-endpoint.git)

    $ cd oniko-test-sign-up-endpoint
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *or*
    ```bash
    yarn install
    ```

## Configuration

1.  **Environment Variables:** This application requires environment variables for configuration. Create a `.env` file in the root directory of the project. Copy the contents of `.env.example` into `.env` and update the values.

    ```dotenv
    # .env example
    NODE_ENV=development(for development or production for production environment)
    PORT=3000
    MONGO_DB_URI=mongodb://<YOUR_MONGO_HOST>/<YOUR_MONGODB_DATABASE> # Replace with your MongoDB connection string
    APP_SECRET=your_super_secret_key
    
    

## Running the Application

* **Development Mode (with hot-reloading):**
    ```bash
    npm run start:dev
    ```
    *or*
    ```bash
    yarn start:dev
    ```

* **Production Mode:**
    ```bash
    # Build the project first
    npm run build
    # Run the built application
    npm run start:prod
    ```
    *or*
    ```bash
    # Build the project first
    yarn build
    # Run the built application
    yarn start:prod
    ```

The application will typically be available at `http://localhost:PORT` (where `PORT` is the value set in your `.env` file, e.g., 3000).

## API Endpoints

* **POST /auth/signup**
    * **Description:** Registers a new user.
    * **Request Body:**
        ```json
        {
          "name": "Doe",
          "email": "john.doe@example.com",
          "password": "yourSecurePassword123"
        }
        ```
    * **Success Response (Example - Status 201 Created):**
        ```json
        {
          "user_id": "generated-user-id",
          "message": "User created successfully"

        }
        ```
    * **Error Responses:**
        * `400 Bad Request`: Invalid input data (e.g., missing fields, invalid email format).
        * `409 Conflict`: User with the provided email already exists.
        * `500 Internal Server Error`: Server-side issue.

* **POST /auth/sign-in**
    * **Description:** Signs in a user.
    * **Request Body:**
        ```json
        {
          "email": "john.doe@example.com",
          "password": "yourSecurePassword123"
        }
        ```
    * **Success Response (Example - Status 200 OK):**
        ```json
        {
          "success": true,
          "acess_token": "<JWT_TOKEN>"

        }
        ```
    * **Error Responses:**
        * `400 Bad Request`: Invalid input data (e.g., missing fields, invalid email format).
        * `401 Unauthorized`: For invalid login credentials.
        * `500 Internal Server Error`: Server-side issue.

## Testing

* To run test, simply follow the instructions below: 

    * **Run all tests:**
        ```bash
        npm test
        ```
        *or*
        ```bash
        yarn test
        ```

## Testing with cURL
Open your terminal and run the following command, replacing `<PORT>` with your application's port number:

```bash
curl --location --request POST 'http://localhost:<PORT>/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe.curl@example.com",
    "password": "yourSecurePassword123"
}'
```

## Resources

* [Express](#https://expressjs.com/)
* [JWT](#https://jwt.io/)
* [MONGODB ATLAS](#https://www.mongodb.com/cloud)