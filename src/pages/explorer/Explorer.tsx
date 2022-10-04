import React from "react";
import Table from "./table/Table";
import { useAppSelector } from "../../hooks/use-app-selector";

import "./Explorer.scss";
import Notification from "../../data/interfaces/notifications-interface";

export const Explorer: React.FC = () => {
  const notifications: Notification[] = useAppSelector(
    (state) => state.notifications.notificationItems
  );

  return (
    <>
      <h1>Explorer</h1>
      <Table notifications={notifications}/>
    </>
  );
};

export default Explorer;
