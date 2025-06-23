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

### POST `/captain/login`

This route is used to log in an existing captain.

#### Request Body

| Field      | Type   | Validation                         | Description                  |
| ---------- | ------ | ---------------------------------- | ---------------------------- |
| `email`    | String | Must be a valid email address      | The email of the captain     |
| `password` | String | Must be at least 8 characters long | The password for the captain |

#### Example Request Body

```json
{
  "email": "captain@example.com",
  "password": "password123"
}
```

#### Responses

- **200 OK**: Captain logged in successfully.

  ```json
  {
    "message": "Captain logged in successfully",
    "captain": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "captain@example.com",
      "vechile": {
        "color": "red",
        "plateNumber": "ABC123",
        "capacity": 4,
        "type": "car"
      }
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
    "error": "Invalid email or password"
  }
  ```

- **500 Internal Server Error**: Server encountered an error.

  ```json
  {
    "message": "Internal server error"
  }
  ```

---

### GET `/captain/logout`

This route is used to log out the currently authenticated captain.

#### Headers

| Header          | Type   | Description                           |
| --------------- | ------ | ------------------------------------- |
| `Authorization` | String | Bearer token of the logged-in captain |

#### Responses

- **200 OK**: Captain logged out successfully.

  ```json
  {
    "message": "Captain logged out successfully"
  }
  ```

- **401 Unauthorized**: Captain is not authenticated.

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

---

### GET `/captain/profile`

This route is used to retrieve the profile of the currently authenticated captain.

#### Headers

| Header          | Type   | Description                           |
| --------------- | ------ | ------------------------------------- |
| `Authorization` | String | Bearer token of the logged-in captain |

#### Responses

- **200 OK**: Captain profile retrieved successfully.

  ```json
  {
    "captain": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "captain@example.com",
      "vechile": {
        "color": "red",
        "plateNumber": "ABC123",
        "capacity": 4,
        "type": "car"
      }
    }
  }
  ```

- **404 Not Found**: Captain not found.

  ```json
  {
    "message": "Captain not found"
  }
  ```

- **500 Internal Server Error**: Server encountered an error.

  ```json
  {
    "message": "Internal server error"
  }
  ```

#### Notes

- This requires the captain to be authenticated using a valid token.
