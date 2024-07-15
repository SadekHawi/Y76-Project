# Task API Development Documentation

## Task Overview

- **Objective:** Create a simple REST API service that manages a to-do list, utilizing LLMs throughout the development process.
- **Technology Stack:** Node.js, TypeScript, PostgreSQL, Knex.js
- **Endpoints:**
  - `GET /tasks`: Retrieve all tasks
  - `POST /task`: Create a new task
  - `PUT /task/{id}`: Update a task
  - `DELETE /task/{id}`: Delete a task

## Steps and LLM Utilization

1. **Define Task DTO using TypeScript:**

   - **Prompt:** Create a TypeScript type (`Task`) to represent the structure of your `tasks` table.
   - **Response:**

     ```typescript
     // src/dto/task.dto.ts

     export type Task = {
       id: number;
       title: string;
       description?: string | null;
       completed: boolean;
       created_at: Date;
       updated_at: Date;
     };
     ```

2. **Create DAO (Data Access Object) for Tasks:**

   - **Prompt:** Create a DAO file (`task.dao.ts`) where you'll write functions to interact with the database using Knex.
   - **Response:**

     ```typescript
     // src/dao/task.dao.ts

     import { Task } from "../dto/task.dto";
     import db from "../db/db";

     async function getAllTasks(): Promise<Task[]> {
       return await db<Task>("tasks").select("*");
     }

     export default {
       getAllTasks,
     };
     ```

3. **Implement Service for Tasks:**

   - **Prompt:** Create a service file (`task.service.ts`) that utilizes the DAO functions to provide business logic for your APIs.
   - **Response:**

     ```typescript
     // src/service/task.service.ts

     import { Task } from "../dto/task.dto";
     import taskDAO from "../dao/task.dao";

     async function getAllTasks(): Promise<Task[]> {
       return await taskDAO.getAllTasks();
     }

     export default {
       getAllTasks,
     };
     ```

4. **Set Up Route for Tasks:**

   - **Prompt:** Create a route file (`task.route.ts`) to define your API endpoints using Express or any other framework you're using.
   - **Response:**

     ```typescript
     // src/route/task.route.ts

     import { Router, Request, Response } from "express";
     import taskService from "../service/task.service";

     const router = Router();

     // GET all tasks
     router.get("/tasks", async (req: Request, res: Response) => {
       try {
         const tasks = await taskService.getAllTasks();
         res.json(tasks);
       } catch (error) {
         res.status(500).json({ message: "Failed to fetch tasks" });
       }
     });

     export default router;
     ```

5. **Integration in Main Application:**

   - **Prompt:** Ensure the main application file (`index.ts` or `app.ts`) mounts the routes properly.
   - **Response:**

     ```typescript
     // src/index.ts

     import express from "express";
     import taskRoutes from "./route/task.route";

     const app = express();
     const PORT = process.env.PORT || 3000;

     // Middleware
     app.use(express.json());

     // Mount task routes
     app.use("/api", taskRoutes);

     app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
     });
     ```

## Challenges and Solutions

- **Challenge:** Error with importing `dotenv` in `knexfile.ts`.
  - **Solution:** Installed `dotenv` and imported it correctly.
- **Challenge:** Error with module export in `db.ts`.
  - **Solution:** Corrected the import and export syntax for the configuration.

////////////////////////////////////////////////////////////////////////////////////////////////

Prompt: Set up Swagger for documenting and testing APIs in a Node.js project using TypeScript.

Response:

Install Swagger Dependencies:

npm install swagger-jsdoc swagger-ui-express
Create Swagger Configuration:

