import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme } from "@material-ui/core/styles";

// creating the theme for the app
const theme = createMuiTheme({
    // setting our primary and secondary colors
    palette: {
        primary: {
            // This is Pokemon blue.
            main: "#125e9c[700]"
        },
        secondary: {
            // This is Pokemon red.
            main: "#f93d32[700]"
        },
    }
});

// uses the theme in the DOM - where App.js resides
ReactDOM.render(
    <React.StrictMode theme={theme}>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
