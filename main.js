/**
 * Express server.
 */
"use strict";

const port = 1500;
const path = require("path");
const express = require("express");
const app = express();
const routeStudyBuddy = require("./route/studybuddy.js");
const middleware = require("./middleware/middleware.js");



app.set("view engine", "ejs");
app.use(middleware.logIncomingToConsole);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.use("/studybuddy", routeStudyBuddy);
app.listen(port, logStartUpDetailsToConsole);

function logStartUpDetailsToConsole() {
    let routes = [];

    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            routes.push(middleware.route);
        } else if (middleware.name === "router") {
            middleware.handle.stack.forEach((handler) => {
                let route;

                route = handler.route;
                route && routes.push(route);
            });
        }
    });

    console.info(`Server is listening on port ${port}.`);
}
