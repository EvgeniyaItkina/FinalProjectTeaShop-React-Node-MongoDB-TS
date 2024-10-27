import { Typography } from "@mui/material";
import { LoginContent } from "../components/LoginContent/LoginContent";
import { useUserProducts } from "../contexts/UserProductsContext";
import { MainLayout } from "../layouts/MainLayout";

export const Login = () => {
  const { user } = useUserProducts();

  if (user) window.location.href = "/profile";
  return (
    <MainLayout>
      <>
      <Typography variant="h4" align="center" sx={{marginTop:'20px'}}>Login</Typography>
        <LoginContent />
      </>
    </MainLayout>
  );
};