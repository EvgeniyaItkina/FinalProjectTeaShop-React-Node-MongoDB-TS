import { useNavigate } from "react-router-dom";
import { CRMContent } from "../components/CRMContent/CRMContent";
import { useUserProducts } from "../contexts/UserProductsContext";
import { MainLayout } from "../layouts/MainLayout";
import { useEffect } from "react";

export const CRM = () => {
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
        <CRMContent />
      </>
    </MainLayout>
  );
};