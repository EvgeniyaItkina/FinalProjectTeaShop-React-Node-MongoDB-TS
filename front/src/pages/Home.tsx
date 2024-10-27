import Typography from "@mui/material/Typography";
import { Item} from "../components/Item/Item";
import { MainLayout } from "../layouts/MainLayout";

export const Home: React.FC = () => {
  return (
    <MainLayout>
      <>
      <Typography variant="h4" align="center" sx={{marginTop:'20px'}}>Home</Typography>
      <Item onlyFavorites={false} />
      </>
    </MainLayout>
  );
};