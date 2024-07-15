import { Router, Request, Response } from "express";
import taskService from "../services/task.service";
import { CreateTaskDTO, Task, UpdateTaskDTO } from "../dto/task.dto";

const router = Router();

// GET all tasks

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

router.get("/tasks", async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskDTO'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input
 */
router.post("/task", async (req: Request, res: Response) => {
  try {
    const createTaskDTO: CreateTaskDTO = req.body;
    const newTask: Task = await taskService.createTask(createTaskDTO);
    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskDTO'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
router.put("/task/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateTaskDTO: UpdateTaskDTO = req.body;
    const updatedTask: Task = await taskService.updateTask(id, updateTaskDTO);
    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
router.delete("/task/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await taskService.deleteTask(id);
    res.sendStatus(204);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
