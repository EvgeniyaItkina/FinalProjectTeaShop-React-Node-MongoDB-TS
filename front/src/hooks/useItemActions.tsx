import { useState } from "react";
import { useBasketActions } from "./useBasketActions";
import { useUserProducts } from "../contexts/UserProductsContext";
import { saveFavorites } from "../api";
import { Box } from "@mui/material";
import { TModalWindow } from "../TModalWindow/TModalWindow";

export const useItemActions = () => {
    const { addItemToBasket } = useBasketActions();
    const { user, setUser } = useUserProducts();

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

    const AddedItemToBasket = () => (
        <TModalWindow isShow={isShowModal} onClose={() => setIsShowModal(false)}>
            <Box>{addedItem} has added to basket!</Box>
        </TModalWindow>
    );
    return { onFavoriteChange, handleAddToBasket, AddedItemToBasket };
};