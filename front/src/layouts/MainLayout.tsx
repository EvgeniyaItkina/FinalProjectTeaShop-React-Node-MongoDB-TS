import React from "react";
import { TopHeader } from "../components/TopHeader/TopHeader";

export const MainLayout: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  return (
    <div>
   <TopHeader/>
    </div>
  );
};