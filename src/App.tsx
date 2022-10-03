import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Page from "./components/page/Page";
import "./App.scss";
import Explorer from "./pages/explorer/Explorer";

export const App: React.FC = () => {
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
