import taskDao from "../dao/task.dao";
import { CreateTaskDTO, Task, UpdateTaskDTO } from "../dto/task.dto";

async function getAllTasks(): Promise<Task[]> {
  return taskDao.getAllTasks();
}

async function createTask(task: CreateTaskDTO): Promise<Task> {
  return taskDao.createTask(task);
}

async function updateTask(id: number, task: UpdateTaskDTO): Promise<Task> {
  return taskDao.updateTask(id, task);
}

async function deleteTask(id: number): Promise<number> {
  return taskDao.deleteTask(id);
}

async function getTaskById(id: number): Promise<Task> {
  return taskDao.getTaskById(id);
}

export default {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
};
