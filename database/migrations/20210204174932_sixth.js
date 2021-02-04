
exports.up = function(knex) {
    return knex.schema.alterTable("trucks", tbl => {
        tbl.dropUnique("imageOfTruck")
        tbl.dropColumn("departureTime")
        tbl.string("departureTimeString")
      })
};

exports.down = function(knex) {
    return knex.schema.alterTable("trucks", tbl => {
        tbl.dropColumn("departureTimeString")
        tbl.datetime("departureTime")
        tbl.unique("imageOfTruck")
      })
};
