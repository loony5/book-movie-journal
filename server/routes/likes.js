const express = require('express');
const router = express.Router();

module.exports = (conn) => {
  // 좋아요 토글
  router.post('/toggle/:review_id', async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ error: '로그인 필요' });
      }

      const user_id = req.session.user.userid;
      const review_id = req.params.review_id;

      if (!review_id) {
        return res.status(400).json({ error: 'review_id 없음' });
      }

      // 좋아요 여부 체크
      const [rows] = await conn
        .promise()
        .query('SELECT * FROM likes WHERE user_id = ? AND review_id = ?', [
          user_id,
          review_id,
        ]);

      if (rows.length > 0) {
        // 좋아요 취소
        await conn
          .promise()
          .query('DELETE FROM likes WHERE user_id = ? AND review_id = ?', [
            user_id,
            review_id,
          ]);
        return res.json({ liked: false });
      } else {
        // 좋아요 추가
        await conn
          .promise()
          .query('INSERT INTO likes (user_id, review_id) VALUES (?, ?)', [
            user_id,
            review_id,
          ]);
        return res.json({ liked: true });
      }
    } catch (err) {
      console.error('좋아요 오류:', err);
      res.status(500).json({ error: '좋아요 처리 실패' });
    }
  });

  // 좋아요 개수
  router.get('/count/:review_id', async (req, res) => {
    try {
      const review_id = req.params.review_id;

      const [rows] = await conn
        .promise()
        .query('SELECT COUNT(*) AS count FROM likes WHERE review_id = ?', [
          review_id,
        ]);

      res.json({ count: rows[0].count });
    } catch (err) {
      console.error('좋아요 수 오류:', err);
      res.status(500).json({ error: '좋아요 수 조회 실패' });
    }
  });

  // 내가 좋아요한 목록
  router.get('/my', async (req, res) => {
    try {
      if (!req.session.user || !req.session.user.user_id) {
        return res.json([]);
      }

      const user_id = req.session.user.user_id;

      const [rows] = await conn
        .promise()
        .query('SELECT review_id FROM likes WHERE user_id = ?', [user_id]);

      res.json(rows);
    } catch (err) {
      console.error('좋아요 목록 오류:', err);
      res.status(500).json({ error: '좋아요 목록 조회 실패' });
    }
  });

  return router;
};
