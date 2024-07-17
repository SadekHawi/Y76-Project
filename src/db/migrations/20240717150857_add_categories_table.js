exports.up = async function (knex) {
  await knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();
    table.string("machine_name").notNullable().unique();
    table.string("display_name").notNullable();
  });

  await knex.schema.table("tasks", (table) => {
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories");
  });
};

exports.down = async function (knex) {
  await knex.schema.table("tasks", (table) => {
    table.dropColumn("category_id");
  });

  await knex.schema.dropTable("categories");
};
