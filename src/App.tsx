import React, { useCallback, useEffect } from "react";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import Page from "./components/page/Page";
import Explorer from "./pages/explorer/Explorer";
import { APP_CONFIG } from "./data/app-config";
import { fetchNotifications } from "./store/notifications-slice";
import { useAppDispatch } from "./hooks/use-app-dispatch";
import { useAppSelector } from "./hooks/use-app-selector";
import { filtersActions } from "./store/filters-slice";
import { FILTER } from "./data/constants/filter";
import { getUserLogin } from "./services/auth-service";

import "./App.scss";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const [searchParams, setSearchParams] = useSearchParams();

  const getSocketUrl = useCallback(() => {
    return new Promise((resolve) => {
      const login = getUserLogin().then((response) => {
        resolve(APP_CONFIG.WEBSOCKET_URL.replace("{LOGIN}", response));
      });
    });
  }, []) as () => Promise<string>;

  // Opening the websocket connexion 
  // using an async socket url string resolution function
  const { lastMessage } = useWebSocket(getSocketUrl, {
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
        const paramValue =
          typeof filters[filterKey as filtersKey] !== "string"
            ? JSON.stringify(filters[filterKey as filtersKey])
            : filters[filterKey as filtersKey];
        searchParams[filterKey] = paramValue;
      }
    });
    setSearchParams(searchParams);
  }, [filters]);

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
          dispatch(filtersActions.toggleShowDelegations(value === "true"));
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
