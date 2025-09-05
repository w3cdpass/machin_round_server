const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path')

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.set('view engine', "ejs");
app.set('views', path.resolve('./views'));


mongoose.connect("mongodb://localhost:27017/todo").then(() =>
    console.log("DataBase Connected")
).catch(() => console.log("Connection failed to DataBase"));
const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");
const tests = require('./routes/test.routes')
const fileRoutes = require('./routes/file.routes')
app.get('/', (req, res) => {
    return res.render('homepage')
})
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/test", tests)
app.use('/files', fileRoutes);
app.use('/static', express.static('uploads'))
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
