import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Trending from "./Trending";

function IndexRoute() {
  return (
    <Router>
      <App>
        <Routes>
            <Route path="/" element={<Trending/>} />
        </Routes>
      </App>
    </Router>
  );
}
export default IndexRoute;
