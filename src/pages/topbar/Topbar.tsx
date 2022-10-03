import React from "react";
import "./Topbar.scss";
import { Tabs } from "./Tabs/Tabs";
import DelegationToggle from "./DelegationToggle/DelegationToggle";

export const Topbar: React.FC = () => {
  return (
    <>
      <h1>Topbar</h1>
      <Tabs />
      <DelegationToggle />
    </>
  );
};

export default Topbar;
