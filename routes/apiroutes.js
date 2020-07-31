// DEPENDECIES ===================================
const fs = require("fs");
const path = require("path");

module.exports = function (app) {
  // API ROUTES =================================

  // GET API ====================================
  // setting up for /api/notes get route
  app.get("/api/notes", function (req, res) {
    // ability to read the file while grabbing the database json file
    fs.readFile("db/db.json", "utf8", function (err, data) {
      // if there is an error within reading the file, the file will be thrown out by using the throw syntax
      if (err) throw err;
      // calling the data parameter in the readFile
      let note = JSON.parse(data);
      res.json(note);
      console.log(note);
    });
    //POST API ====================================
    app.post("/api/notes", function (req, res) {
      fs.readFile("db/db.json", "utf8", function (err, database) {
        // if there is an error within reading the file, the file will be thrown out by using the throw syntax
        if (err) throw err;
        database = JSON.parse(database);
        var newNote = req.body;
        // Proposition: We want each new id to be one greater than the last elements id
        // newNote.id = database.length + 1;
        const lastElementId = database[database.length - 1].id;
        newNote.id = lastElementId + 1;
        database.push(newNote);
        database = JSON.stringify(database);
        fs.writeFile("db/db.json", database, function (err) {
          if (err) throw err;
          res.sendStatus(200);
        });
      });
    });
    // setting up for /api/notes post route
    // DELETE API ==================================
    // setting up for /api/notes/:id
  });
};
