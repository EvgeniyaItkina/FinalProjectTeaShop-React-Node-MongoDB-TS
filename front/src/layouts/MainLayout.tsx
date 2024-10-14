import React from "react";

export const MainLayout: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  return (
    <div>
      <header>
        <h1>My App</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};