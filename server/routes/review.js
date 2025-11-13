const express = require('express');
const router = express.Router();

module.exports = (conn) => {
  // 리뷰 저장
  router.post('/', async (req, res) => {
    const { title, image, review } = req.body;
    const user = req.session.user;

    // 로그인 체크
    if (!user) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    if (!title || !review)
      return res.status(400).json({ message: '필수 데이터 누락' });

    try {
      const sql = `
        INSERT INTO reviews (user_id, user_name, title, image, review)
        VALUES (?, ?, ?, ?, ?)
      `;
      await conn.query(sql, [user.id, user.name, title, image, review]);
      res.json({ message: '리뷰 저장 완료' });
    } catch (err) {
      console.error('리뷰 저장 오류:', err);
      res.status(500).json({ message: '서버 오류' });
    }
  });

  // 리뷰 목록 가져오기 (옵션)
  router.get('/', async (req, res) => {
    try {
      const sql = 'SELECT * FROM reviews ORDER BY created_at DESC';
      const [rows] = await conn.query(sql);
      res.json(rows);
    } catch (err) {
      console.error('리뷰 목록 오류:', err);
      res.status(500).json({ message: '서버 오류' });
    }
  });

  return router;
};
