import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { UserProductsProvider } from "./contexts/UserProductsContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <div>About</div>,
  },
]);

function App() {
  
  return (
    <>
      <UserProductsProvider>
        <RouterProvider router={router} />
      </UserProductsProvider>
    </>
  );
}

export default App;