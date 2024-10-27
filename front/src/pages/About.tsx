
import Typography from "@mui/material/Typography";
import AboutContent from "../components/AboutContent/AboutContent";
import { MainLayout } from "../layouts/MainLayout";

export const About = () => {
  return (
    <MainLayout>
      <>
        <Typography variant="h4" align="center" sx={{ marginTop: '20px' }}>About</Typography>
        <AboutContent />
      </>
    </MainLayout>
  );
};
