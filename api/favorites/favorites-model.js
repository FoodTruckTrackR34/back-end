const { select } = require("../../database/dbConfig.js");
const db = require("../../database/dbConfig.js");

module.exports = {
    findByUserId,
    add,
    find
}

function find() {
    return db("diners_trucks_favorites as f")
        .join("trucks as t", "f.truck_id", "t.truck_id")
        .select("f.favorites_id", "f.user_id", "t.truckName", "t.latitude", "t.longitude")
}

function findByUserId(id) {
    return db("diners_trucks_favorites as f")
        .join("trucks as t", "f.truck_id", "t.truck_id")
        .select("f.favorites_id", "f.user_id", "t.truckName", "t.latitude", "t.longitude")
        .where("f.user_id", id)
}

function findByTablePrimaryKey(id) {
    return db("diners_trucks_favorites")
    .select()
    .where("favorites_id", id)
}

async function add(favoriteObj) {
    const [id] = await db("diners_trucks_favorites").insert(favoriteObj, "favorites_id")
    return findByTablePrimaryKey(id)
}