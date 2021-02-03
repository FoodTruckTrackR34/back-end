const { select } = require("../../database/dbConfig.js");
const db = require("../../database/dbConfig.js");

module.exports = {
    add,
    find,
    findByTruckId,
    findByMenuItemId,
    update,
    remove
};

function find() {
  return db("trucks_menuItems as tm")
    .join("trucks as t", "tm.truck_id", "t.truck_id")
    .join("menuItems as m", "tm.menuItem_id", "m.menuItem_id")
    .select("t.truck_id", "t.cuisineType", "m.itemName", "m.itemDescription", "m.itemPhoto", "m.itemPrice")
}

function findByTruckId(truck_id) {
    return db("trucks_menuItems as tm")
      .join("trucks as t", "tm.truck_id", "t.truck_id")
      .join("menuItems as m", "tm.menuItem_id", "m.menuItem_id")
      .select("t.truck_id", "t.cuisineType", "m.itemName", "m.itemDescription", "m.itemPhoto", "m.itemPrice")
      .where("t.truck_id", truck_id)
}

function findByMenuItemId(menuItem_id) {
    return db("trucks_menuItems as tm")
        .join("trucks as t", "tm.truck_id", "t.truck_id")
        .join("menuItems as m", "tm.menuItem_id", "m.menuItem_id")
        .select("t.truck_id", "t.cuisineType", "m.itemName", "m.itemDescription", "m.itemPhoto", "m.itemPrice")
        .where("m.menuItem_id", menuItem_id)
}

async function add(menuItem, truck_id) {
    // const x = menuItem
    const [newMenuItemId] = await db("menuItems")
        .insert(menuItem, "menuItem_id")
    // const y = { newMenuItemId, truck_id }
    const menuItem_id = newMenuItemId
    // console.log(newMenuItemId)
    const [newTruck_MenuItemId] = await db("trucks_menuItems")
        .insert({ menuItem_id, truck_id }, "trucks_menuItems_id");
    return findByMenuItemId(newMenuItemId);
    // return findByTruckId(truck_id);
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

// async function add(truck) {
//   const [id] = await db("trucks").insert(truck, "truck_id");
//   return findById(id);
// }

// function findById(id) {
//   return db("trucks")
//     .select("truck_id", "imageOfTruck", "cuisineType", "departureTime", "lat", "lng", "user_id")
//     .where("user_id", id)
//     .first();
// }

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