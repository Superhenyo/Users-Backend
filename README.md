## Users-Backend
A RESTful API for can be use for users backend, it can do checkemailexist, delete user, add user, update user, and an login where it will return a token using JWT

# Technology 
    * Typescript
    * node
    * MySQL(sequelize)
    * Express

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Superhenyo/Users-Backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Users-Backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Compile TypeScript to JavaScript:
   ```bash
   npm run build
   ```

5. Start the server in development mode:
   ```bash
   npm run dev
   ```

## API Endpoints

### 1. **POST /users/register**
   - **Description**: Register a new user.
   - **Body** (JSON):
     ```json
     {
       "email": "user@example.com",
       "password": "yourpassword"
     }
     ```
   - **Response**: A success message or error.

### 2. **POST /users/login**
   - **Description**: Login and receive a JWT token.
   - **Body** (JSON):
     ```json
     {
       "email": "user@example.com",
       "password": "yourpassword"
     }
     ```
   - **Response**: JWT token on successful login.

### 3. **GET /users/:email**
   - **Description**: Check if an email exists.
   - **Params**: `email` (URL parameter)
   - **Response**: User data if found, or error message.

### 4. **PUT /users/:id**
   - **Description**: Update user details.
   - **Body** (JSON):
     ```json
     {
       "email": "new-email@example.com",
       "password": "newpassword"
     }
     ```
   - **Response**: Updated user data.

### 5. **DELETE /users/:id**
   - **Description**: Delete a user by ID.
   - **Response**: Success message or error.
```

This is the full content combined into one block. You can now copy and paste it directly into your README file.