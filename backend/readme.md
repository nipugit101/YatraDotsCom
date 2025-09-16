
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



# **Captain API Documentation**

---

## **Endpoint: `/captains/register`**

### **Method:** `POST`

Registers a new **captain (driver)** in the system.

---

## **Request Body**

```json
{
  "fullname": {
    "firstname": "string, min 5 chars, required, must be unique",  // e.g., "Nipukj"
    "lastname": "string, min 5 chars, required, must be unique"   // e.g., "Matabbar"
  },
  "email": "string, valid email, min 8 chars, required, unique", // e.g., "nipu@gmail.com"
  "password": "string, min 3 chars, required",                   // e.g., "Nipu@12345"
  "vehicle": {
    "vehicleType": "string, required, one of: car, auto, bike", // e.g., "car"
    "plate": "string, min 3 chars, required",                   // e.g., "TN65KS6569"
    "color": "string, min 3 chars, required",                   // e.g., "red"
    "capacity": "number, required, integer between 1-6"         // e.g., 4
  }
}
```

---

### **Example Request**

```json
{
  "fullname": {
    "firstname": "Nipukj",
    "lastname": "Matabbar"
  },
  "email": "nipu@gmail.com",
  "password": "Nipu@12345",
  "vehicle": {
    "vehicleType": "car",
    "plate": "TN65KS6569",
    "color": "red",
    "capacity": 4
  }
}
```

---

### **Responses**

#### ✅ **201 Created**

```json
{
  "success": true,
  "message": "Captain registered successfully",
  "data": {
    "id": "64fba567ab12cd4567890456",            // auto-generated ID
    "fullname": {
      "firstname": "Nipukj",
      "lastname": "Matabbar"
    },
    "email": "nipu@gmail.com",
    "vehicle": {
      "vehicleType": "car",
      "plate": "TN65KS6569",
      "color": "red",
      "capacity": 4
    },
    "status": "inactive"                          // default status
  },
  "token": "jwt_token_here"                      // JWT token for authentication
}
```

#### ⚠️ **400 Bad Request**

```json
{
  "success": false,
  "errors": [
    {
      "field": "fullname.firstname",
      "message": "First name must be at least 5 characters long"
    },
    {
      "field": "vehicle.vehicleType",
      "message": "vehicle type must be one of: car, auto, or bike"
    }
  ]
}
```

#### ⚠️ **409 Conflict**

```json
{
  "success": false,
  "message": "Captain already exists"
}
```

#### ❌ **500 Internal Server Error**

```json
{
  "success": false,
  "message": "Something went wrong, please try again later"
}
```

---

## **Endpoint: `/captains/login`**

### **Method:** `POST`

Login a captain and generate an authentication token.

---

### **Request Body**

```json
{
  "email": "string, valid email, required",        // e.g., "nipu@gmail.com"
  "password": "string, min 3 chars, required"      // e.g., "Nipu@12345"
}
```

---

### **Example Request**

```json
{
  "email": "nipu@gmail.com",
  "password": "Nipu@12345"
}
```

---

### **Responses**

#### ✅ **200 OK**

```json
{
  "success": true,
  "message": "Logged in successfully",
  "captain": {
    "id": "64fba567ab12cd4567890456",
    "fullname": {
      "firstname": "Nipukj",
      "lastname": "Matabbar"
    },
    "email": "nipu@gmail.com",
    "vehicle": {
      "vehicleType": "car",
      "plate": "TN65KS6569",
      "color": "red",
      "capacity": 4
    },
    "status": "inactive"
  },
  "token": "jwt_token_here"   // JWT token for authentication
}
```

#### ⚠️ **400 Bad Request**

```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email"
    }
  ]
}
```

#### ⚠️ **401 Unauthorized**

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## **Endpoint: `/captains/profile`**

### **Method:** `GET`

Fetch the currently logged-in captain's profile.

**Headers:**

```http
Authorization: Bearer <jwt_token_here>
```

---

### **Response**

#### ✅ **200 OK**

```json
{
  "success": true,
  "captain": {
    "id": "64fba567ab12cd4567890456",
    "fullname": {
      "firstname": "Nipukj",
      "lastname": "Matabbar"
    },
    "email": "nipu@gmail.com",
    "vehicle": {
      "vehicleType": "car",
      "plate": "TN65KS6569",
      "color": "red",
      "capacity": 4
    },
    "status": "inactive"
  }
}
```

#### ⚠️ **401 Unauthorized**

```json
{
  "success": false,
  "message": "Unauthorized"  // Token missing, invalid, or blacklisted
}
```

---

## **Endpoint: `/captains/logout`**

### **Method:** `POST`

Logout the captain and blacklist the token.

**Headers:**

```http
Authorization: Bearer <jwt_token_here>
```

---

### **Response**

#### ✅ **200 OK**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### ⚠️ **401 Unauthorized**

```json
{
  "success": false,
  "message": "Unauthorized"  // Token missing, invalid, or already blacklisted
}
```

---

