import React from "react";
import Notification from "../../../data/interfaces/notifications-interface";

import "./Table.scss";

interface Props {
  notifications: Notification[];
}

export const Table: React.FC<Props> = ({ notifications }) => {
  return (
    <>
      {notifications.map((notification) => (
        <h1 key={notification._id}>{notification.title}</h1>
      ))}
    </>
  );
};

export default Table;
