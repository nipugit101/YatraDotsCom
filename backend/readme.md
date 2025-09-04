
---

# User & Captain API Documentation

---

## **Endpoint: `/user/register`**

### **Method:** `POST`

Registers a new **user** in the system.

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
* `email` → **required**, valid email format, min 8 characters, must be unique.
* `password` → **required**, min 3 characters.

---

## **Responses**

### ✅ **201 Created**

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

### ⚠️ **400 Bad Request**

```json
{
  "success": false,
  "errors": [
    {
      "field": "fullname.firstname",
      "message": "First name must be at least 5 characters long"
    }
  ]
}
```

### ⚠️ **409 Conflict**

```json
{
  "success": false,
  "message": "Email already exists"
}
```

### ❌ **500 Internal Server Error**

```json
{
  "success": false,
  "message": "Something went wrong, please try again later"
}
```

---

# **Endpoint: `/captain/register`**

### **Method:** `POST`

Registers a new **captain (driver)** in the system with vehicle details.

---

## **Request Body**

```json
{
  "fullname": {
    "firstname": "string (min 5 chars, required, unique)",
    "lastname": "string (min 5 chars, required, unique)"
  },
  "email": "string (valid email, min 8 chars, required, unique)",
  "password": "string (min 3 chars, required)",
  "vehical": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "number (1-6, required)",
    "vehicalType": "string (car | auto | bike)"
  }
}
```

### **Example Request**

```json
{
  "fullname": {
    "firstname": "Nipukj",
    "lastname": "Matabbar"
  },
  "email": "nipu@gmail.com",
  "password": "Nipu@12345",
  "vehical": {
    "color": "red",
    "plate": "TN65KS6569",
    "capacity": 4,
    "vehicalType": "car"
  }
}
```

---

## **Validation Rules**

* `fullname.firstname` → **required**, at least 5 characters, must be unique.
* `fullname.lastname` → **required**, at least 5 characters, must be unique.
* `email` → **required**, valid email format, min 8 characters, must be unique.
* `password` → **required**, at least 3 characters.
* `vehical.color` → **required**, at least 3 characters.
* `vehical.plate` → **required**, at least 3 characters.
* `vehical.capacity` → **required**, integer between 1 and 6.
* `vehical.vehicalType` → **required**, must be one of `car`, `auto`, or `bike`.

---

## **Responses**

### ✅ **201 Created**

```json
{
  "success": true,
  "message": "Captain registered successfully",
  "data": {
    "id": "64fba567ab12cd4567890456",
    "fullname": {
      "firstname": "Nipukj",
      "lastname": "Matabbar"
    },
    "email": "nipu@gmail.com",
    "vehical": {
      "color": "red",
      "plate": "TN65KS6569",
      "capacity": 4,
      "vehicalType": "car"
    },
    "status": "inactive"
  },
  "token": "jwt_token_here"
}
```

### ⚠️ **400 Bad Request**

```json
{
  "success": false,
  "errors": [
    {
      "field": "vehical.vehicalType",
      "message": "Vehical type must be one of: car, auto, or bike"
    }
  ]
}
```

### ⚠️ **409 Conflict**

```json
{
  "success": false,
  "message": "Captain already exists"
}
```

### ❌ **500 Internal Server Error**

```json
{
  "success": false,
  "message": "Something went wrong, please try again later"
}
```

---
