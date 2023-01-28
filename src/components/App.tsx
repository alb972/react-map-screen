import * as React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./containers/Home";
import { NotFoundPage } from "./containers/NotFoundPage";

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
