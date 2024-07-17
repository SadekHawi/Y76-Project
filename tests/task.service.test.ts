import taskService from "../src/services/task.service";
import taskDao from "../src/dao/task.dao";
import { Task, CreateTaskDTO, UpdateTaskDTO } from "../src/dto/task.dto";

jest.mock("../src/dao/task.dao");

describe("Task Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all tasks", async () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        title: "Test Task 1",
        description: "Description 1",
        completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: "Test Task 2",
        description: "Description 2",
        completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    (taskDao.getAllTasks as jest.Mock).mockResolvedValue(mockTasks);

    const tasks = await taskService.getAllTasks();
    expect(tasks).toEqual(mockTasks);
  });

  it("should return a task by id", async () => {
    const mockTask: Task = {
      id: 1,
      title: "Test Task 1",
      description: "Description 1",
      completed: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    (taskDao.getTaskById as jest.Mock).mockResolvedValue(mockTask);

    const task = await taskService.getTaskById(1);
    expect(task).toEqual(mockTask);
  });

  it("should create a new task", async () => {
    const newTask: CreateTaskDTO = {
      title: "New Task",
      description: "New Description",
      completed: false,
    };

    const createdTask = {
      id: 1,
      ...newTask,
      created_at: new Date(),
      updated_at: new Date(),
    };

    (taskDao.createTask as jest.Mock).mockResolvedValue(createdTask);

    const task = await taskService.createTask(newTask);
    expect(task).toEqual(createdTask);
  });

  it("should update an existing task", async () => {
    const updatedTask: UpdateTaskDTO = {
      title: "Updated Task",
      description: "Updated Description",
      completed: true,
    };

    const returnedTask = {
      id: 1,
      ...updatedTask,
      created_at: new Date(),
      updated_at: new Date(),
    };

    (taskDao.updateTask as jest.Mock).mockResolvedValue(returnedTask);

    const task = await taskService.updateTask(1, updatedTask);
    expect(task).toEqual(returnedTask);
  });

  it("should delete a task by id", async () => {
    (taskDao.deleteTask as jest.Mock).mockResolvedValue(1);

    const result = await taskService.deleteTask(1);
    expect(result).toBe(1);
  });
});
