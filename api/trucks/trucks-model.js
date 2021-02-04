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
    .select("truck_id", "truckName", "imageOfTruck", "cuisineType", "departureTime", "latitude", "longitude");
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
  return findByTruckId(id);
}

function findByTruckId(id) {
    return db("trucks")
      .select("truck_id", "truckName", "imageOfTruck", "cuisineType", "departureTime", "latitude", "longitude", "user_id")
      .where("truck_id", id)
      .first();
  }

function findById(id) {
  return db("trucks")
    .select("truck_id", "truckName", "imageOfTruck", "cuisineType", "departureTime", "latitude", "longitude", "user_id")
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