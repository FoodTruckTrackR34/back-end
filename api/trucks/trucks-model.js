const { select } = require("../../database/dbConfig.js");
const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  find,
  findById,
  update,
  remove
};

function find() {
  return db("trucks")
    .select("truck_id", "imageOfTruck", "cuisineType", "departureTime", "lat", "lng");
}

// function find() {
//   return db("users")
//     .select("user_id", "username", "role", "email", "lat", "lng");
// }

// function findBy(username) {
//   return db("users")
//     .select("user_id", "username", "password", "role")
//     .where("username", username);
// }

async function add(truck) {
  const [id] = await db("trucks").insert(truck, "truck_id");
  return findById(id);
}

function findById(id) {
  return db("trucks")
    .select("truck_id", "imageOfTruck", "cuisineType", "departureTime", "lat", "lng", "user_id")
    .where("user_id", id)
    .first();
}

function update(id, changes) {
    return db("trucks")
        .update(changes)
        .where("truck_id", id)
}

async function remove(id) {
    const deleted = await db("trucks").where("truck_id", id).first()
    const hi = await db("trucks")
        .select("*")
        .where("truck_id", id)
        .del()
    console.log(hi)
    return deleted
}