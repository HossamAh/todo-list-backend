const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/TodosController');
const paramIdMiddleware = require('../middlewares/paramId');
const TodoValidatorMiddleware = require("../middlewares/TodoValidatorMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("",authMiddleware,TodosController.getAllTodos);

router.get("/week",authMiddleware,TodosController.getTodosCurrentWeek);
router.get("/today",authMiddleware,TodosController.getTodosToday);
router.get("/overdue",authMiddleware,TodosController.getTodosoverdue);

//parameter middleware for id
router.param("id",paramIdMiddleware);

router.delete("/:id",authMiddleware,TodosController.deleteTodo);

//update (put is for full update but patch is partial update) 
router.put("/:id",authMiddleware,TodosController.updateTodo);
router.get('/:id',authMiddleware,TodosController.getTodo);


router.post("",authMiddleware,TodoValidatorMiddleware,TodosController.addTodo);

//export router to be used in the other module
module.exports=router;