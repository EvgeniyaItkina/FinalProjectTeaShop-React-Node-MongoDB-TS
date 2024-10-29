import Typography from "@mui/material/Typography";
import { Item} from "../components/Item/Item";
import { MainLayout } from "../layouts/MainLayout";
import { useUserProducts } from "../contexts/UserProductsContext";

export const Home: React.FC = () => {
  const {selectedCategory, subSelectedCategory} = useUserProducts();

  return (
    <MainLayout>
      <>
      <Typography variant="h4" align="center" sx={{marginTop:'20px'}}>{subSelectedCategory? selectedCategory +":"+ subSelectedCategory: selectedCategory}</Typography>
      <Item onlyFavorites={false} />
      </>
    </MainLayout>
  );
};