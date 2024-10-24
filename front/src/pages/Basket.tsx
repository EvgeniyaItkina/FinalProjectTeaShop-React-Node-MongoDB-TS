import { BasketContent } from "../components/BasketContent/BasketContent";
import { MainLayout } from "../layouts/MainLayout";

export const Basket = () => (
  <MainLayout>
    <>
      <h1>Basket</h1>
      <BasketContent />
    </>
  </MainLayout>
);