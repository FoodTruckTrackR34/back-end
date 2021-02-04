
exports.up = function(knex) {
    return knex.schema.alterTable("trucks", tbl => {
        tbl.string("truckName", 128)
      })
};

exports.down = function(knex) {
    return knex.schema.alterTable("trucks", tbl => {
        tbl.dropColumn("truckName")
      })
};