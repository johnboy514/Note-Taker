const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');

module.exports = (app) => {


 // Routes for API's
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
      });

      app.post('/api/notes', (req, res) => {
        let database = fs.readFileSync('db/db.json');
        database = JSON.parse(database);
        res.json(database);
        let newNote = {
          title: req.body.title,
          text: req.body.text,
          id: uniqid(),
        };
        database.push(newNote);
        fs.writeFileSync('db/db.json', JSON.stringify(database));
      });

      app.delete('/api/notes/:id', (req, res) => {
        let database = JSON.parse(fs.readFileSync('db/db.json'))
        let deleteNote = database.filter(item => item.id !== req.params.id);
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
        res.json(deleteNote);

  })

 // Routes for HTML
    app.get('/notes', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}