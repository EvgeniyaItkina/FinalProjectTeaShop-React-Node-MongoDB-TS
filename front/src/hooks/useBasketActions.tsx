import { saveItemToBasket } from "../api";
import { useUserProducts } from "../contexts/UserProductsContext";

export const useBasketActions = () => {
  const { user, setUser } = useUserProducts();
  
  const addItemToBasket = async (productId: string, quantity: number) => {
    if (!user) return;
    const item = user.basketItems.find(
      (item) => item.product._id === productId
    );
    let newQuantity = quantity;
    if (item) newQuantity += item.quantity;
    const response = await saveItemToBasket(productId, newQuantity);
    if (!response) return;
    const newUserState = response.data;
    setUser(newUserState);
    return newUserState;
  };
  
  const setItemToBasket = async (productId: string, quantity: number) => {
    if (!user) return;
    const response = await saveItemToBasket(productId, quantity);
    if (!response) return;
    const newUserState = response.data;
    setUser(newUserState);
    return newUserState;
  };
  
  const deleteItemFromBasket = async (productId: string) => {
    if (!user) return;
    const response = await saveItemToBasket(productId, 0);
    if (!response) return;
    const newUserState = response.data;
    setUser(newUserState);
    return newUserState;
  };
  
  return { addItemToBasket, deleteItemFromBasket, setItemToBasket };
};