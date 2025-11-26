const express = require('express');
const router = express.Router();

module.exports = (conn) => {
  router.get('/my', async (req, res) => {
    const user = req.session.user;
    if (!user) return res.json([]); // 프론트에서 map 에러 방지

    try {
      const [rows] = await conn
        .promise()
        .query(`SELECT review_id FROM bookmarks WHERE user_id = ?`, [
          user.userid,
        ]);

      res.json(rows);
    } catch (err) {
      console.error('GET /bookmarks/my 오류:', err);
      res.json([]); // 에러 발생해도 배열 반환
    }
  });

  router.post('/toggle/:reviewId', async (req, res) => {
    const user = req.session.user;
    if (!user) return res.status(401).json({ error: '로그인이 필요합니다.' });

    const reviewId = req.params.reviewId;

    try {
      const [exists] = await conn
        .promise()
        .query(`SELECT * FROM bookmarks WHERE user_id = ? AND review_id = ?`, [
          user.userid,
          reviewId,
        ]);

      if (exists.length > 0) {
        await conn
          .promise()
          .query(`DELETE FROM bookmarks WHERE user_id = ? AND review_id = ?`, [
            user.userid,
            reviewId,
          ]);
        return res.json({ bookmarked: false });
      }

      await conn
        .promise()
        .query(`INSERT INTO bookmarks (user_id, review_id) VALUES (?, ?)`, [
          user.userid,
          reviewId,
        ]);

      res.json({ bookmarked: true });
    } catch (err) {
      console.error('POST /bookmarks/toggle 오류:', err);
      res.status(500).json({ error: '북마크 처리 실패' });
    }
  });

  router.get('/count/:reviewId', async (req, res) => {
    try {
      const [rows] = await conn
        .promise()
        .query(`SELECT COUNT(*) AS count FROM bookmarks WHERE review_id = ?`, [
          req.params.reviewId,
        ]);
      res.json(rows[0]);
    } catch (err) {
      console.error('GET /bookmarks/count 오류:', err);
      res.json({ count: 0 });
    }
  });

  return router;
};
