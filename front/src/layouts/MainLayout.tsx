import React from "react";
import { TopHeader } from "../components/TopHeader/TopHeader";
import { Box, Grid2 } from "@mui/material";
import { LeftMenu } from "../components/LeftMenu/LeftMenu";

export const MainLayout: React.FC<{
  children: JSX.Element;
  error?: string;
}> = ({ children, error }) => {
  return (
    <>
      <TopHeader />
      <Grid2 container spacing={0}>
        <Grid2 size={3} sx={{ display: { xs: "none", md: "block" } }}>
          <LeftMenu />
        </Grid2>
        <Grid2 size={{ md: 9, xs: 12 }}>
          <Box sx={{ padding: 2 }}>
            {error && <Box sx={{ color: "red" }}>{error}</Box>}
            {children}
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
};