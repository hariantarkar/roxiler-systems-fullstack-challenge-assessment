let conn = require("../../db.js");

exports.countRatings = async () => {
  try {
    const [rows] = await conn.query("select count(*) as totalRatings from ratings");
    return rows[0].totalRatings;
  } catch (err) {
    throw err;
  }
};
exports.upsertRating = async (uid, sid, rating) => {
  try {
    const [result] = await conn.query(
      "insert into ratings (uid, sid, rating) values (?, ?, ?) on duplicate key update rating = ?",
      [uid, sid, rating, rating]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getRatersForStore = async (sid) => {
  try {
    const [rows] = await conn.query(
      `select u.uid, u.name, u.email, r.rating
       from ratings r
       join users u on r.uid = u.uid
       where r.sid = ?`,
      [sid]
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

exports.getAverageRatingForStore = async (sid) => {
  try {
    const [rows] = await conn.query(
      "select ROUND(AVG(rating), 1) as averageRating from ratings where sid = ?",
      [sid]
    );
    return rows[0].averageRating;
  } catch (err) {
    throw err;
  }
};
