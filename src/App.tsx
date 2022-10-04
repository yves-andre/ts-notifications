import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import Page from "./components/page/Page";
import Explorer from "./pages/explorer/Explorer";
import { APP_CONFIG } from "./data/app-config";

import "./App.scss";
import { fetchNotifications } from "./store/notifications-slice";
import { useAppDispatch } from "./hooks/use-app-dispatch";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // Opening the websocket connexion
  const { lastMessage } = useWebSocket(APP_CONFIG.WEBSOCKET_URL, {
    shouldReconnect: (closeEvent) => true,
  });

  // fetch notifications on load and on WS message
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [lastMessage]);

  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<Navigate to="/explorer" />} />
        <Route path="explorer" element={<Explorer />} />
        <Route path="explorer/:filter" element={<Explorer />} />
        {/* TODO : ADD all filter argulments to route */}
      </Route>
    </Routes>
  );
};

export default App;
