
exports.up = function(knex) {
    return knex.schema
        .alterTable("trucks", tbl => {
            tbl.dropColumn("imageOfTruck")
        })
        .alterTable("trucks", tbl => {
            tbl.string("imageOfTruck", 1000)
        })
        .alterTable("menuItems", tbl => {
            tbl.dropColumn("itemPhoto")
        })
        .alterTable("menuItems", tbl => {
            tbl.string("itemPhoto", 1000)
        })
        .alterTable("menuItemPhotos", tbl => {
            tbl.dropColumn("photo")
        })
        .alterTable("menuItemPhotos", tbl => {
            tbl.string("photo", 1000)
        })
};

exports.down = function(knex) {
    return knex.schema
        .alterTable("menuItemPhotos", tbl => {
            tbl.dropColumn("photo")
        })
        .alterTable("menuItemPhotos", tbl => {
            tbl.string("photo", 128)
        })
        .alterTable("menuItems", tbl => {
            tbl.dropColumn("itemPhoto")
        })
        .alterTable("menuItems", tbl => {
            tbl.string("itemPhoto", 128)
        })
        .alterTable("trucks", tbl => {
            tbl.dropColumn("imageOfTruck")
        })
        .alterTable("trucks", tbl => {
            tbl.string("imageOfTruck", 128)
        })
};
