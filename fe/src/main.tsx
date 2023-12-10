import App from "App.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
// Material Dashboard 2 PRO React TS Context Provider
import { MaterialUIControllerProvider } from "context";

import "./locale/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
