module.exports = (conn) => ({
  createUser: (userId, password, name, phone, image, callback) => {
    console.log('@@@');
    const sql =
      'INSERT INTO users (user_id, password, name, phone, profile_image) VALUES (?, ?, ?, ?, ?)';
    conn.query(sql, [userId, password, name, phone, image], callback);
  },

  findUserInfo: (userId, callback) => {
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    conn.query(sql, userId, callback);
  },
});
