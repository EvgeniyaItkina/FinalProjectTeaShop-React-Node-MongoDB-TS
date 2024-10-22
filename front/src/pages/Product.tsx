import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

export const Product = () => {
  const { id } = useParams();
  return (
    <MainLayout>
      <>
        <h1>Product</h1>
        {id}
      </>
    </MainLayout>
  );
};