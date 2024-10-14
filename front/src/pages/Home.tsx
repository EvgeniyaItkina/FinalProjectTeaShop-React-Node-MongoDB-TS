import { useEffect } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { useUserProducts } from "../contexts/UserProductsContext";
import { getAllProducts } from "../api";

export const Home: React.FC = () => {
  const userContext = useUserProducts();
  useEffect(() => {
    getAllProducts().then((response) => {
      console.log(response.data);
    });
  }, []);
  return (
    <MainLayout>
      <>
        <h1>Home</h1>
        <div>{userContext.user?.name}</div>
      </>
    </MainLayout>
  );
};