import { LoginContent } from "../components/LoginContent/LoginContent";
import { useUserProducts } from "../contexts/UserProductsContext";
import { MainLayout } from "../layouts/MainLayout";

export const Login = () => {
  const { user } = useUserProducts();

  if (user) window.location.href = "/profile";
  return (
    <MainLayout>
      <>
        <LoginContent />
      </>
    </MainLayout>
  );
};