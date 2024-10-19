import { useEffect } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { getAllProducts, getMe } from "../api";
import { Box, Grid2 } from "@mui/material";
import { ItemCard } from "../components/ItemCard/ItemCard";
import { useUserProducts } from "../contexts/UserProductsContext";

export const Home: React.FC = () => {
  const { setProducts, products, setUser, user } = useUserProducts();
  useEffect(() => {
    getAllProducts().then((response) => {
      setProducts(response.data.data);
    });
    getMe().then((response) => {
      if (!response) return;
      setUser(response.data);
    });
  }, []);

  return (
    <MainLayout>
      <Box>
        <Box>Table/Row view</Box>
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {products &&
            products.map((product) => {
              return (
                <Grid2 key={product._id} size={{ xs: 2, sm: 4, md: 4 }}>
                  <ItemCard
                    isFavorite={
                      user
                        ? user.favaoriteProducts.includes(product._id)
                        : false
                    }
                    item={product}
                    showActionsButtons={Boolean(user)}
                  />
                </Grid2>
              );
            })}
        </Grid2>
      </Box>
    </MainLayout>
  );
};