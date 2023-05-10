import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Page from "./components/page/Page";
import Explorer from "./pages/explorer/Explorer";
import { fetchNotifications, fetchNotificationCounts, setNotificationsIsSeen } from "./store/notifications-slice";
import { useAppDispatch } from "./hooks/use-app-dispatch";
import { filtersActions } from "./store/filters-slice";
import { FILTER } from "./data/constants/filter";
import { useAppWebSocket } from "./hooks/use-app-websocket";
import { useRouteFilters } from "./hooks/use-route-filters";

import "./App.scss";
import { CATEGORY } from "./data/constants/category";

export const App: React.FC = () => {
  const searchParams = useRouteFilters();
  const dispatch = useAppDispatch();
  const lastMessage = useAppWebSocket();

  // fetch notifications on load and on WS message
  // and set social notification to SEEN
  useEffect(() => {
      if (
          (lastMessage?.data as string)?.startsWith("40") || 
          (lastMessage?.data as string)?.includes("NotificationAdded") ||
          (lastMessage?.data as string)?.includes("NotificationUpdated") ||
          process.env.NODE_ENV === "development"){          
        dispatch(fetchNotifications());
        dispatch(fetchNotificationCounts());
        //dispatch(setNotificationsIsSeen(CATEGORY.INFORMATION_FEED));
      }
  }, [lastMessage]);

  // setting default filters to store from search params
  useEffect(() => {
    searchParams.forEach((value, key) => {
      switch (key) {
        case FILTER.SELECTED_CATEGORY:
          dispatch(filtersActions.setSelectedCategory(+value));
          break;
        case FILTER.SELECTED_STATUS:
          dispatch(filtersActions.setSelectedStatus(+value));
          break;
        case FILTER.SELECTED_APPLICATION:
          dispatch(filtersActions.setSelectedApplication(value));
          break;
        case FILTER.SHOW_DELEGATIONS:
          const showDelegations = value === "true";
          dispatch(filtersActions.toggleShowDelegations(showDelegations));
          break;
        case FILTER.SEARCH_FILTER:
          dispatch(filtersActions.setSearchFilter(value));
          break;
        case FILTER.SORT_FILTER:
          dispatch(filtersActions.setSortFilter(JSON.parse(value)));
          break;
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<Navigate to="/explorer" />} />
        <Route path="explorer" element={<Explorer />} />
        <Route path="explorer/:filter" element={<Explorer />} />
      </Route>
    </Routes>
  );
};

export default App;
