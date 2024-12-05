# 🫖 **Flying Teapot Shop**

 **Flying Teapot Shop** is a learning project for an online tea shop, built to demonstrate **FullStack development** skills. The app enables users to explore tea products, manage a shopping cart and favorites, and provides admins the ability to manage product listings.

## 📑 **Project Overview**

**Flying Teapot Shop** is a small online tea shop created as a learning project after completing a FullStack course. It’s built with a modern tech stack for both frontend and backend, implementing core shop functionality with **user role-based access**.

## 🛠️ **Technologies Used**

### **Frontend**

- **React** with **Vite** for fast bundling
- **Material-UI** for UI components
- **React Router** (`createBrowserRouter`, `RouterProvider`)
- **Axios** for HTTP requests
- **Joi** for data validation

### **Backend**

- **Express** as the server framework
- **MongoDB** with **Mongoose** for database management
- **JWT** for authentication
- **Bcrypt.js** for password hashing
- **TypeScript** and **Nodemon** for development

## 📦 **Setup**

1. **Clone the repository**:

    ```bash
    git clone git@github.com:EvgeniyaItkina/FinalProjectTeaShop-React-Node-MongoDB-TS.git
    cd FinalProjectTeaShop-React-Node-MongoDB-TS
    ```

2. **Install dependencies** for frontend and backend:

    ```bash
    cd front && npm install && cd ../server && npm install && cd ../
    ```

3. **Create a `.env` file in the `server` directory**:

    ```env
    NODE_ENV=development
    PORT=2024
    JWT_SECRET=d3v3l0pm3nt4c2e2
    # Application credentials
    ADMIN_EMAIL=admin@admin.com
    ADMIN_PASSWORD=admin343443
    # MongoDB
    MONGO_DB_URL=mongodb://devapp:devapppassword@127.0.0.1:27017/tea-shop
    # Root user and password for MongoDB
    MONGODB_ROOT_USER=devroot
    MONGODB_ROOT_PASSWORD=devrootpassword
    # Database name, user and password for MongoDB
    MONGODB_DATABASE=tea-shop
    MONGODB_USERNAME=devapp
    MONGODB_PASSWORD=devapppassword
    # MongoDB Express credentials
    MONGOEXPRESS_LOGIN=mongo
    MONGOEXPRESS_PASSWORD=mongo
    ```

4. **Launch the application**:
   - **Backend**:

    ```bash
    cd server
    docker compose up -d
    npm run dev
    ```

   - **Frontend**:

    Please run these commands in the separate terminal window:

    ```bash
    cd front
    npm run dev
    ```

## 🌟 **Core Features**

1. **For Users**:
   - Registration and login
   - Access to **Favorites** and **Basket** pages
   - Profile management (name and phone)
   - Includes an authorization check that automatically redirects unauthorized users to the homepage, ensuring secure access to user-specific pages like the shopping basket.

2. **For Admins**:
   - Product management (create, edit, delete products)
   - Image upload and storage on the server
   - **Default Admin Account**: A default admin account is created on the initial server run, making it easy to start managing content.

## 📂 **Project Structure**

**Frontend**:

- **Pages**:
  - `About`, `Basket`, `CRM`, `Favorites`, `Home`, `Login`, `Product`, `Profile`, `Registration`.
- **HTTP requests** handled in `api.ts`.
- **Custom hooks**: `useBasketActions` and `useItemActions` for basket and item handling.

**Backend**:

- **models** – MongoDB models for users and products
- **controllers** – Request processing logic
- **middlewares** – Role-based and user access control
- **routes** – API endpoints
- **utils** – Utility functions for general use

## ⚙️ **API and Server Functions**

- **Data Validation**: `Joi` is used for server-side validation.
- **Access Management**: Admins can manage products, while registered users can view and add products to favorites and cart.
- **Error Handling**: Server errors are managed with custom handlers.

## 🚀 **Deployment**

For production build, run:

```bash
npm run build
```
