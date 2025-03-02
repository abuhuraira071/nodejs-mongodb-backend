---

![Node.js and MongoDB Backend](https://img.shields.io/badge/Node.js-MongoDB-blue.svg)

# Node.js and MongoDB Backend

A backend application built with **Node.js** and **MongoDB**, designed to handle user authentication and management through a simple RESTful API. It supports user signup, login, and token-based authentication using **JSON Web Tokens (JWT)**. This project serves as the foundation for building scalable, data-driven web applications.

---

## 🚀 Features

- **User Authentication**: Secure signup and login using JWT-based authentication.
- **MongoDB Integration**: Stores user data and other resources in MongoDB.
- **Modular Architecture**: Separated files for routes, controllers, models, and middleware for easy maintenance and scalability.
- **Middleware**: Protects routes with authentication middleware for secure access control.
- **Environment Variables**: Configuration of sensitive data like database URI and JWT secret via `.env` file.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (or use a cloud-based MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abuhuraira071/nodejs-mongodb-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nodejs-mongodb-backend
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following variables:

   ```bash
   MONGODB_URL=your_mongo_db_connection_string
   TOKEN_KEY=your_jwt_secret_key
   ```

5. Run the application:

   ```bash
   npm start
   ```

   The server will start, and you can access the API at `http://localhost:3000`.

---

## 🧑‍💻 API Endpoints

### Public Routes (No Authentication Required)

- **POST `/api/signup`**: Create a new user account.
  - Request body: 

    ```json
    {
      "username": "example",
      "email": "user@example.com",
      "password": "password"
    }
    ```

- **POST `/api/login`**: Login with an existing user.
  - Request body: 

    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```

---

### Protected Routes (Requires Authentication)

- **GET `/api/protected`**: A protected route that requires JWT authentication.
  - Include JWT token in the `Authorization` header as `Bearer YOUR_JWT_TOKEN_HERE`.
  - Example response:

    ```json
    {
      "message": "Hello <username>, this is a protected route!"
    }
    ```

- **GET `/profile`**: Access the authenticated user's profile (requires JWT authentication).
  - Example response:

    ```json
    {
      "message": "Hello <username>, Welcome to Your Profile"
    }
    ```

---

### Logout Route

- **GET `/logout`**: Logs out the user by clearing the authentication token.
  - Example response:

    ```json
    {
      "message": "Logged out successfully"
    }
    ```

---

## 🔑 Authentication with JWT

For routes like `/api/protected` and `/profile`, you need to include the JWT in the **Authorization** header.

### Using Postman or API Client

1. Set the method to `GET`.
2. URL: `http://localhost:5000/api/protected` or `http://localhost:5000/profile`.
3. In the **Headers** section, add the following:
   - **Key**: `Authorization`
   - **Value**: `Bearer YOUR_JWT_TOKEN_HERE`

---

### Using Frontend (e.g., `fetch`)

Here's how you can make a request from your frontend code:

```javascript
fetch('http://localhost:5000/api/protected', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${yourJWTToken}`,
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

## 🎯 Contributing

We welcome contributions! If you find any bugs or have suggestions for new features, feel free to create an issue or submit a pull request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

### 📝 Updates Made:
- Added `/api/protected` route in the **API Endpoints** section.
- Explained how to include the **JWT token** in the `Authorization` header for protected routes.
- Updated examples for using the JWT token in both Postman and frontend code.

---
