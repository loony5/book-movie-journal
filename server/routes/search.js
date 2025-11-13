const express = require('express');
const axios = require('axios');
const router = express.Router();

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

// /api/search?query=검색어&type=book or movie
router.get('/', async (req, res) => {
  const { query, type } = req.query;

  if (!query)
    return res.status(400).json({ error: '검색어(query)는 필수입니다.' });

  // 검색 타입 설정
  const endpoint =
    type === 'movie'
      ? 'https://openapi.naver.com/v1/search/movie.json'
      : 'https://openapi.naver.com/v1/search/book.json';

  try {
    const response = await axios.get(endpoint, {
      params: { query },
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error('네이버 검색 API 오류:', err.response?.data || err.message);
    res.status(500).json({ error: '네이버 검색 실패' });
  }
});

module.exports = router;
