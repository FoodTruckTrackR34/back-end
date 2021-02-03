
exports.up = function(knex) {
    return knex.schema.alterTable("menuItems", tbl => {
        tbl.dropUnique("itemName")
        tbl.dropIndex("itemName")
      })
};

exports.down = function(knex) {
    return knex.schema.alterTable("menuItems", tbl => {
        tbl.unique("itemName")
        tbl.index("itemName")
      })
};
