import React, { useEffect, useState } from "react";
import { getApplications } from "../../services/application-service";
import Application from "../../data/interfaces/application";
import Menu from "./menu/Menu";

import "./Sidebar.scss";
import { getCategoryColors } from "../../services/category-service";
import CategoryColor from "../../data/interfaces/category-color";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { fetchApplications, fetchCategoryColors } from "../../store/applications-slice";
import { fetchNotificationCounts } from "../../store/notifications-slice";
import { NotificationCount } from "../../data/interfaces/notification-count";

export const Sidebar: React.FC = () => {
  const applications: Application[] = useAppSelector(
    (state) => state.applications.applications
  );
  const categoryColors: CategoryColor[] = useAppSelector(
    (state) => state.applications.categoryColors
  );
  const notificationCounts: NotificationCount[] = useAppSelector(
    (state) => state.notifications.notificationCounts
  )

  const dispatch = useAppDispatch();

  // Load the applications and colors
  useEffect(() => {
    (async () => {
      dispatch(fetchCategoryColors());
      dispatch(fetchApplications());
      dispatch(fetchNotificationCounts());
    })();
  }, []);

  return (
    <div className="Sidebar">
      {applications.length > 0 && notificationCounts.length > 0 && categoryColors && (
        <Menu applications={applications} categoryColors={categoryColors} notificationCounts={notificationCounts}/>
      )}
      {!applications && <p>Loading ...</p>}
    </div>
  );
};

export default Sidebar;
