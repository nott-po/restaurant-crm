import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import {Provider} from "react-redux";
import { store } from './app/store';
import { restoreFromStorage } from './features/auth/authSlice';

// restore auth state from localStorage on app initialization
store.dispatch(restoreFromStorage());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);