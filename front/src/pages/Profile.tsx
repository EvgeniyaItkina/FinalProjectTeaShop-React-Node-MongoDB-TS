import { Box } from "@mui/material";
import { useUserProducts } from "../contexts/UserProductsContext";
import { MainLayout } from "../layouts/MainLayout";
import { RegistrationProfileContent } from "../components/RegistrationContent/RegistrationProfileContent";

export const Profile = () => {
    const { user } = useUserProducts();

    return (
        <MainLayout>
            <>
                {user && <RegistrationProfileContent pageName={"Profile"} />}
                {!user && <Box>Profile not found</Box>}
            </>
        </MainLayout>
    );
};