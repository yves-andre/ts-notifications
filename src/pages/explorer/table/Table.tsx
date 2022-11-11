import React from "react";
import {
  Button,
  Picture,
  Icon,
  Text,
  Status,
  Table as TableUI,
  Tooltip,
} from "@trading/energies-ui";
import Notification from "../../../data/interfaces/notification";
import { formatDate } from "../../../utils/formatters";
import Highlight from "../../../components/Highlight/Highlight";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { filtersActions } from "../../../store/filters-slice";
import {
  dismissNotification,
  setNotificationIsRead,
} from "../../../store/notifications-slice";

import "./Table.scss";
import { CATEGORY } from "../../../data/constants/category";
import { STATUS } from "../../../data/constants/status";
import { APP_CONFIG } from "../../../data/app-config";

interface Props {
  notifications: Notification[];
}

export const Table: React.FC<Props> = ({ notifications }) => {
  const search = useAppSelector((state) => state.filters.searchFilter);
  const sortFilter = useAppSelector((state) => state.filters.sortFilter);
  const dispatch = useAppDispatch();
  const selectedStatus = useAppSelector(
    (state) => state.filters.selectedStatus
  );
  const applications = useAppSelector(
    (state) => state.applications.applications
  );

  const sortColumnHandler = (fieldName: string) => {
    // 1st click on column = order ascending,
    // 2nd click = order descending,
    // 3rd click = remove order
    if (sortFilter.field === fieldName) {
      sortFilter.asc
        ? dispatch(filtersActions.setSortFilter({ ...sortFilter, asc: false }))
        : dispatch(filtersActions.setSortFilter({ field: "", asc: true }));
    } else {
      dispatch(filtersActions.setSortFilter({ field: fieldName, asc: true }));
    }
  };

  const openNotificationHandler = (notification: Notification) => {
    window.open(notification.sourceUrl, "_blank", "noopener,noreferrer");
    !notification.isRead && dispatch(setNotificationIsRead(notification._id));
  };

  const dismissNotificationHandler = (notification: Notification) => {
    dispatch(dismissNotification(notification._id));
  };

  const SortIcon: React.FC<{ field: string }> = ({ field }) => {
    if (sortFilter.field === field) {
      return sortFilter.asc ? (
        <Icon
          name="caretRoundedDown"
          size="small"
          style={{ minWidth: 0, minHeight: 0, width: 15, height: 0 }}
        />
      ) : (
        <Icon
          name="caretRoundedUp"
          size="small"
          style={{ minWidth: 0, minHeight: 0, width: 15, height: 0 }}
        />
      );
    } else {
      return <></>;
    }
  };

  const TD: React.FC<{
    field: string;
    children: string;
    align?: "center" | "right" | "justify" | "char" | undefined;
  }> = ({ field, children, align }) => {
    return (
      <td
        onClick={() => sortColumnHandler(field)}
        style={{ cursor: "pointer" }}
        align={align}
      >
        <Text variant="current">{children}</Text>&nbsp;
        <SortIcon field={field} />
      </td>
    );
  };

  const getColorApplication = (title: string) => {
    const applicationColor = applications.find((application) =>
      application.match
        .trim()
        .toLowerCase()
        .split(",")
        .map(a => a.trim())
        .includes(title.trim().toLowerCase())
    )?.txtColor;
    return applicationColor || APP_CONFIG.DEFAULT_APPLICATION_COLOR;
  };

  const renderActionButtons = (notification: Notification) => {
    switch (notification.category) {
      case CATEGORY.ACTION_FEED:
        if (notification.isManual) {
          return (
            <Tooltip title="mark as treated" placement="left">
              <Button
                size="small"
                icon="close30-small"
                iconOnly
                color="#161719"
                style={{ borderRadius: "50%" }}
                onClick={() => dismissNotificationHandler(notification)}
              />
            </Tooltip>
          );
        } else {
          return (
            <Tooltip title="open to treat" placement="left">
              <Button
                size="small"
                icon="openAll"
                iconOnly
                color="#161719"
                style={{ borderRadius: "50%" }}
                onClick={() => openNotificationHandler(notification)}
              />
            </Tooltip>
          );
        }
      case CATEGORY.INFORMATION_FEED:
        return (
          <Tooltip title="mark as treated" placement="left">
            <Button
              size="small"
              icon="close30-small"
              iconOnly
              color="#161719"
              style={{ borderRadius: "50%" }}
              onClick={() => dismissNotificationHandler(notification)}
            />
          </Tooltip>
        );
    }
  };

  return (
    <TableUI variant="feed">
      <thead>
        <tr>
          <TD field="title">Source</TD>
          <TD field="subtitle">Subject</TD>
          <TD field="description">Description</TD>
          <TD field="details">Sent to</TD>
          <TD field="date" align="right">
            Date
          </TD>
          {selectedStatus !== STATUS.TREATED && (
            <td align="right" width="100"></td>
          )}
        </tr>
      </thead>
      <tbody>
        {notifications.map((notification) => (
          <tr
            key={notification._id}
            onClick={() => openNotificationHandler(notification)}
          >
            <th>
              {!notification.isRead && (
                <Status
                  variant="badge"
                  color={getColorApplication(notification.title)}
                  style={{ marginLeft: -10, marginRight: 5 }}
                ></Status>
              )}
              {notification.image && (
                <Picture
                  person
                  round
                  color={getColorApplication(notification.title)}
                  size="small"
                  icon={notification.image}
                  style={{ marginRight: 10 }}
                />
              )}
              <Highlight highlight={search}>{`${notification.title} - ${notification._id}`}</Highlight>
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
              <Text color="silver" italic light>
                <Highlight highlight={search}>{notification.details}</Highlight>
              </Text>
            </th>
            <th align="right">
              <Text color="silver" light>
                <Highlight highlight={search}>
                  {formatDate(notification.date)}
                </Highlight>
              </Text>
            </th>
            {selectedStatus !== STATUS.TREATED && (
              <th
                align="right"
                style={{ paddingRight: 5 }}
                onClick={(e) => e.stopPropagation()}
              >
                {renderActionButtons(notification)}
              </th>
            )}
          </tr>
        ))}
      </tbody>
    </TableUI>
  );
};

export default Table;
