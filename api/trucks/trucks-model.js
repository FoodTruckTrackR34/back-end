const { select } = require("../../database/dbConfig.js");
const db = require("../../database/dbConfig.js");

// const knexfile = require("../../knexfile.js");
// const knex = require("knex")(knexfile);

module.exports = {
  add,
  find,
  findById,
  update,
  remove,
  addRating,
  findAllTruckRatings,
  findAvgTruckRatingSortByTruckId,
  findTruckRatingByTruckId
};

function avgRatingByTruckId(id) {
    return db("truckRatings as tr")
        .where("truck_id", 3)
        .avg("rating")
        .select("*")
        .groupBy("tr.truckRatings_id")
}

function findAvgTruckRatingSortByTruckId() {
    return db("truckRatings")
        .groupBy("truck_id")
        // id
        // .where("truck_id", id)
        .avg("rating")
        .select("truck_id")
        // .where("truckRatings_id", id)
}

function findTruckRatingByTruckId(id) {
    return db("truckRatings")
        .select()
        .where("truckRatings_id", id)
}

function findAllTruckRatings() {
    return db("truckRatings")
        .select()
}

async function addRating(ratingObj) {
    const [id] = await db("truckRatings").insert(ratingObj, "truckRatings_id");
    return findTruckRatingByTruckId(id)
}



function find() {
    // const avgRating
    return db("trucks as t")
        // .leftJoin("truckRatings as tr", "t.truck_id", "tr.truck_id")
        // .columns.raw("avg(rating) as avgRating")
        // .avg("rating as avgRating")
        .select()
        // .select("t.truck_id", 
        // "truckName", 
        // "imageOfTruck", 
        // "cuisineType", 
        // "departureTime", 
        // "latitude", 
        // "longitude", 
        // "t.user_id");
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
    // "truck_id", "truckName", "imageOfTruck", "cuisineType", "departureTime", "latitude", "longitude", "user_id"
      .select()
      .where("truck_id", id)
      .first();
  }

function findById(id) {
  return db("trucks")
//   "truck_id", "truckName", "imageOfTruck", "cuisineType", "departureTime", "latitude", "longitude", "user_id"
    .select()
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