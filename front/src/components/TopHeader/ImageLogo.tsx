import { Box, BoxOwnProps, Theme } from "@mui/system";
import logo from "./logo.jpg";

export const ImageLogo = (pr: { sx: BoxOwnProps<Theme>["sx"] | undefined }) => {
  return (
    <Box sx={pr.sx}>
      <img src={logo} />
    </Box>
  );
};