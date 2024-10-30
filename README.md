# 🫖 \*\*Flying Teapot Shop\*\*

\*\*Flying Teapot Shop\*\* is a learning project for an online tea shop, built to demonstrate \*\*FullStack development\*\* skills. The app enables users to explore tea products, manage a shopping cart and favorites, and provides admins the ability to manage product listings.

## 📑 \*\*Project Overview\*\*
\*\*Flying Teapot Shop\*\* is a small online tea shop created as a learning project after completing a FullStack course. It’s built with a modern tech stack for both frontend and backend, implementing core shop functionality with \*\*user role-based access\*\*.

## 🛠️ \*\*Technologies Used\*\*

### \*\*Frontend\*\*:
- \*\*React\*\* with \*\*Vite\*\* for fast bundling
- \*\*Material-UI\*\* for UI components
- \*\*React Router\*\* (\`createBrowserRouter\`, \`RouterProvider\`)
- \*\*Axios\*\* for HTTP requests
- \*\*Joi\*\* for data validation

### \*\*Backend\*\*:
- \*\*Express\*\* as the server framework
- \*\*MongoDB\*\* with \*\*Mongoose\*\* for database management
- \*\*JWT\*\* for authentication
- \*\*Bcrypt.js\*\* for password hashing
- \*\*TypeScript\*\* and \*\*Nodemon\*\* for development

## 📦 \*\*Setup\*\*

1. \*\*Clone the repository\*\*:
    ```bash
    git clone <repository URL>
    cd <project folder>
    ```

2. \*\*Install dependencies\*\* for frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. \*\*Create a \`.env\` file in the backend\*\*:
    ```env
    NODE_ENV="development"
    PORT=2024
    JWT_SECRET="d3v3l0pm3nt4c2e2"
    MONGO_DB_URL="mongodb://127.0.0.1:27017/tea-shop" # for local development
    ADMIN_EMAIL="admin@admin.com"
    ADMIN_PASSWORD="admin343443"
    ```

4. \*\*Launch the application\*\*:
   - **Frontend**:
     ```bash
     npm run dev
     ```
   - **Backend**:
     ```bash
     npm run dev
     ```

## 🌟 \*\*Core Features\*\*
1. \*\*For Users\*\*:
   - Registration and login
   - Access to \*\*Favorites\*\* and \*\*Basket\*\* pages
   - Profile management (name and phone)

2. \*\*For Admins\*\*:
   - Product management (create, edit, delete products)
   - Image upload and storage on the server
   - **Default Admin Account**: A default admin account is created on the initial server run, making it easy to start managing content.

## 📂 \*\*Project Structure\*\*

\*\*Frontend\*\*:
- **Pages**:
  - \`About\`, \`Basket\`, \`CRM\`, \`Favorites\`, \`Home\`, \`Login\`, \`Product\`, \`Profile\`, \`Registration\`.
- **HTTP requests** handled in \`api.ts\`.
- **Custom hooks**: \`useBasketActions\` and \`useItemActions\` for basket and item handling.

\*\*Backend\*\*:
- **models** – MongoDB models for users and products
- **controllers** – Request processing logic
- **middlewares** – Role-based and user access control
- **routes** – API endpoints
- **utils** – Utility functions for general use

## ⚙️ \*\*API and Server Functions\*\*
- **Data Validation**: \`Joi\` is used for server-side validation.
- **Access Management**: Admins can manage products, while registered users can view and add products to favorites and cart.
- **Error Handling**: Server errors are managed with custom handlers.

## 🚀 \*\*Deployment\*\*
For production build, run:
```bash
npm run build
```
