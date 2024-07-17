// Import the DAO and the necessary interfaces or types
import taskDao from "../src/dao/task.dao";
import { Task, UpdateTaskDTO, CreateTaskDTO } from "../src/dto/task.dto";

// Mock the DAO functions
jest.mock("../src/dao/task.dao", () => ({
  __esModule: true,
  default: {
    createTask: jest.fn(),
    getAllTasks: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  },
}));

describe("Task DAO", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should insert a task into the database", async () => {
    const newTask: CreateTaskDTO = {
      title: "New Task",
      description: "Description for New Task",
      completed: false,
    };

    const insertedTask = {
      id: 1,
      ...newTask,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Mock the createTask function to return the inserted task
    (taskDao.createTask as jest.Mock).mockResolvedValue(insertedTask);

    const result = await taskDao.createTask(newTask);

    expect(result).toEqual(insertedTask);
    expect(taskDao.createTask).toHaveBeenCalledWith(newTask);
  });

  it("should retrieve all tasks from the database", async () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        title: "Test Task 1",
        description: "Description for Test Task 1",
        completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: "Test Task 2",
        description: "Description for Test Task 2",
        completed: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Mock the getAllTasks function to return the mockTasks array
    (taskDao.getAllTasks as jest.Mock).mockResolvedValue(mockTasks);

    const result = await taskDao.getAllTasks();

    expect(result).toEqual(mockTasks);
    expect(taskDao.getAllTasks).toHaveBeenCalled();
  });

  it("should update a task in the database", async () => {
    const taskId = 1;
    const updatedTask: UpdateTaskDTO = {
      title: "Updated Task",
      completed: true,
    };

    // Mock the updateTask function to return the number of affected rows (1)
    (taskDao.updateTask as jest.Mock).mockResolvedValue(1);

    const result = await taskDao.updateTask(taskId, updatedTask);

    expect(result).toEqual(1);
    expect(taskDao.updateTask).toHaveBeenCalledWith(taskId, updatedTask);
  });

  it("should delete a task from the database", async () => {
    const taskId = 1;

    // Mock the deleteTask function to return the number of affected rows (1)
    (taskDao.deleteTask as jest.Mock).mockResolvedValue(1);

    const result = await taskDao.deleteTask(taskId);

    expect(result).toEqual(1);
    expect(taskDao.deleteTask).toHaveBeenCalledWith(taskId);
  });
});
