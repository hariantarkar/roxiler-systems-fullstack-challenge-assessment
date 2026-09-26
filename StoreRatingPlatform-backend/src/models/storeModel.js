let conn = require("../../db.js");

exports.saveStore = async (name, email, address, ownerUid) => {
  try {
    const [result] = await conn.query(
      "insert into stores (name, email, address, owner_uid) values (?, ?, ?, ?)",
      [name, email, address, ownerUid]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getStoreById = async (sid) => {
  try {
    const [rows] = await conn.query("select * from stores where sid = ?", [sid]);
    return rows[0];
  } catch (err) {
    throw err;
  }
};

exports.updateStore = async (sid, name, email, address, ownerUid) => {
  try {
    const [result] = await conn.query(
      "update stores set name = ?, email = ?, address = ?, owner_uid = ? where sid = ?",
      [name, email, address, ownerUid || null, sid]
    );
    return result;
  } catch (err) {
    throw err;
  }
};
const allowedSortColumns = ["name", "email", "address", "overallRating"];

exports.getAllStores = async (filters) => {
  const { name, email, address, ownerUid, sortBy, order } = filters;

  let query = `
    select s.sid, s.name, s.email, s.address, s.owner_uid, ROUND(AVG(r.rating), 1) as overallRating
    from stores s
    left join ratings r on s.sid = r.sid
    where 1=1
  `;
  const values = [];

  if (name) {
    query += " and s.name like ?";
    values.push(`%${name}%`);
  }
  if (email) {
    query += " and s.email like ?";
    values.push(`%${email}%`);
  }
  if (address) {
    query += " and s.address like ?";
    values.push(`%${address}%`);
  }
  if (ownerUid) {
    query += " and s.owner_uid = ?";
    values.push(ownerUid);
  }

  query += " group by s.sid";

  const sortColumn = allowedSortColumns.includes(sortBy) ? sortBy : "name";
  const sortOrder = order && order.toLowerCase() === "desc" ? "DESC" : "ASC";
  query += ` order by ${sortColumn} ${sortOrder}`;

  try {
    const [rows] = await conn.query(query, values);
    return rows;
  } catch (err) {
    throw err;
  }
};
exports.getStoresForUser = async (uid, filters) => {
  const { name, address, sortBy, order } = filters;

  let query = `
    select s.sid, s.name, s.address,
      ROUND(AVG(r.rating), 1) as overallRating,
      (select rating from ratings where uid = ? and sid = s.sid) as userRating
    from stores s
    left join ratings r on s.sid = r.sid
    where 1=1
  `;
  const values = [uid];

  if (name) {
    query += " and s.name like ?";
    values.push(`%${name}%`);
  }
  if (address) {
    query += " and s.address like ?";
    values.push(`%${address}%`);
  }

  query += " group by s.sid";

  const allowedColumns = ["name", "address", "overallRating"];
  const sortColumn = allowedColumns.includes(sortBy) ? sortBy : "name";
  const sortOrder = order && order.toLowerCase() === "desc" ? "DESC" : "ASC";
  query += ` order by ${sortColumn} ${sortOrder}`;

  try {
    const [rows] = await conn.query(query, values);
    return rows;
  } catch (err) {
    throw err;
  }
};

exports.getStoreByOwnerUid = async (ownerUid) => {
  try {
    const [rows] = await conn.query("select * from stores where owner_uid = ?", [ownerUid]);
    return rows[0];
  } catch (err) {
    throw err;
  }
};
exports.countStores = async () => {
  try {
    const [rows] = await conn.query("select count(*) as totalStores from stores");
    return rows[0].totalStores;
  } catch (err) {
    throw err;
  }
};
