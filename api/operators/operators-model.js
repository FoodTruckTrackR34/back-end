const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("operators")
    .select("id", "username", "role");
}

function findBy(username) {
  return db("operators")
    .select("id", "username", "password", "role")
    .where("username", username);
}

async function add(user) {
  const [id] = await db("operators").insert(user, "id");
  return findById(id);
}

function findById(id) {
  return db("operators")
    .select("id", "username", "role")
    .where("id", id)
    .first();
}