// src/swagger.ts

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
definition: {
openapi: '3.0.0',
info: {
title: 'To-Do List API',
version: '1.0.0',
description: 'API documentation for the To-Do List service',
},
servers: [
{
url: 'http://localhost:3000/api',
},
],
},
apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app: Express) => {
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
Annotate Your Routes:

// src/routes/task.route.ts

import { Router, Request, Response } from 'express';
import taskService from '../service/task.service';

const router = Router();

/\*\*

- @swagger
- components:
- schemas:
-     Task:
-       type: object
-       required:
-         - title
-       properties:
-         id:
-           type: integer
-           description: The auto-generated id of the task
-         title:
-           type: string
-           description: The title of the task
-         description:
-           type: string
-           description: The description of the task
-         completed:
-           type: boolean
-           description: The status of the task
-         created_at:
-           type: string
-           format: date-time
-           description: The date the task was created
-         updated_at:
-           type: string
-           format: date-time
-           description: The date the task was last updated
-       example:
-         id: 1
-         title: "Buy groceries"
-         description: "Milk, Bread, Fruits"
-         completed: false
-         created_at: "2024-07-14T12:00:00Z"
-         updated_at: "2024-07-14T12:00:00Z"
  \*/

/\*\*

- @swagger
- /tasks:
- get:
-     summary: Retrieve a list of tasks
-     tags: [Tasks]
-     responses:
-       200:
-         description: A list of tasks
-         content:
-           application/json:
-             schema:
-               type: array
-               items:
-                 $ref: '#/components/schemas/Task'
  \*/
  router.get('/tasks', async (req: Request, res: Response) => {
  try {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
  } catch (error) {
  res.status(500).json({ message: 'Failed to fetch tasks' });
  }
  });

export default router;
Integrate Swagger with Your Express App:

import express from 'express';
import taskRoutes from './routes/task.route';
import setupSwagger from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Mount task routes
app.use('/api', taskRoutes);

// Setup Swagger
setupSwagger(app);

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

///////////////////////////////////////////////////////////////////////////////////
Create Task API Implementation

Prompt: Create the 'create task' API with three functions in DAO, service, and route. Ensure to include Swagger documentation for the route. For creating a task, define a new DTO type since the ID is auto-incremented

Response:

Creating a Task
To create a new task, we added a new DTO type, DAO function, service function, and route. We also included Swagger documentation to describe the new endpoint.

CreateTaskDTO Type (create-task.dto.ts):

export type CreateTaskDTO = {
title: string;
description?: string;
completed?: boolean;
};
DAO Function (task.dao.ts):

import { Task } from "../dto/task.dto";
import { CreateTaskDTO } from "../dto/create-task.dto";
import db from "../db/db";

async function createTask(task: CreateTaskDTO): Promise<Task> {
const [newTask] = await db("tasks").insert(task).returning("\*");
return newTask;
}

export default {
getAllTasks,
createTask,
};
Service Function (task.service.ts):

import taskDao from "../dao/task.dao";
import { Task } from "../dto/task.dto";
import { CreateTaskDTO } from "../dto/create-task.dto";

async function createTask(task: CreateTaskDTO): Promise<Task> {
return await taskDao.createTask(task);
}

export default {
getAllTasks,
createTask,
};
Route (task.route.ts):

import { Router, Request, Response } from 'express';
import taskService from '../service/task.service';
import { Task } from '../dto/task.dto';
import { CreateTaskDTO } from '../dto/create-task.dto';

const router = Router();

/\*\*

- @swagger
- /task:
- post:
-     summary: Create a new task
-     tags: [Tasks]
-     requestBody:
-       required: true
-       content:
-         application/json:
-           schema:
-             $ref: '#/components/schemas/CreateTaskDTO'
-     responses:
-       201:
-         description: Task created successfully
-         content:
-           application/json:
-             schema:
-               $ref: '#/components/schemas/Task'
-       400:
-         description: Invalid input
  \*/
  router.post('/task', async (req: Request, res: Response) => {
  try {
  const createTaskDTO: CreateTaskDTO = req.body;
  const newTask: Task = await taskService.createTask(createTaskDTO);
  res.status(201).json(newTask);
  } catch (error) {
  res.status(400).json({ message: error.message });
  }
  });

export default router;
///////////////////////////////////////////////////////////////////////////////////////////////
Setting Up Jest for Unit Testing
Prompt:

I want to set up Jest for unit testing my TypeScript project. Please provide a step-by-step guide for configuring Jest, including the necessary package installations, `tsconfig.json` settings, Jest configuration, and an example unit test file.
Response:

markdown
Copy code
To set up Jest for unit testing your TypeScript project, follow these steps:

### Step 1: Install Necessary Packages

```bash
npm install --save-dev jest ts-jest @types/jest typescript
Step 2: Update tsconfig.json
Ensure your tsconfig.json includes the necessary settings:

json
Copy code
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts", "tests/**/*.ts"]
}
Step 3: Configure Jest
Create or update jest.config.js:

javascript
Copy code
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
Step 4: Ensure Babel Configuration (If Needed)
If you are using Babel, ensure you have a .babelrc or babel.config.js file configured properly:

json
Copy code
// .babelrc
{
  "presets": ["@babel/preset-env"]
}
Step 5: Example Unit Test File
An example unit test file for task.service.ts:

typescript
Copy code
import taskService from '../../src/services/task.service';
import db from '../../src/db/db';
import { Task } from '../../src/dto/task.dto';

jest.mock('../../src/db/db');

describe('Task Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all tasks', async () => {
    const tasks: Task[] = [
      { id: 1, title: 'Task 1', description: 'Description 1', completed: false, created_at: new Date(), updated_at: new Date() },
      { id: 2, title: 'Task 2', description: 'Description 2', completed: true, created_at: new Date(), updated_at: new Date() },
    ];

    (db as jest.MockedFunction<typeof db>).mockResolvedValue(tasks);

    const result = await taskService.getAllTasks();

    expect(result).toEqual(tasks);
    expect(db).toHaveBeenCalledWith('task');
    expect(db().select).toHaveBeenCalledWith('*');
  });
});
Step 6: Run Tests
Run your tests with:

npm test
////////////////////////////////////////////////////////////////////////////////////////////////////
```

prompt :i want to document the the APIs including endpoint description and usage examples

in API-Documentation.md file

////////////////////////////////////////////////////////////////////////////////////
