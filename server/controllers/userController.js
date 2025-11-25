const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const axios = require('axios');

module.exports = (conn) => {
  const model = userModel(conn);

  return {
    join: (req, res) => {
      const { userId, password, name, phone, image } = req.body;
      if (!userId || !password || !name || !phone)
        return res.status(400).json({ error: '값 누락' });

      // 비밀번호 해싱
      const hashedPassword = bcrypt.hashSync(password, 10);

      // DB 저장
      model.createUser(
        userId,
        hashedPassword,
        name,
        phone,
        image,
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: '회원가입 실패' });
          }
          res.json({ message: '회원가입 성공' });
        }
      );
    },

    login: (req, res) => {
      const { userId, password } = req.body;
      if (!userId || !password)
        return res.status(400).json({ error: '값 누락' });

      model.findUserInfo(userId, (err, rows) => {
        if (err) return res.status(500).json({ error: 'DB 조회 실패' });
        if (rows.length === 0)
          return res.status(400).json({ error: '사용자 없음' });

        const user = rows[0];
        if (!bcrypt.compareSync(password, user.password))
          return res.status(400).json({ error: '비밀번호 틀림' });

        // 세션에 사용자 정보 저장
        req.session.user = {
          userid: user.user_id,
          name: user.name,
          phone: user.phone,
          profile_image: user.profile_image,
        };

        res.json({ message: '로그인 성공', user: req.session.user });
      });
    },

    naverLogin: (req, res) => {
      const state = 'RANDOM_STATE';
      const redirectUrl =
        `https://nid.naver.com/oauth2.0/authorize?response_type=code` +
        `&client_id=${process.env.NAVER_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(process.env.NAVER_CALLBACK_URL)}` +
        `&state=${state}`;

      res.redirect(redirectUrl);
    },

    naverCallback: async (req, res) => {
      const { code, state } = req.query;

      try {
        const tokenRes = await axios.get(
          `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}&state=${state}`
        );

        const accessToken = tokenRes.data.access_token;

        const profileRes = await axios.get(
          'https://openapi.naver.com/v1/nid/me',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const profile = profileRes.data.response;

        const naverId = `naver_${profile.id}`;
        const name = profile.name;
        const profileImage = profile.profile_image;

        model.findUserInfo(naverId, async (err, rows) => {
          if (err) return res.status(500).json({ error: 'DB 조회 실패' });

          if (rows.length > 0) {
            const user = rows[0];

            req.session.user = {
              userid: user.user_id,
              name: user.name,
              phone: user.phone,
              profile_image: user.profile_image,
            };

            return res.redirect('http://localhost:3000');
          }

          const sql =
            'INSERT INTO users (user_id, name, profile_image) VALUES (?, ?, ?)';

          conn.query(sql, [naverId, name, profileImage], (err, result) => {
            if (err) {
              console.error('소셜 회원 생성 실패:', err);
              return res.status(500).json({ error: '회원 생성 실패' });
            }

            console.log('### result: ', result);

            req.session.user = {
              userid: result.insertId,
              name,
              phone: null,
              profile_image: profileImage,
            };

            return res.redirect('http://localhost:3000');
          });
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: '네이버 로그인 실패' });
      }
    },
  };
};
