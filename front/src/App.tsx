import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { useEffect } from "react";
import { getAllProducts, getMe } from "./api";
import { useUserProducts } from "./contexts/UserProductsContext";
import { Favorites } from "./pages/Favorites";
import { Product } from "./pages/Product";
import { Basket } from "./pages/Basket";
import { Login } from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/basket",
    element: <Basket />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <div>About</div>,
  },
]);

function App() {
  const { setProducts, setUser } = useUserProducts();
  useEffect(() => {
    console.log("App mounted");

    getAllProducts().then((response) => {
      setProducts(response.data.data);
    });
    getMe().then((response) => {
      if (!response) return;
      setUser(response.data);
    });
  }, []);

  return (
    <>
        <RouterProvider router={router} />
    </>
  );
};

export default App;