const express = require('express');
const cors = require('cors');
const session = require('express-session');
const db = require('./db.js'); // 기존 db 모듈 (init/connect 제공)
const MySQLStore = require('express-mysql-session')(session);

const app = express();
const port = 3001;

app.use(express.json());
const sessionStore = new MySQLStore({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'book_movie_journal',
});

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, // 쿠키 허용
  })
);

app.use(
  session({
    key: 'session_cookie_name',
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(express.urlencoded({ extended: true })); // form 데이터 받을 때

const conn = db.init();
db.connect(conn);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes(conn));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
