const express = require("express");
const app = express();
const mongoose=require("mongoose");
const uri=require("./config/keys").uri;

app.use(express.json());

//////////////// routers///////////
const users=require("./routers/api/users");
// console.log(users);




////database connection.........../////////////////////////////////////
// const uri ="mongodb+srv://social:social@cluster0.ijoxm.mongodb.net/grootedb?retryWrites=true&w=majority"

mongoose.connect(uri,{ useUnifiedTopology: true })
const connection=mongoose.connection;

connection.once("open",()=>{
    console.log("MongoDB database connection established successfully");

})
////////////////////////////////////DB connection end////////////////////////////////

app.use("/api/users",users);
// app.use("/api/profile",profile);
// app.use("/api/posts",posts);



app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log("server start at 3000");
});

