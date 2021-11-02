const express = require("express");
const formidable = require("formidable");
const path = require("path");
const router = express.Router();

const {hasPermission} = require("./util/auth");
const {uploadDemo, deleteDemo} = require("./util/uploadHandler");

// route map
// const PAGE_ROUTES = {
//
//     login: (req, res) => { res.render("login"); },
//     hub: (req, res) => { res.render("index"); },
//     upload: (req, res) => { res.render("upload"); },
//     stats: (req, res) => { res.render("stats"); },
//     manage: (req, res) => { res.render("manage"); },
//     notFound: (req, res) => { res.render("404"); }
// }
const PAGE_ROUTES = [
    {routeName: ["", "home", "hub"], handler: (req, res) => { res.render("index"); }},
    {routeName: "upload", handler: (req, res) => { res.render("upload"); }},
    {routeName: "stats", handler: (req, res) => { res.render("stats"); }},
    {routeName: "manage", handler: (req, res) => { res.render("manage"); }},
    {routeName: "disallowed-route", handler: (req, res) => { res.send("This route cannot be accessed directly!"); }},
];
const API_ROUTES = [
    {
        noun: "demo",
        verbs: [
            {name: "get", handler: (req, res, next) => { res.send("here's the demo..."); }},
            {name: "delete", handler: (req, res, next) => { deleteDemo(req, res, next); }},
            {name: "upload", handler: (req, res, next) => { uploadDemo(req, res, next); }},
        ],
        handler: (req, res) => { res.redirect("/disallowed-route"); }
    }
];

// set up API routes
for (let route in API_ROUTES) {
    // only continue if route.noun isn't an array and if route.verbs actually contains stuff
    if (!Array.isArray(route.noun) && route.verbs.length !== 0) {
        for (let verb of route.verbs) {
            router.route(`/api/${route.noun}/${verb.name}`, hasPermission)
                .post((req, res, next) => { verb.handler(req, res, next); });
        }
    }
}

// set up page routes
for (let route in PAGE_ROUTES) {

}


// CATCH ALL ROUTE - matches everything else
// 404 page
router.get("*", (req, res) => {
    res.render("404");
});

module.exports = router;