const fs = require("fs");
const path = require("path");

module.exports = function (app) {
  // ability to read the file while grabbing the database json file
  fs.readFile("db/db.json", "utf8", (err, data) => {
    // API ROUTES =========================

    // GET API =========================
    // setting up /api/notes get route
    app.get("api/notes", function (req, res) {});
  });
};
