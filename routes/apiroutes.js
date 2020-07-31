// DEPENDECIES ===================================
const fs = require("fs");
const path = require("path");
const { json } = require("express");

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
        // If there are no notes, you end up breaking because you can't make a new note id.
        if (database.length === 0) {
          newNote.id = 1;
        } else {
          const lastElementId = database[database.length - 1].id;
          newNote.id = lastElementId + 1;
        }
        database.push(newNote);
        database = JSON.stringify(database);
        fs.writeFile("db/db.json", database, function (err) {
          if (err) throw err;
          res.sendStatus(200);
        });
      });
    });
    // DELETE API ==================================
    // setting up for /api/notes/:id
    app.delete("/api/notes/:id", function (req, res) {
      const id = parseInt(req.params.id);

      fs.readFile("db/db.json", "utf8", function (err, database) {
        // if there is an error based off of reading the file, the file will be thrown out by using the thrown syntax
        if (err) throw err;

        database = JSON.parse(database);

        // filter keeps evertyhing for which the function in filter returns true.
        var newDataBase = database.filter((note) => {
          return note.id !== id;
        });

        newDataBase = JSON.stringify(newDataBase);

        fs.writeFile("db/db.json", newDataBase, function (err) {
          if (err) throw err;
          res.sendStatus(200);
        });
      });
    });
  });
};
