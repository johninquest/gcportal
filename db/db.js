const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('appdata.db');

let db = new sqlite3.Database('appdata.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to SQLite3 database successfully.');
  });

 /*  db.serialize(() => {
    db.each(`SELECT PlaylistId as id,
                    Name as name
             FROM playlists`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    });
  }); */
  
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connection to SQLite3 database was closed successfully');
  });


// https://www.sqlitetutorial.net/sqlite-nodejs/connect/ 
