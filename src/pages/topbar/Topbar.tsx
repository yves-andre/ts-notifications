import React from "react";
import "./Topbar.scss";
import { Tabs } from "./Tabs/Tabs";
import DelegationToggle from "./DelegationToggle/DelegationToggle";
import { useAppSelector } from "../../hooks/use-app-selector";
import { CATEGORY } from "../../data/constants/category";

export const Topbar: React.FC = () => {
  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  );
  
  const title =
    selectedCategory === CATEGORY.ACTION_FEED
      ? "ACTION FEED"
      : "INFORMATION FEED";

  return (
    <div className="Topbar">
      <h1>{title}</h1>
      <div className="Topbar-actions">
        <Tabs />
        <DelegationToggle />
      </div>
    </div>
  );
};

export default Topbar;
