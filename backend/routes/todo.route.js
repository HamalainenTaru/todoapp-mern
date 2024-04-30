const express = require("express");

const controller = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", controller.getAllTodosByUser);
router.post("/", controller.createTodo);
router.get("/:id", controller.getTodoById);
router.put("/complete/:id", controller.markTodoAsComplited);
router.put("/update/:id", controller.updateTodo);

router.delete("/:id", controller.deleteTodo);

module.exports = router;
