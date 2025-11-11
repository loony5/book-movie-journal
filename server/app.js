const express = require('express');
const cors = require('cors');
const session = require('express-session');
const db = require('./db.js');

const app = express();
const port = 3001;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, // 쿠키 허용
  })
);

app.use(
  session({
    secret: 'secret-key', // 암호화용 키
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // JS에서 쿠키 접근 불가 (보안)
      maxAge: 1000 * 60 * 60, // 1시간 유지
    },
  })
);

app.use(express.urlencoded({ extended: true })); // form 데이터 받을 때

const conn = db.init();
db.connect(conn);

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes(conn));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
