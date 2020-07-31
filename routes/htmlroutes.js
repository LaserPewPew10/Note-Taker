const path = require("path");
// Display notes.html
module.exports = function (app) {
  app.get("*", function (req, res) {
    res.sendfile(path.join(__dirname, "../public/index.html"));
  });

  // display notes.html
  app.get("/notes", function (req, res) {
    res.sendfile(path.join(__dirname, "../public/notes.html"));
  });
};
