import React from "react";
import { Button, Table as TableUI } from "@trading/energies-ui";
import Notification from "../../../data/interfaces/notification";
import { formatDate } from "../../../utils/formatters";
import Highlight from "../../../components/Highlight/Highlight";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { filtersActions } from "../../../store/filters-slice";

import "./Table.scss";
import { fetchNotifications, notificationActions } from "../../../store/notifications-slice";

interface Props {
  notifications: Notification[];
}

export const Table: React.FC<Props> = ({ notifications }) => {
  const search = useAppSelector((state) => state.filters.searchFilter);
  const sortFilter = useAppSelector((state) => state.filters.sortFilter);
  const dispatch = useAppDispatch();

  const sortColumnHandler = (fieldName: string) => {
    if (sortFilter.field === fieldName) {
      sortFilter.asc
        ? dispatch(filtersActions.setSortFilter({ ...sortFilter, asc: false }))
        : dispatch(filtersActions.setSortFilter({ field: "", asc: true }));
    } else {
      dispatch(filtersActions.setSortFilter({ field: fieldName, asc: true }));
    }
  };

  const openNotificationHandler = (notification: Notification) => {
    window.open(notification.sourceUrl, '_blank', 'noopener,noreferrer');
  }

  const dismissNotificationHandler = (notification: Notification) => {
    alert("DISMISS " + notification.title);
    dispatch(fetchNotifications())
  }

  return (
    <TableUI>
      <thead>
        <tr>
          <td onClick={() => sortColumnHandler("title")}>
            <span>Source </span>
            {sortFilter.field === "title" && sortFilter.asc && <span>⌄</span>}
            {sortFilter.field === "title" && !sortFilter.asc && <span>^</span>}
          </td>
          <td onClick={() => sortColumnHandler("subtitle")}>
            <span>Subject </span>
            {sortFilter.field === "subtitle" && sortFilter.asc && <span>⌄</span>}
            {sortFilter.field === "subtitle" && !sortFilter.asc && <span>^</span>}
          </td>
          <td onClick={() => sortColumnHandler("description")}>
            <span>Description </span>
            {sortFilter.field === "description" && sortFilter.asc && <span>⌄</span>}
            {sortFilter.field === "description" && !sortFilter.asc && <span>^</span>}
          </td>
          <td onClick={() => sortColumnHandler("details")}>
            <span>Sent to </span>
            {sortFilter.field === "details" && sortFilter.asc && <span>⌄</span>}
            {sortFilter.field === "details" && !sortFilter.asc && <span>^</span>}
          </td>
          <td onClick={() => sortColumnHandler("date")}>
            <span>Date </span>
            {sortFilter.field === "date" && sortFilter.asc && <span>⌄</span>}
            {sortFilter.field === "date" && !sortFilter.asc && <span>^</span>}
          </td>
          <td>
            <span>Actions</span>
          </td>
        </tr>
      </thead>
      <tbody>
        {notifications.map((notification) => (
          <tr key={notification._id}>
            <th>
              <Highlight highlight={search}>{notification.title}</Highlight>
            </th>
            <th>
              <Highlight highlight={search}>{notification.subtitle}</Highlight>
            </th>
            <th>
              <Highlight highlight={search}>
                {notification.description}
              </Highlight>
            </th>
            <th>
              <Highlight highlight={search}>{notification.details}</Highlight>
            </th>
            <th>
              <Highlight highlight={search}>
                {formatDate(notification.date)}
              </Highlight>
            </th>
            <th>
              <Button onClick={() => openNotificationHandler(notification)}>OPEN</Button>
              <Button onClick={() => dismissNotificationHandler(notification)}>DISMISS</Button>
            </th>
          </tr>
        ))}
      </tbody>
    </TableUI>
  );
};

export default Table;
