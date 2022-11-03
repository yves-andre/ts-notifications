import React, { useEffect, useState } from "react";
import { getApplications } from "../../services/application-service";
import Application from "../../data/interfaces/application";
import Menu from "./menu/Menu";

import "./Sidebar.scss";
import { getCategoryColors } from "../../services/category-service";
import CategoryColor from "../../data/interfaces/category-color";

export const Sidebar: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>();
  const [categoryColors, setCategoryColors] = useState<CategoryColor[]>();

  // Load the applications and colors
  useEffect(() => {
    (async () => {
      const [_applications, _categoryColors] = await Promise.all([
        getApplications(),
        getCategoryColors(),
      ]);
      setApplications(_applications);
      setCategoryColors(_categoryColors);
    })();
  }, []);

  return (
    <div className="Sidebar">
      {applications && categoryColors && (
        <Menu applications={applications} categoryColors={categoryColors} />
      )}
      {!applications && <p>Loading ...</p>}
    </div>
  );
};

export default Sidebar;
