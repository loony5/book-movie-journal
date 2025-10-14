const express = require('express');
const cors = require('cors');
const db = require('./db.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // form 데이터 받을 때

const conn = db.init();
db.connect(conn);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes(conn));

// app.get('/api/users', (req, res) => {
//   const sql = 'SELECT * FROM users';
//   conn.query(sql, (err, rows) => {
//     if (err) {
//       console.error('쿼리 에러:', err);
//       res.status(500).json({ error: 'DB 조회 실패' });
//     } else {
//       res.json(rows);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
