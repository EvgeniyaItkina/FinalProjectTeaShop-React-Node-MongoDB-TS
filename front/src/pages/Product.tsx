import { useParams } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { useUserProducts } from "../contexts/UserProductsContext";
import { ItemCard } from "../components/ItemCard/ItemCard";
import { useItemActions } from "../hooks/useItemActions";
import { Box } from "@mui/material";

export const Product = () => {
  const { id } = useParams();
  const { products, user } = useUserProducts();
  const product = products.find((product) => product._id === id);
  if (!product) {
    return <div>Product not found</div>;
  }
  const { onFavoriteChange, handleAddToBasket, AddedItemToBasket } =
    useItemActions();

  return (
    <MainLayout>
      <Box display={"flex"} justifyItems={"center"}>
        <AddedItemToBasket />
        <Box width={"80%"} margin={"auto"}>
          <ItemCard
            adminItemControls={null}
            isAdmin={Boolean(user?.role === "admin")}
            maxWidth={"100%"}
            item={product}
            onFavoriteChange={onFavoriteChange}
            onAddToBasket={handleAddToBasket}
            showActionsButtons={Boolean(user)}
            isFavorite={Boolean(user?.favaoriteProducts.includes(product._id))}
          />
        </Box>
      </Box>
    </MainLayout>
  );
};