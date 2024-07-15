/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tasks").del();

  // Inserts seed entries
  await knex("tasks").insert([
    {
      title: "Task 1",
      description: "Description for Task 1",
      completed: false,
    },
    { title: "Task 2", description: "Description for Task 2", completed: true },
    {
      title: "Task 3",
      description: "Description for Task 3",
      completed: false,
    },
  ]);
};
