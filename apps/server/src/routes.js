const controller = require("./controller.js");

/**
 * @typedef {object} Task
 * @property {string} id.required - Identification
 * @property {string} text.required - Content
 * @property {boolean} completed.required - Status
 * @property {number} createdDate.required - Date when task was created (Timestamp)
 * @property {number} completedDate - Date when task was completed (Timestamp)
 */

/**
 * @typedef {object} CreateTask
 * @property {string} text.required - Content
 */

/**
 * @typedef {object} UpdateTask
 * @property {string} text.required - Content
 */

module.exports = (app) => {
    /**
     * GET /tasks
     * @summary Returns all tasks. Slow service, around 3 seconds
     * @tags Tasks
     * @return {array<Task>} 200 - Successful response - application/json
     */
    /**
     * POST /tasks
     * @summary Creates task with given text, then returns created task
     * @tags Tasks
     * @param {CreateTask} request.body.required - text
     * @return {Task} 200 - Successful response - application/json
     * @return {string} 422 - Bad request response
     */
    app.route("/tasks").get(controller.getAll).post(controller.create);

    /**
     * GET /tasks/completed
     * @summary Returns all completed tasks
     * @tags Tasks
     * @return {array<Task>} 200 - Successful response - application/json
     */
    app.route("/tasks/completed").get(controller.getCompleted);

    /**
     * POST /tasks/complete-all
     * @summary Completes all incomplete tasks
     * @tags Tasks
     * @return {object} 200 - Successful response - application/json
     */
    app.route("/tasks/complete-all").post(controller.completeAll);

    /**
     * DELETE /tasks/completed
     * @summary Deletes all completed tasks
     * @tags Tasks
     * @return {object} 200 - Successful response - application/json
     */
    app.route("/tasks/completed").delete(controller.deleteCompleted);

    /**
     * POST /tasks/{id}
     * @summary Updates text of given task, then returns modified task
     * @tags Tasks
     * @param {string} id.path.required - ID of task
     * @param {UpdateTask} request.body.required - text
     * @return {Task} 200 - Successful response - application/json
     * @return {string} 422 - Bad request
     */
    /**
     * DELETE /tasks/{id}
     * @summary Deletes given task
     * @tags Tasks
     * @param {string} id.path.required - ID of task
     * @return {string} 200 - Successful response
     * @return {string} 422 - Bad request
     * @return {string} 400 - ID of task was not found
     */
    app.route("/tasks/:id")
        .post(controller.updateText)
        .delete(controller.delete);

    /**
     * POST /tasks/{id}/complete
     * @summary Completes given task, then returns modified task
     * @tags Tasks
     * @param {string} id.path.required - ID of task
     * @return {Task} 200 - Successful response - application/json
     * @return {string} 422 - Bad request
     * @return {string} 400 - ID of task was not found
     */
    app.route("/tasks/:id/complete").post(controller.complete);

    /**
     * POST /tasks/{id}/incomplete
     * @summary Incompletes given task, then returns modified task
     * @tags Tasks
     * @param {string} id.path.required - ID of task
     * @return {Task} 200 - Successful response - application/json
     * @return {string} 422 - Bad request
     * @return {string} 400 - ID of task was not found
     */
    app.route("/tasks/:id/incomplete").post(controller.incomplete);
};
