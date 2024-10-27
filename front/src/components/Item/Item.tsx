import { useMemo, useState } from "react";
import { useUserProducts } from "../../contexts/UserProductsContext";
import { Box, Grid2, Stack } from "@mui/material";
import { ItemCard } from "../ItemCard/ItemCard";
import { ItemRow } from "../ItemRow/ItemRow";
import { ToggleView } from "../ToggleView/ToggleView";
import { useItemActions } from "../../hooks/useItemActions";
import { AdminItemControls } from "../AdminItemControls/AdminItemControls";
import { AdminItemEdit } from "../AdminItemEdit/AdminItemEdit";
import { TModalWindow } from "../../TModalWindow/TModalWindow";


export const Item = (props: { onlyFavorites: boolean }) => {
  const {
    products,
    user,
    selectedCategory,
    subSelectedCategory,
    serchValue,
  } = useUserProducts();
  const [alignment, setAlignment] = useState<"module" | "list">("module");
  const [selectedItemToEdit, setSelectedItemToEdit] = useState<string | null>(
    null
  );

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

  const { onFavoriteChange, handleAddToBasket, AddedItemToBasket } =
    useItemActions();

  function adminDeleteProduct(_id: string) {
    console.log("delete", _id);
  }
  function adminEditProduct(_id: string) {
    setSelectedItemToEdit(_id);
    console.log("edit", _id);
  }

  return (
    <>
    {selectedItemToEdit && (
        <TModalWindow
          isShow={Boolean(selectedItemToEdit)}
          onClose={() => {
            setSelectedItemToEdit(null);
          }}
        >
          <AdminItemEdit id={selectedItemToEdit} />
        </TModalWindow>
      )}
      <Box>
        <AddedItemToBasket />
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
                      adminItemControls={
                        <AdminItemControls
                          onDelete={() => {
                            adminDeleteProduct(product._id);
                          }}
                          onEdit={() => {
                            adminEditProduct(product._id);
                          }}
                        />
                      }
                      isAdmin={Boolean(user?.role === "admin")}
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
                    adminItemControls={
                      <AdminItemControls
                        onDelete={() => {
                          adminDeleteProduct(product._id);
                        }}
                        onEdit={() => {
                          adminEditProduct(product._id);
                        }}
                      />
                    }
                    isAdmin={Boolean(user?.role === "admin")}
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
