

# User API Documentation

## **Endpoint: `/user/register`**

### **Method:** `POST`

Registers a new user in the system.

---

## **Request Body**

The endpoint expects a JSON object with the following fields:

```json
{
  "fullname": {
    "firstname": "string (min 5 chars, required, unique)",
    "lastname": "string (min 5 chars, required, unique)"
  },
  "email": "string (valid email, min 8 chars, required, unique)",
  "password": "string (min 3 chars, required)"
}
```

### **Example Request**

```json
{
  "fullname": {
    "firstname": "Michael",
    "lastname": "Johnson"
  },
  "email": "michael.johnson@example.com",
  "password": "mypassword"
}
```

---

## **Validation Rules**

* `fullname.firstname` → **required**, at least 5 characters, must be unique.
* `fullname.lastname` → **required**, at least 5 characters, must be unique.
* `email` → **required**, must be a valid email format, at least 8 characters, must be unique.
* `password` → **required**, at least 3 characters.

---

## **Responses**

### ✅ **201 Created**

User successfully registered.

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "64fba567ab12cd4567890123",
    "fullname": {
      "firstname": "Michael",
      "lastname": "Johnson"
    },
    "email": "michael.johnson@example.com"
  }
}
```

---

### ⚠️ **400 Bad Request**

Validation error or missing fields.

```json
{
  "success": false,
  "errors": [
    {
      "field": "fullname.firstname",
      "message": "First name must be at least 5 characters long"
    },
    {
      "field": "email",
      "message": "Please enter a valid email"
    }
  ]
}
```

---

### ⚠️ **409 Conflict**

When email or fullname is already taken.

```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

### ❌ **500 Internal Server Error**

Unexpected server error.

```json
{
  "success": false,
  "message": "Something went wrong, please try again later"
}
```

---

## **Example Usage**

### **Request**

```http
POST /user/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "Michael",
    "lastname": "Johnson"
  },
  "email": "michael.johnson@example.com",
  "password": "mypassword"
}
```

### **Successful Response**

```http
201 Created
```

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "64fba567ab12cd4567890123",
    "fullname": {
      "firstname": "Michael",
      "lastname": "Johnson"
    },
    "email": "michael.johnson@example.com"
  }
}
```
