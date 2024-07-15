import { CreateTaskDTO, Task, UpdateTaskDTO } from "../dto/task.dto";
import taskDao from "../dao/task.dao";

async function getAllTasks(): Promise<Task[]> {
  return await taskDao.getAllTasks();
}

async function createTask(task: CreateTaskDTO): Promise<Task> {
  return await taskDao.createTask(task);
}

async function updateTask(id: number, task: UpdateTaskDTO): Promise<Task> {
  return await taskDao.updateTask(id, task);
}

async function deleteTask(id: number): Promise<number> {
  return await taskDao.deleteTask(id);
}

async function getTaskById(id: number): Promise<Task | null> {
  return await taskDao.getTaskById(id);
}

export default {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
};
