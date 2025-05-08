let TodoModel = require("../models/TodosModel");
const getAllTodos = async (req, res) => {
  let Todos = await TodoModel.find({ user: req.user.usrid });
  res.send(Todos);
};

const getTodosToday = async (req, res) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let Todos = await TodoModel.find({
    user: req.user.usrid,
    deadline: { $gte: today, $lt: tomorrow }
  });
  res.send(Todos);
};

const getTodosCurrentWeek = async (req, res) => {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  let Todos = await TodoModel.find({
    user: req.user.usrid,
    deadline: { $gte: today, $lt: nextWeek }
  });
  res.send(Todos);
};

const getTodosoverdue = async (req, res) => {
  let Todos = await TodoModel.find({
    user: req.user.usrid,
    deadline: { $lte: Date.now() },
    completed: false,
  });
  res.send(Todos);
};

const addTodo = (req, res) => {
  console.log(req.body);
  req.body = { ...req.body, user: req.user.usrid };
  let Todo = new TodoModel({ ...req.body, registeredAt: Date.now() });
  console.log(Todo);
  Todo.save()
    .then(() => {
      console.log("Todo is added");
      res.status(201).json(Todo);
    })
    .catch((err) => {
      console.log(err);
      res.status(403).send(err);
    });
};

const deleteTodo = async (req, res) => {
  let id = req.params.id;
  let Todo = await TodoModel.findByIdAndDelete(id);
  if (Todo) {
    res.json(Todo);
  } else {
    res.send(404).send("id is not found. Update is not allowed");
  }
};

const updateTodo = async (req, res) => {
  let id = req.params.id;
  let Todo = await TodoModel.findByIdAndUpdate(id, req.body, {
    returnOriginal: false,
  });
  if (Todo) {
    res.json(Todo);
  } else {
    res.send(404).send("id is not found. Update is not allowed");
  }
};

const getTodo = async (req, res) => {
  let Todo = await Todo.findById(req.params.id);
  if (Todo) {
    res.status(200).json(Todo);
  } else {
    res.status(404).send("Todo not found");
  }
};

module.exports = {
  getAllTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  getTodo,
  getTodosToday,
  getTodosCurrentWeek,
  getTodosoverdue,
};
