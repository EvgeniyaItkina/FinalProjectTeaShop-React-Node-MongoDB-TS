import { useMemo, useState } from "react";
import { useUserProducts } from "../../contexts/UserProductsContext";
import { Box, Button, Grid2, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ItemCard } from "../ItemCard/ItemCard";
import { ItemRow } from "../ItemRow/ItemRow";
import { ToggleView } from "../ToggleView/ToggleView";
import { useItemActions } from "../../hooks/useItemActions";
import { AdminItemControls } from "../AdminItemControls/AdminItemControls";
import { AdminItemEdit } from "../AdminItemEdit/AdminItemEdit";
import { TModalWindow } from "../../TModalWindow/TModalWindow";
import { deleteProduct } from "../../api";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { LeftMenu } from "../LeftMenu/LeftMenu";
import { ServerErrorCollapse } from "../ServerErrorCollapse/ServerErrorCollapse";


export const Item = (props: { onlyFavorites: boolean }) => {
  const {
    products,
    user,
    selectedCategory,
    subSelectedCategory,
    serchValue,
    setProducts,
  } = useUserProducts();
  const [alignment, setAlignment] = useState<"module" | "list">("module");
  const [serverError, setServerError] = useState<string>("");
  const [showMobileCategoryMenu, setShowMobileCategoryMenu] = useState(false);
  const [selectedItemToEdit, setSelectedItemToEdit] = useState<string | null>(
    null
  );
  const [addNewItemWindow, setAddNewItemWindow] = useState(false);

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
    if (!confirm("Are you sure you want to delete this item?")) return;
    deleteProduct(_id)
      .then((res) => {
        if (!res || res.error !== 0) {
          setServerError("Server error deleting.");
          window.scrollTo(0, 0);
        } else {
          setProducts(products.filter((product) => product._id !== _id));
        }
      })
      .catch((e) => {
        setServerError(e.message);
        window.scrollTo(0, 0);
      });
  }

  function adminEditProduct(_id: string) {
    setSelectedItemToEdit(_id);
  }

  return (
    <>
     {showMobileCategoryMenu && (
        <Box
          display={{ xs: "block", md: "none" }}
          position={"fixed"}
          height={"100vh"}
          width={"100vw"}
          top={0}
          left={0}
          zIndex={1000}
          bgcolor={"white"}
          paddingRight={2}
        >
          <IconButton
            onClick={() => setShowMobileCategoryMenu(false)}
            sx={{ marginLeft: "auto", marginTop: 1, display: "block" }}
          >
            <CloseIcon />
          </IconButton>
          <LeftMenu
            onItemSelected={() => {
              setShowMobileCategoryMenu(false);
            }}
          />
        </Box>
      )}
      <ServerErrorCollapse
        serverError={serverError}
        setServerError={setServerError}
      />
      {selectedItemToEdit && (
        <TModalWindow
          isShow={Boolean(selectedItemToEdit)}
          onClose={() => {
            setSelectedItemToEdit(null);
          }}
          showCloseButton={false}
        >
          <AdminItemEdit id={selectedItemToEdit}
            onItemChanged={() => setSelectedItemToEdit("")}
          />
        </TModalWindow>
      )}
      {addNewItemWindow && (
        <TModalWindow
          isShow={addNewItemWindow}
          onClose={() => {
            setAddNewItemWindow(false);
          }}
          showCloseButton={false}
        >
          <AdminItemEdit onItemChanged={() => setAddNewItemWindow(false)} />
        </TModalWindow>
      )}
      <Box>
        <AddedItemToBasket />
        <Box>
        <Box>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              onClick={() => setShowMobileCategoryMenu(!showMobileCategoryMenu)}
              variant="contained"
              sx={{ marginRight: "auto", display: { xs: "", md: "none" } }}
            >
              <ArrowForwardIosIcon />
            </Button>
            {user?.role === "admin" && (
              <Button
                sx={{ marginRight: 1 }}
                variant="contained"
                onClick={() => {
                  setAddNewItemWindow(true);
                }}
              >
                Add Item
              </Button>
            )}
            <ToggleView
              view={alignment}
              onChange={(_, newAlignment) => {
                setAlignment(newAlignment);
              }}
            />
          </Box>
        </Box>
        </Box>
        {alignment === "module" && (
          <Grid2
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            marginTop={2}
            justifyContent={"center"}
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