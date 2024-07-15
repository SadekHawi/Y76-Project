exports.up = async function (knex) {
  await knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description").nullable();
    table.boolean("completed").defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("tasks");
};
