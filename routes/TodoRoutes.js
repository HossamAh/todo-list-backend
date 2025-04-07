const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/TodosController');
const paramIdMiddleware = require('../middlewares/paramId');
const TodoValidatorMiddleware = require("../middlewares/TodoValidatorMiddleware");
router.get("",TodosController.getAllTodos);

//parameter middleware for id
router.param("id",paramIdMiddleware);

router.delete("/:id",TodosController.deleteTodo);

//update (put is for full update but patch is partial update) 
router.put("/:id",TodosController.updateTodo);
router.get('/:id',TodosController.getTodo);


router.post("",TodoValidatorMiddleware,TodosController.addTodo);

//export router to be used in the other module
module.exports=router;