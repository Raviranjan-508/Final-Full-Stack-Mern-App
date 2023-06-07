const express = require('express');
const { userController } = require('./routes/user.route');
const { connection } = require('./config/db');
const { notesController } = require('./routes/notes.route');
const { authentication } = require('./middlewares/authentication');
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.send("Welcome to Note App");
})

app.use("/user" , userController);
app.use(authentication);
app.use("/notes", notesController);


app.listen(PORT , async() => {
    try {
        await connection
        console.log("You are connected through DB successfully")
       } catch (error) {
        console.log("Something went wrong, while connecting to DB", error);
       }
       console.log("DB is connected successfully")
})