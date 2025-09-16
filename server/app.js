const express = require('express')
const cors = require('cors')
const db = require("./db.js");

const app = express()
const port = 3001

app.use(cors());

const conn = db.init();
db.connect(conn);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM users";
  conn.query(sql, (err, rows) => {
    if (err) {
      console.error("쿼리 에러:", err);
      res.status(500).json({ error: "DB 조회 실패" });
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


