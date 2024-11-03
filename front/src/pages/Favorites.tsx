import Typography from "@mui/material/Typography";
import { Item } from "../components/Item/Item";
import { MainLayout } from "../layouts/MainLayout";
import { useUserProducts } from "../contexts/UserProductsContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Favorites: React.FC = () => {
  const { user } = useUserProducts();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  
//privent rendering component during navigation
if (!user) return null;

  return (
    <MainLayout>
      <>
      <Typography variant="h4" align="center" sx={{marginTop:'20px'}}>Favorites</Typography>
      <Item onlyFavorites={true}/>
      </>
    </MainLayout>
  );
};