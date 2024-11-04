import { useNavigate } from "react-router-dom";
import { CRMContent } from "../components/CRMContent/CRMContent";
import { useUserProducts } from "../contexts/UserProductsContext";
import { MainLayout } from "../layouts/MainLayout";

export const CRM = () => {
  const { user } = useUserProducts();
  const navigate = useNavigate();

    if (!user) {
      navigate("/");
    }

  //privent rendering component during navigation
  if (!user) return null;

    return (
    <MainLayout>
      <>
        <CRMContent />
      </>
    </MainLayout>
  );
};