const express = require('express');
const taskServices = require("./taskService");

const router = express.Router();

router.get('/', taskServices.getTasks);
router.post("/new", taskServices.createTask);
router.put("/edit/:id", taskServices.updateTask);
router.delete("/delete/:id", taskServices.deleteTask);


module.exports = router;