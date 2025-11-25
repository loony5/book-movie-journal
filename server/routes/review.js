const express = require('express');
const router = express.Router();

module.exports = (conn) => {
  // 리뷰 저장
  router.post('/', async (req, res) => {
    const { title, image, review } = req.body;
    const user = req.session.user;

    console.log('###', user);

    // 로그인 체크
    if (!user) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    if (!title || !review)
      return res.status(400).json({ message: '필수 데이터 누락' });

    try {
      const sql = `
          INSERT INTO reviews (user_id, user_name, title, image, review, profile_image)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

      const [rows] = await conn
        .promise()
        .query(sql, [
          user.userid,
          user.name,
          title,
          image,
          review,
          user.profile_image,
        ]);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 오류' });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const [rows] = await conn
        .promise()
        .query('SELECT * FROM reviews ORDER BY created_at DESC');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  });

  return router;
};
