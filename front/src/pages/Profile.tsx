import { useUserProducts } from "../contexts/UserProductsContext";
import { MainLayout } from "../layouts/MainLayout";
import { RegistrationProfileContent } from "../components/RegistrationContent/RegistrationProfileContent";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
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
                <RegistrationProfileContent pageName={"Profile"} />
            </>
        </MainLayout>
    );
};