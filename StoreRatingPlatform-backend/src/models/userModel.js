let conn = require("../../db.js");

exports.registerUser = async (name, email, address, encPass, role, status) => {
  try {
    const [result] = await conn.query(
      "insert into users (name, email, address, password, role, status) values (?, ?, ?, ?, ?, ?)",
      [name, email, address, encPass, role, status]
    );
    return result;
  } catch (err) {
    throw err;
  }
};
exports.findUserByEmail = async (email) => {
  try {
    const [rows] = await conn.query("select * from users where email = ?", [email]);
    return rows[0];
  } catch (err) {
    throw err;
  }
};

exports.findUserById = async (uid) => {
  try {
    const [rows] = await conn.query(
      "select uid, name, email, address, role from users where uid = ?",
      [uid]
    );
    return rows[0];
  } catch (err) {
    throw err;
  }
};

exports.updatePassword = async (uid, encPass) => {
  try {
    const [result] = await conn.query("update users set password = ? where uid = ?", [
      encPass,
      uid,
    ]);
    return result;
  } catch (err) {
    throw err;
  }
};

// only these columns are allowed for sorting, to avoid SQL injection via query params
const allowedSortColumns = ["name", "email", "address", "role"];

exports.getAllUsers = async (filters) => {
  const { name, email, address, role, sortBy, order } = filters;

  let query = "select uid, name, email, address, role from users where status = true";
const values = [];

  if (name) {
    query += " and name like ?";
    values.push(`%${name}%`);
  }
  if (email) {
    query += " and email like ?";
    values.push(`%${email}%`);
  }
  if (address) {
    query += " and address like ?";
    values.push(`%${address}%`);
  }
  if (role) {
    query += " and role = ?";
    values.push(role);
  }

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

exports.countUsers = async () => {
  try {
    const [rows] = await conn.query("select count(*) as totalUsers from users");
    return rows[0].totalUsers;
  } catch (err) {
    throw err;
  }
};

exports.getPendingUsers = async () => {
  try {
    const [rows] = await conn.query(
      "select uid, name, email, address, role from users where status = false"
    );
    return rows;
  } catch (err) {
    throw err;
  }
};

exports.approveUser = async (uid) => {
  try {
    const [result] = await conn.query("update users set status = true where uid = ?", [uid]);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getPendingUsers = async () => {
  try {
    const [rows] = await conn.query(
      "select uid, name, email, address, role from users where status = false"
    );
    return rows;
  } catch (err) {
    throw err;
  }
};





