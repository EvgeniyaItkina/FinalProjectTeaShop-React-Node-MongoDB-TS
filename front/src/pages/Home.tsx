import { useEffect, useMemo, useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { getAllProducts, getMe } from "../api";
import { Box, Grid2, Stack } from "@mui/material";
import { ItemCard } from "../components/ItemCard/ItemCard";
import { ItemRow } from "../components/ItemRow/ItemRow";
import { ToggleView } from "../components/ToggleView/ToggleView";
import { useUserProducts } from "../contexts/UserProductsContext";

export const Home: React.FC = () => {
  const {
    setProducts,
    products,
    setUser,
    user,
    selectedCategory,
    subSelectedCategory,
  } = useUserProducts();
  const [alignment, setAlignment] = useState<"module" | "list">("module");
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    if (subSelectedCategory) {
      return products.filter(
        (product) =>
          product.category === selectedCategory &&
          product.subCategory === subSelectedCategory
      );
    }
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory, subSelectedCategory]);

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
        <Box>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <ToggleView
              view={alignment}
              onChange={(_, newAlignment) => {
                setAlignment(newAlignment);
              }}
            />
          </Box>
        </Box>
        {alignment === "module" && (
          <Grid2
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            marginTop={2}
          >
            {filteredProducts &&
              filteredProducts.map((product) => {
                return (
                  <Grid2
                    key={product._id}
                    size={{ xs: 3, sm: 4, md: 4 }}
                    justifyContent={"center"}
                  >
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
        )}
        {alignment === "list" && (
          <Stack spacing={1} marginTop={2}>
            {filteredProducts &&
              filteredProducts.map((product) => {
                return (
                  <ItemRow
                    key={product._id}
                    isFavorite={
                      user
                        ? user.favaoriteProducts.includes(product._id)
                        : false
                    }
                    item={product}
                    showActionsButtons={Boolean(user)}
                  />
                );
              })}
          </Stack>
        )}
      </Box>
    </MainLayout>
  );
};