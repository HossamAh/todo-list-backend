const express = require('express');
const path = require('path');
const Ajv = require('ajv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
}));


//import todos routes
const todosRoutes = require('./routes/TodoRoutes');

const port = process.env.PORT||3010;

app.use('/api/todos',todosRoutes);
mongoose.connect(process.env.mongodb)
.then(()=>console.log("db is connected"))
.catch((err)=>console.log(err));
app.listen(port,()=>console.log(`express server is listening on port ${port} now... `));


