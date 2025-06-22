# ONIKO Backend API Documentation

This document provides a comprehensive overview of the ONIKO backend API endpoints.

## Table of Contents
- [Authentication API](#authentication-api)
  - [Sign Up](#sign-up)
  - [Sign In](#sign-in)
  - [Forgot Password](#forgot-password)
  - [Reset Password](#reset-password)
- [User API](#user-api)
  - [Get User Profile](#get-user-profile)
  - [Get Languages](#get-languages)

## Authentication API

The Authentication API handles user registration, login, and password management functions.

### Sign Up

Register a new user in the system.

**Endpoint:** `POST /api/v1/auth/sign-up`

**Authentication Required:** No

**Request Body:**
```json
{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "strongpassword123"
}
```

**Response (201 Created):**
```json
{
  "userId": "1a2b3c4d5e",
  "message": "User registered successfully"
}
```

**Error Responses:**
- `400 Bad Request`: Validation error (missing required fields or invalid format)

**Example Request:**
```bash
curl -X POST /api/v1/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "username": "John Doe",
    "email": "john@example.com",
    "password": "strongpassword123"
  }'
```

### Sign In

Authenticate an existing user and return an access token.

**Endpoint:** `POST /api/v1/auth/sign-in`

**Authentication Required:** No

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR...",
  "message": "Sign in successful"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid credentials or missing fields

**Example Request:**
```bash
curl -X POST /api/v1/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "strongpassword"
  }'
```

### Forgot Password

Request a password reset by sending a token to the user's email.

**Endpoint:** `POST /api/v1/auth/forgot-password`

**Authentication Required:** No

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "OTP sent to your mail."
}
```

**Error Responses:**
- `400 Bad Request`: Validation error (invalid or missing email)
- `404 Not Found`: User with the provided email was not found

**Example Request:**
```bash
curl -X POST /api/v1/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

### Reset Password

Reset a user's password using the token received via email.

**Endpoint:** `POST /api/v1/auth/reset-password`

**Authentication Required:** No

**Request Body:**
```json
{
  "email": "user@example.com",
  "token": 123456,
  "new_password": "newPassword123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

**Error Responses:**
- `400 Bad Request`: Validation error or invalid token
- `404 Not Found`: User not found

**Example Request:**
```bash
curl -X POST /api/v1/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "token": 123456,
    "new_password": "newPassword123"
  }'
```

## User API

The User API provides endpoints for retrieving and managing user data.

### Get User Profile

Retrieve the profile information for the authenticated user.

**Endpoint:** `GET /api/v1/user/profile`

**Authentication Required:** Yes (Bearer Token)

**Request Body:** None

**Response (200 OK):**
```json
{
  "user": {
    "id": "1a2b3c4d5e",
    "username": "John Doe",
    "email": "john@example.com",
    "createdAt": "2023-01-15T12:00:00Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

**Example Request:**
```bash
curl -X GET /api/v1/user/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR..."
```

### Get Languages

Retrieve available language options for the user.

**Endpoint:** `GET /api/v1/user/languages`

**Authentication Required:** Yes (Bearer Token)

**Status:** In Development

**Request Body:** None

**Response (200 OK):**
```json
{
  "languages": [
    {
      "code": "en",
      "name": "English"
    },
    {
      "code": "fr",
      "name": "French"
    }
  ]
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token

**Example Request:**
```bash
curl -X GET /api/v1/user/languages \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR..."
```

---

## Authentication

Most endpoints in the User API require authentication using a Bearer token. 
To authenticate:

1. Obtain an access token by signing in through the `/api/v1/auth/sign-in` endpoint
2. Include the token in the Authorization header of your requests:
   ```
   Authorization: Bearer your_access_token
   ```

If the token is missing, invalid, or expired, the API will return a `401 Unauthorized` response.

