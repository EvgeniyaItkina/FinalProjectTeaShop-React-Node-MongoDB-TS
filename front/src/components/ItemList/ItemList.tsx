import { useMemo, useState } from "react";
import { useUserProducts } from "../../contexts/UserProductsContext";
import { saveFavorites } from "../../api";
import { useBasketActions } from "../../hooks/useBasketActions";
import { Box, Grid2, Stack } from "@mui/material";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { ItemRow } from "../../components/ItemRow/ItemRow";
import { ToggleView } from "../../components/ToggleView/ToggleView";
import { TModalWindow } from "../../TModalWindow/TModalWindow";


export const ItemList = (props: { onlyFavorites: boolean }) => {
  const {
    products,
    setUser,
    user,
    selectedCategory,
    subSelectedCategory,
    serchValue,
  } = useUserProducts();
  const [alignment, setAlignment] = useState<"module" | "list">("module");
  const filteredProducts = useMemo(() => {
    const selectedProducts = () => {
      if (!selectedCategory) return products;
      if (subSelectedCategory) {
        return products.filter(
          (product) =>
            product.category === selectedCategory &&
            product.subCategory === subSelectedCategory
        );
      }
      return products.filter(
        (product) => product.category === selectedCategory
      );
    };
    const execSearch = () => {
      if (!serchValue) return selectedProducts();
      return selectedProducts().filter((product) =>
        product.name.toLowerCase().includes(serchValue.toLowerCase())
      );
    };
    if (props.onlyFavorites) {
      return execSearch().filter((product) =>
        user?.favaoriteProducts.includes(product._id)
      );
    }
    return execSearch();
  }, [
    products,
    selectedCategory,
    subSelectedCategory,
    serchValue,
    user?.favaoriteProducts,
  ]);
  const { addItemToBasket } = useBasketActions();

  const onFavoriteChange = (item_id: string) => {
    if (!user) return;
    let newFavoriteProducts: string[] = [];

    if (user.favaoriteProducts.includes(item_id)) {
      newFavoriteProducts = user.favaoriteProducts.filter(
        (id) => id !== item_id
      );
      const newUser = { ...user };
      newUser.favaoriteProducts = newFavoriteProducts;
      setUser(newUser);
    } else {
      const newUser = { ...user };
      newUser.favaoriteProducts.push(item_id);
      newFavoriteProducts = newUser.favaoriteProducts;
      setUser(newUser);
    }

    saveFavorites(newFavoriteProducts).then((user) => {
      if (!user) return;
      setUser(user);
    });
  };
  const [isShowModal, setIsShowModal] = useState(false);
  const [addedItem, setAddedItem] = useState("");
  const handleAddToBasket = (item_id: string) => {
    addItemToBasket(item_id, 1).then((user) => {
      if (!user) return;
      const product = user.basketItems.find(
        (item) => item.product._id === item_id
      );
      setAddedItem(product?.product.name || "");
      setIsShowModal(true);
    });
  };
  return (
    <>
      <Box>
        <TModalWindow
          isShow={isShowModal}
          onClose={() => setIsShowModal(false)}
        >
          <Box>{addedItem} has added to basket!</Box>
        </TModalWindow>
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
                      onAddToBasket={(item_id) => handleAddToBasket(item_id)}
                      onFavoriteChange={(item_id) => onFavoriteChange(item_id)}
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
                    onAddToBasket={(item_id) => handleAddToBasket(item_id)}
                    onFavoriteChange={(item_id) => onFavoriteChange(item_id)}
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
    </>
  );
};