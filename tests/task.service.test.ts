import taskService from "../src/services/task.service";
import db from "../src/db/db";
import { Task } from "../src/dto/task.dto";

jest.mock("../src/db/db");

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

    (db as any).mockReturnValue({
      select: jest.fn().mockResolvedValue(mockTasks),
    });

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

    (db as any).mockReturnValue({
      where: jest.fn().mockReturnValue({
        first: jest.fn().mockResolvedValue(mockTask),
      }),
    });

    const task = await taskService.getTaskById(1);
    expect(task).toEqual(mockTask);
  });

  it("should create a new task", async () => {
    const newTask = {
      title: "New Task",
      description: "New Description",
      completed: false,
    };

    const createdTask: Task = {
      id: 1,
      ...newTask,
      created_at: new Date(),
      updated_at: new Date(),
    };

    (db as any).mockReturnValue({
      insert: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([createdTask]),
      }),
    });

    const task = await taskService.createTask(newTask);
    expect(task).toEqual(createdTask);
  });

  it("should update an existing task", async () => {
    const updatedTask = {
      title: "Updated Task",
      description: "Updated Description",
      completed: true,
    };

    const returnedTask: Task = {
      id: 1,
      ...updatedTask,
      created_at: new Date(),
      updated_at: new Date(),
    };

    (db as any).mockReturnValue({
      where: jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([returnedTask]),
        }),
      }),
    });

    const task = await taskService.updateTask(1, updatedTask);
    expect(task).toEqual(returnedTask);
  });

  it("should delete a task by id", async () => {
    const deleteMock = jest.fn().mockResolvedValue(1);

    (db as any).mockReturnValue({
      where: jest.fn().mockReturnValue({
        delete: deleteMock,
      }),
    });

    const result = await taskService.deleteTask(1);
    expect(result).toBe(1);
  });
});
