import React, { useEffect } from "react";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import Page from "./components/page/Page";
import Explorer from "./pages/explorer/Explorer";
import { APP_CONFIG } from "./data/app-config";
import { fetchNotifications } from "./store/notifications-slice";
import { useAppDispatch } from "./hooks/use-app-dispatch";
import { useAppSelector } from "./hooks/use-app-selector";
import { filtersActions } from "./store/filters-slice";

import "./App.scss";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const [searchParams, setSearchParams] = useSearchParams();

  // Opening the websocket connexion
  const { lastMessage } = useWebSocket(APP_CONFIG.WEBSOCKET_URL, {
    shouldReconnect: (closeEvent) => true,
  });

  // fetch notifications on load and on WS message
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [lastMessage]);

  // adding filters to the route whenever a filter changes
  useEffect(() => {
    let searchParams = {} as any;
    Object.keys(filters).map((filterKey) => {
      type filtersKey = keyof typeof filters;
      if (filters[filterKey as filtersKey] !== "") {
        const paramValue = typeof filters[filterKey as filtersKey] !== "string" 
          ? JSON.stringify(filters[filterKey as filtersKey])
          : filters[filterKey as filtersKey]
        searchParams[filterKey] = paramValue;
      }
    });
    setSearchParams(searchParams);
  }, [filters]);

  // setting default filters to store from search params
  useEffect(() => {
    searchParams.forEach((value, key) => {
      switch (key) {
        case "selectedCategory":
          dispatch(filtersActions.setSelectedCategory(+value));
          break;
        case "selectedStatus":
          dispatch(filtersActions.setSelectedStatus(+value));
          break;
        case "selectedApplication":
          console.log(value);
          dispatch(filtersActions.setSelectedApplication(value));
          break;
        // case "showDelegations":
        //   dispatch(filtersActions.toggleShowDelegations(value === "true"));
        //   break;
        case "searchFilter":
          dispatch(filtersActions.setSearchFilter(value));
          break;
        case "sortFilter":
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
