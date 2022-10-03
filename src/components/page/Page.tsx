import React from "react";
import { Outlet } from "react-router-dom";
import { APP_CONFIG } from "../../data/AppConfig";
import { Theme } from "@trading/energies-ui";

export const Page: React.FC = () => {
  return (
    <>
      <Theme
        color={APP_CONFIG.APP_COLOR}
        assets={APP_CONFIG.THEME_ASSET}
        fonts={APP_CONFIG.THEME_FONTS}
      />
      <Outlet/>
    </>
  );
};

export default Page;
