import { Router } from "express";
import taskService from "../services/task.service";
import { CreateTaskDTO, UpdateTaskDTO } from "../dto/task.dto";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: The list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /tasks:
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
 *         description: The created task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post("/tasks", async (req, res) => {
  try {
    const task: CreateTaskDTO = req.body;
    const newTask = await taskService.createTask(task);
    res.status(201).json(newTask);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.get("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = await taskService.getTaskById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskDTO'
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.put("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task: UpdateTaskDTO = req.body;
    const updatedTask = await taskService.updateTask(id, task);
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
router.delete("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await taskService.deleteTask(id);
    if (result) {
      res.status(200).json({ message: "Task deleted" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
