import React, { useEffect, useState } from "react";
import { getApplications } from "../../services/application-service";
import Application from "../../data/interfaces/application";
import Menu from "./menu/Menu";

import "./Sidebar.scss";
import { getCategoryColors } from "../../services/category-service";
import CategoryColor from "../../data/interfaces/category-color";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { fetchApplications } from "../../store/applications-slice";

export const Sidebar: React.FC = () => {
  const [categoryColors, setCategoryColors] = useState<CategoryColor[]>();
  const applications: Application[] = useAppSelector(
    (state) => state.applications.applications
  );
  const dispatch = useAppDispatch();

  // Load the applications and colors
  useEffect(() => {
    (async () => {
      const categoryColors = await getCategoryColors();
      setCategoryColors(categoryColors);
      dispatch(fetchApplications());
    })();
  }, []);

  return (
    <div className="Sidebar">
      {applications.length > 0 && categoryColors && (
        <Menu applications={applications} categoryColors={categoryColors} />
      )}
      {!applications && <p>Loading ...</p>}
    </div>
  );
};

export default Sidebar;
