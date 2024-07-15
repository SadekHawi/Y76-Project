Endpoint: /api/tasks
Description: Manages tasks in a to-do list.

GET /api/tasks
Description: Retrieves all tasks.
HTTP Method: GET
URL: /api/tasks
Parameters: None
Response:
Status Code: 200 OK
Body: List of tasks in JSON format.
Example:

GET /api/tasks HTTP/1.1
Host: example.com

POST /api/tasks
Description: Creates a new task.
HTTP Method: POST
URL: /api/tasks
Request Body:
Content-Type: application/json
Body:
{
"title": "Task Title",
"description": "Task Description",
"completed": false
}
Response:
Status Code: 201 Created
Body: Details of the created task in JSON format.
Example:

POST /api/tasks HTTP/1.1
Host: example.com
Content-Type: application/json

{
"title": "Task Title",
"description": "Task Description",
"completed": false
}

DELETE /api/tasks/{taskId}
Description: Deletes a task by ID.
HTTP Method: DELETE
URL: /api/tasks/{taskId}
Parameters:
{taskId} (Path parameter) - ID of the task to delete.
Response:
Status Code: 200 OK
Example:
DELETE /api/tasks/123 HTTP/1.1
Host: example.com
