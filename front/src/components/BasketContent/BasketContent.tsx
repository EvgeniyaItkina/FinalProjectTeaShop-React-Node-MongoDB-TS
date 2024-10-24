import { useUserProducts } from "../../contexts/UserProductsContext";
import { BasketTable } from "./BasketTable";

export const BasketContent = () => {
  const { user } = useUserProducts();
  if (!user) return;

  return (
    <div>
      <BasketTable basketItems={user?.basketItems} />
    </div>
  );
};