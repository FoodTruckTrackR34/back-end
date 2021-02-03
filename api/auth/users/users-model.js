const db = require("../../../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update
};

function find() {
  return db("users")
    .select("user_id", "username", "role");
}

// function find() {
//   return db("users")
//     .select("user_id", "username", "role", "email", "lat", "lng");
// }

function findBy(username) {
  return db("users")
    // .select("user_id", "username", "password", "role")
    .select("*")
    .where("username", username);
}

async function add(user) {
  const [id] = await db("users").insert(user, "user_id");
  return findById(id);
}

function findById(id) {
  return db("users")
    .select("user_id", "username", "role")
    .where("user_id", id)
    .first();
}

function update(id, changes) {
  return db("users")
      .update(changes)
      .where("user_id", id)
}