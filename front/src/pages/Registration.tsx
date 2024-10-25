
import { RegistrationProfileContent } from "../components/RegistrationContent/RegistrationProfileContent";
import { MainLayout } from "../layouts/MainLayout";

export const Registration = () => {
    return (
        <MainLayout>
            <>
                <RegistrationProfileContent pageName={"Registration"} />
            </>
        </MainLayout>
    );
};
