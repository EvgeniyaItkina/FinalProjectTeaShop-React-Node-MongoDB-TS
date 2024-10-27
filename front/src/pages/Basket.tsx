import Typography from "@mui/material/Typography";
import { BasketContent } from "../components/BasketContent/BasketContent";
import { MainLayout } from "../layouts/MainLayout";

export const Basket = () => (
  <MainLayout>
    <>
      <Typography variant="h4" align="center" sx={{ marginTop: '20px' }}>Basket</Typography>
      <BasketContent />
    </>
  </MainLayout>
);