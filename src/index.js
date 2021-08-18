import "bootstrap/dist/css/bootstrap.min.css";
import "assets/css/custom.css";

import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "easy-peasy";

import store from "store";
import App from "components/App";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>,
  rootElement,
);
