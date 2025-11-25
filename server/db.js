const mysql = require('mysql2');

const db = {
  init: function () {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'book_movie_journal',
    });
  },
  connect: function (conn) {
    conn.connect(function (err) {
      if (err) console.error('mysql connection error : ' + err);
      else console.log('mysql is connected successfully!');
    });
  },
};

module.exports = db;
