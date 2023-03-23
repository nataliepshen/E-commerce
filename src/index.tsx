import React from "react";

import ReactDOM from "react-dom/client";
import "./styles/styles.scss";
import { HashRouter } from "react-router-dom";

import App from "./App";

import "./config/configureMobX";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

if (module.hot) {
  module.hot.accept();
}
