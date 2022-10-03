import React from "react";
import { Outlet } from "react-router-dom";
import { APP_CONFIG } from "../../data/app-config";
import { Theme, Layout } from "@trading/energies-ui";
import { Topbar } from "../../pages/topbar/Topbar";
import { Sidebar } from "../../pages/sidebar/Sidebar";

export const Page: React.FC = () => {
  return (
    <>
      <Theme
        color={APP_CONFIG.APP_COLOR}
        assets={APP_CONFIG.THEME_ASSET}
        fonts={APP_CONFIG.THEME_FONTS}
      />
      <Layout heightDefault={75}>
        <Layout.Top>
          <Topbar />
        </Layout.Top>
        <Layout.Sidebar>
          <Sidebar />
        </Layout.Sidebar>
        <Outlet />
      </Layout>
    </>
  );
};

export default Page;
