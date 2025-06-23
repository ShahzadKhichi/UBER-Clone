# Backend API Documentation

## User Routes

### POST `user/register`

This route is used to register a new user.

#### Request Body

| Field      | Type   | Validation                              | Description                       |
| ---------- | ------ | --------------------------------------- | --------------------------------- |
| `email`    | String | Must be a valid email address           | The email of the user             |
| `fullname` | Object | Must contain `firstname` and `lastname` | The full name of the user         |
| `password` | String | Must be at least 8 characters long      | The password for the user account |

#### Example Request Body

```json
{
  "email": "example@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

#### Responses

- **201 Created**: User registered successfully.

  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "example@example.com"
    },
    "token": "auth_token"
  }
  ```

- **400 Bad Request**: Validation errors.

  ```json
  {
    "errors": [
      {
        "msg": "invalid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

- **500 Internal Server Error**: Server encountered an error.
  ```json
  {
    "message": "Internal server error"
  }
  ```

#### Notes

- The `password` is hashed before being stored in the database.
- A unique authentication token is generated upon successful registration.

### POST `user/login`

This route is used to log in an existing user.

#### Request Body

| Field      | Type   | Validation                         | Description               |
| ---------- | ------ | ---------------------------------- | ------------------------- |
| `email`    | String | Must be a valid email address      | The email of the user     |
| `password` | String | Must be at least 8 characters long | The password for the user |

#### Example Request Body

```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

#### Responses

- **200 OK**: User logged in successfully.

  ```json
  {
    "message": "User logged in successfully",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "example@example.com"
    },
    "token": "auth_token"
  }
  ```

- **400 Bad Request**: Validation errors.

  ```json
  {
    "errors": [
      {
        "msg": "invalid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

- **401 Unauthorized**: Invalid email or password.

  ```json
  {
    "error": "invalid email or password"
  }
  ```

- **500 Internal Server Error**: Server encountered an error.

  ```json
  {
    "message": "Internal server error",
    "error": "error_message"
  }
  ```

#### Notes

- The `password` is compared with the hashed password stored in the database.
- A unique authentication token is generated upon successful login.

### GET `user/profile`

This route is used to retrieve the profile of the currently authenticated user.

#### Headers

| Header          | Type   | Description                        |
| --------------- | ------ | ---------------------------------- |
| `Authorization` | String | Bearer token of the logged-in user |

#### Responses

- **200 OK**: User profile retrieved successfully.

  ```json
  {
    "user": {
      "id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "example@example.com"
    }
  }
  ```

- **401 Unauthorized**: User is not authenticated.

  ```json
  {
    "message": "Unauthorized access"
  }
  ```

- **500 Internal Server Error**: Server encountered an error.

  ```json
  {
    "message": "Internal server error"
  }
  ```

#### Notes

- This endpoint requires the user to be authenticated using a valid token.

---

### GET `user/logout`

This route is used to log out the currently authenticated user.

#### Headers

| Header          | Type   | Description                        |
| --------------- | ------ | ---------------------------------- |
| `Authorization` | String | Bearer token of the logged-in user |

#### Responses

- **200 OK**: User logged out successfully.

  ```json
  {
    "message": "User logged out successfully"
  }
  ```

- **401 Unauthorized**: User is not authenticated.

  ```json
  {
    "message": "Unauthorized access"
  }
  ```

- **500 Internal Server Error**: Server encountered an error.

  ```json
  {
    "message": "Internal server error"
  }
  ```

#### Notes

- The token used for authentication is blacklisted to prevent further use.
- The `token` cookie is cleared upon successful logout.
