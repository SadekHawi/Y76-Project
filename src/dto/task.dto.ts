/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         completed:
 *           type: boolean
 *           description: The status of the task
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the task was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date the task was last updated
 *       example:
 *         id: 1
 *         title: "Buy groceries"
 *         description: "Milk, Bread, Fruits"
 *         completed: false
 *         created_at: "2024-07-14T12:00:00Z"
 *         updated_at: "2024-07-14T12:00:00Z"
 */

export type Task = {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  created_at?: Date;
  updated_at?: Date;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTaskDTO:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         completed:
 *           type: boolean
 *       required:
 *         - title
 */

export type CreateTaskDTO = {
  title: string;
  description?: string;
  completed?: boolean;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateTaskDTO:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         completed:
 *           type: boolean
 *       required:
 *         - title
 */

export type UpdateTaskDTO = {
  title?: string;
  description?: string;
  completed?: boolean;
};
