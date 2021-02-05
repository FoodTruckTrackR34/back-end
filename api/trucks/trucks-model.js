const { select } = require("../../database/dbConfig.js");
const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  find,
  findByUserId,
  findByTruckId,
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
        .avg("rating")
        .select("truck_id")
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
    return db("trucks")
        .select()
}

async function add(truck) {
  const [id] = await db("trucks").insert(truck, "truck_id");
  return findByTruckId(id);
}

async function findByTruckId(id) {
    return db("trucks")
      .select()
      .where("truck_id", id)
      .first();
  }

function findByUserId(id) {
  return db("trucks")
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
    await db("trucks")
        .select("*")
        .where("truck_id", id)
        .del()
    return deleted
}