
exports.up = function(knex) {
    return knex.schema.alterTable("users", tbl => {
        tbl.dropColumn("lng")
        tbl.dropColumn("lat")
        tbl.float("latitude")
        tbl.float("longitude")
      })
};

exports.down = function(knex) {
    return knex.schema.alterTable("users", tbl => {
        tbl.dropColumn("longitude")
        tbl.dropColumn("latitude")
        tbl.integer("lat")
        tbl.integer("lng")
      })
};