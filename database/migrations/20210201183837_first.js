exports.up = function (knex) {
    return knex.schema
        .createTable("users", tbl => {
            tbl.increments("user_id")
            tbl.string("username", 128).notNullable().unique().index()
            tbl.string("password", 256).notNullable()
            tbl.string("email", 256).notNullable().unique()
            tbl.string("role", 128).notNullable()
            tbl.integer("lat")
            tbl.integer("lng")
        })
        .createTable("trucks", tbl => {
            tbl.increments("truck_id")
            tbl.string("imageOfTruck", 128).notNullable().unique()
            tbl.string("cuisineType", 256).notNullable()
            tbl.datetime("departureTime")
            tbl.integer("lat")
            tbl.integer("lng")
            tbl.integer("user_id")
                .unsigned()
                .notNullable()
                .references("user_id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
        })
        .createTable("menuItems", tbl => {
            tbl.increments("menuItem_id")
            tbl.string("itemName", 128).notNullable().unique().index()
            tbl.string("itemDescription", 128)
            tbl.string("itemPhoto", 128)
            tbl.integer("itemPrice").notNullable()
        })
        .createTable("truckRatings", tbl => {
            tbl.increments("truckRatings_id")
            tbl.integer("rating").notNullable()
            tbl.integer("truck_id")
                .unsigned()
                .notNullable()
                .references("truck_id")
                .inTable("trucks")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
            tbl.integer("user_id")
                .unsigned()
                .notNullable()
                .references("user_id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
        })
        .createTable("menuItemRatings", tbl => {
            tbl.increments("menuItemRating_id")
            tbl.integer("rating").notNullable()
            tbl.integer("menuItem_id")
                .unsigned()
                .notNullable()
                .references("menuItem_id")
                .inTable("menuItems")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
            tbl.integer("user_id")
                .unsigned()
                .notNullable()
                .references("user_id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
        })
        .createTable("menuItemPhotos", tbl => {
            tbl.increments("menuItemPhoto_id")
            tbl.string("photo", 128).notNullable()
            tbl.integer("menuItem_id")
                .unsigned()
                .notNullable()
                .references("menuItem_id")
                .inTable("menuItems")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
        })
        .createTable("operators_trucks", tbl => {
            tbl.increments("operators_trucks_id");
            tbl.integer("operator_id")
                .unsigned()
                .notNullable()
                .references("operator_id")
                .inTable("operators")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
            tbl.integer("truck_id")
                .unsigned()
                .notNullable()
                .references("truck_id")
                .inTable("trucks")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
        })
        .createTable("trucks_menuItems", tbl => {
            tbl.increments("trucks_menuItems_id");
            tbl.integer("truck_id")
                .unsigned()
                .notNullable()
                .references("truck_id")
                .inTable("trucks")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
            tbl.integer("menuItem_id")
                .unsigned()
                .notNullable()
                .references("menuItem_id")
                .inTable("menuItems")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
        })
        .createTable("diners_trucks_favorites", tbl => {
            tbl.increments("trucks_menuItems_id");
            tbl.integer("truck_id")
                .unsigned()
                .notNullable()
                .references("truck_id")
                .inTable("trucks")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
            tbl.integer("menuItem_id")
                .unsigned()
                .notNullable()
                .references("menuItem_id")
                .inTable("menuItems")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
        })
}

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("diners_trucks_favorites")
        .dropTableIfExists("trucks_menuItems")
        .dropTableIfExists("operators_trucks")
        .dropTableIfExists("menuItemPhotos")
        .dropTableIfExists("menuItemRatings")
        .dropTableIfExists("truckRatings")
        .dropTableIfExists("menuItems")
        .dropTableIfExists("trucks")
        .dropTableIfExists("users")
}

    //   .createTable("diners", tbl => {
    //     tbl.increments("diner_id");
    //     tbl.string("username", 128).notNullable().unique().index();
    //     tbl.string("password", 256).notNullable();
    //     tbl.string("email", 256).notNullable().unique();
    //     tbl.integer("lat");
    //     tbl.integer("lng");
    //   })
    //   .createTable("operators", tbl => {
    //     tbl.increments("operator_id");
    //     tbl.string("username", 128).notNullable().unique().index();
    //     tbl.string("password", 256).notNullable();
    //     tbl.string("email", 256).notNullable().unique();
    //   })