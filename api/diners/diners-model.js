const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("diners")
    .select("id", "username", "role");
}

function findBy(username) {
  return db("diners")
    .select("id", "username", "password", "role")
    .where("username", username);
}

async function add(user) {
  const [id] = await db("diners").insert(user, "id");
  return findById(id);
}

function findById(id) {
  return db("diners")
    .select("id", "username", "role")
    .where("id", id)
    .first();
}
