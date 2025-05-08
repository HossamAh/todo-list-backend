const express = require('express');
const path = require('path');
const Ajv = require('ajv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'))
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://todo-list-app-kohl-kappa.vercel.app'], // Replace with your frontend URL
    credentials: true,
}));


//import todos routes
const todosRoutes = require('./routes/TodoRoutes');
const userRoutes = require('./routes/UserRoutes');
const authRoutes = require('./routes/authRoutes');

const port = process.env.PORT||3010;

app.use('/api/todos',todosRoutes);
app.use('/api/user',userRoutes);
app.use('/api',authRoutes);

mongoose.connect(process.env.mongodb)
.then(()=>console.log("db is connected"))
.catch((err)=>console.log(err));
app.listen(port,()=>console.log(`express server is listening on port ${port} now... `));


