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
import { useAppSelector } from "../../../hooks/use-app-selector";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { filtersActions } from "../../../store/filters-slice";
import {
  dismissNotificationById,
  dismissNotifications,
  setNotificationIsReadById,
} from "../../../store/notifications-slice";
import { useRef } from "react";
import { CATEGORY } from "../../../data/constants/category";
import { STATUS } from "../../../data/constants/status";
import { APP_CONFIG } from "../../../data/app-config";
import CategoryColor from "../../../data/interfaces/category-color";

import "./Table.scss";
import classNames from "classnames";

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
  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  );
  const applications = useAppSelector(
    (state) => state.applications.applications
  );
  const categoryColors: CategoryColor[] = useAppSelector(
    (state) => state.applications.categoryColors
  );

  const ref = useRef(null);

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
    !notification.isRead &&
      dispatch(setNotificationIsReadById(notification._id));
  };

  const dismissNotificationHandler = (notification: Notification) => {
    dispatch(dismissNotificationById(notification._id));
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

  const getColorApplication = (sourceName: string) => {
    const applicationColor = applications.find(
      (application) =>
        application.match
          .trim()
          .toLowerCase()
          .split(',')
          .map((a) => a.trim())
          .includes(sourceName.trim().toLowerCase())
    )?.txtColor;
    return applicationColor || APP_CONFIG.DEFAULT_APPLICATION_COLOR;
  };

  const getColorIsReadStatus = (sourceName: string) => {
    const applicationColor = getColorApplication(sourceName);
    if (applicationColor === APP_CONFIG.DEFAULT_APPLICATION_COLOR) {
      const filterValue =
        selectedCategory === CATEGORY.ACTION_FEED ? "workflow" : "socialflow";
      return categoryColors.find((c) => c.title === filterValue)?.color;
    }
    return applicationColor;
  };

  const renderActionButtons = (notification: Notification) => {
    switch (notification.category) {
      case CATEGORY.ACTION_FEED:
        if (notification.isManual) {
          return (
            <Tooltip title="Mark as Treated" placement="left">
              <Button
                size="small"
                icon="tick"
                iconOnly
                color="#161719"
                style={{ borderRadius: "50%" }}
                onClick={() => dismissNotificationHandler(notification)}
              />
            </Tooltip>
          );
        } else {
          return (
            <Tooltip title="Open to Treat" placement="left">
              <Button
                size="small"
                icon="preview"
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
          <Tooltip title="Dismiss" placement="left">
            <Button
              size="small"
              icon="close"
              iconOnly
              color="#161719"
              style={{ borderRadius: "50%" }}
              onClick={() => dismissNotificationHandler(notification)}
            />
          </Tooltip>
        );
    }
  };

  const dismissAllHandler = () => {
    const notificationsToDismiss = notifications.filter(
      (notification) =>
        notification.category === CATEGORY.INFORMATION_FEED &&
        notification.status === STATUS.TO_BE_TREATED
    );
    dispatch(dismissNotifications(notificationsToDismiss));
  };

  const getHighlightedText = (text: string | undefined, highlight: string) => {
    if (!text) {
      return <span>{text}</span>;
    }
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            className={classNames({
              Highlight: part.toLowerCase() === highlight.toLowerCase(),
            })}
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
  };

  return (
    <TableUI variant="feed" className="NotificationTable">
      <thead>
        <tr>
          <TD field="title">Source</TD>
          <TD field="subtitle">Subject</TD>
          <TD field="description">Description</TD>
          <TD field="details">Details</TD>
          <TD field="date" align="right">
            Date
          </TD>
          {selectedStatus !== STATUS.TREATED &&
            selectedCategory === CATEGORY.ACTION_FEED && (
              <td align="right" width="100">
                Actions
              </td>
            )}
          {selectedStatus !== STATUS.TREATED &&
            selectedCategory === CATEGORY.INFORMATION_FEED && (
              <td align="right" width="100">
                <Button
                  size="small"
                  style={{ borderRadius: "10px" }}
                  onClick={dismissAllHandler}
                  color={APP_CONFIG.DEFAULT_APPLICATION_COLOR}
                >
                  Dismiss all
                </Button>
              </td>
            )}
        </tr>
      </thead>
      <tbody>
        {notifications.map((notification, index) => (
          <tr key={index} onClick={() => openNotificationHandler(notification)}>
            <th style={{ whiteSpace: "nowrap" }}>
              {!notification.isRead && (
                <Status
                  variant="badge"
                  color={getColorIsReadStatus(notification.sourceName)}
                  style={{ marginLeft: -2, marginRight: 6 }}
                ></Status>
              )}
              {notification.image && (
                <Picture
                  person
                  round
                  color={getColorApplication(notification.sourceName)}
                  size="small"
                  icon={notification.image}
                  style={{
                    marginRight: 10,
                    marginLeft: notification.isRead ? 10 : 0,
                  }}
                />
              )}
              <Text
                color="rgba(255,255,255,.5)"
                size="small"
                uppercase
                light
                style={{ letterSpacing: "0.065em" }}
              >
                <>
                  {search && (
                    <span>
                      {getHighlightedText(notification.title, search)}
                    </span>
                  )}
                  {!search && <span>{notification.title}</span>}
                </>
              </Text>
            </th>

            <th>
              {search && (
                <span>{getHighlightedText(notification.subtitle, search)}</span>
              )}
              {!search && <span>{notification.subtitle}</span>}
            </th>

            <th>
              <Text light color="white">
                <>
                  {search && (
                    <span>
                      {getHighlightedText(notification.description, search)}
                    </span>
                  )}
                  {!search && <span>{notification.description}</span>}
                </>
              </Text>
            </th>

            <th>
              <Text color="rgba(255,255,255,.4)" italic light size="small">
                <>
                  {search && (
                    <span>
                      {getHighlightedText(notification.details, search)}
                    </span>
                  )}
                  {!search && <span>{notification.details}</span>}
                </>
              </Text>
            </th>

            <th align="right">
              <Text color="rgba(255,255,255,.4)" italic light size="small">
                <>
                  {search && (
                    <span>
                      {getHighlightedText(
                        formatDate(notification.date),
                        search
                      )}
                    </span>
                  )}
                  {!search && <span>{formatDate(notification.date)}</span>}
                </>
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
