const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

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
          id: user.userId,
          name: user.name,
          phone: user.phone,
          image: user.image,
        };

        res.json({ message: '로그인 성공', user: req.session.user });
      });
    },
  };
};
