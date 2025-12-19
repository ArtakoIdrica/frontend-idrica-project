import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import i18next from './i18n/i18n'

i18next.t($ => $.my.key)
import { Provider } from "react-redux";
import { store } from "./store/store";


ReactDom.createRoot(document.getElementById("root")!).render(

    <React.StrictMode>
        <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </Provider>
    </React.StrictMode>
)