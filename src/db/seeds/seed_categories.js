/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("categories").del();

  // Inserts seed entries
  await knex("categories").insert([
    { machine_name: "work", display_name: "Work" },
    { machine_name: "personal", display_name: "Personal" },
    { machine_name: "shopping", display_name: "Shopping" },
  ]);
};
