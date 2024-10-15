import React from "react";
import { TopHeader } from "../components/TopHeader/TopHeader";
import { Box, Grid2 } from "@mui/material";
import { LeftMenu } from "../components/LeftMenu/LeftMenu";

export const MainLayout: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  return (
    <div>
   <TopHeader/>
   <Grid2 container spacing={0}>
        <Grid2 size={3} sx={{ display: { xs: "none", md: "block" } }}>
          <Box sx={{ backgroundColor: "lightblue", padding: 2 }}>
            <LeftMenu />
          </Box>
        </Grid2>
        <Grid2 size={{ md: 9, xs: 12 }}>
          <Box sx={{ backgroundColor: "lightgreen", padding: 2 }}>
            Правая колонка
          </Box>
        </Grid2>
      </Grid2>
    </div>
  );
};