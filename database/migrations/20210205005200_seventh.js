
exports.up = function(knex) {
    return knex.schema
        .alterTable("diners_trucks_favorites", tbl => {
            tbl.dropColumn("trucks_menuItems_id")
        })
        .alterTable("diners_trucks_favorites", tbl => {
            tbl.increments("favorites_id")
        })
};

exports.down = function(knex) {
    return knex.schema
        .alterTable("diners_trucks_favorites", tbl => {
            tbl.dropColumn("favorites_id")
        })
        .alterTable("diners_trucks_favorites", tbl => {
            tbl.increments("trucks_menuItems_id")
        })
};
