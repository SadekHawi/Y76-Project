import { CreateTaskDTO, Task, UpdateTaskDTO } from "../dto/task.dto";
import db from "../db/db";

async function getAllTasks(): Promise<Task[]> {
  const tasks = await db("tasks").select("*");
  if (!tasks) {
    throw new Error("No tasks found");
  }
  return tasks;
}

async function createTask(task: CreateTaskDTO): Promise<Task> {
  const [newTask] = await db("tasks").insert(task).returning("*");

  if (!newTask) {
    throw new Error("Failed to create task");
  }
  return newTask;
}

async function updateTask(id: number, task: UpdateTaskDTO): Promise<Task> {
  const [updatedTask] = await db("tasks")
    .where({ id })
    .update(task)
    .returning("*");
  if (!updatedTask) {
    throw new Error("Failed to update task");
  }
  return updatedTask;
}

async function deleteTask(id: number): Promise<number> {
  const deletedRows = await db("tasks").where({ id }).delete();
  if (deletedRows === 0) {
    throw new Error("Failed to delete task");
  }
  return 1;
}

async function getTaskById(id: number): Promise<Task> {
  const task = await db("tasks").where({ id }).first();

  if (!task) {
    throw new Error("Failed to get task");
  }
  return task;
}

export default {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
};
