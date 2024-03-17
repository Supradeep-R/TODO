const express = require("express");
const path = require("path");

const cors = require("cors");
const app = express();
const port = 5000;
const mongoDB = require("./db");
const UserRoutes = require("./routes/UserRoutes");
const TodoRoutes = require("./routes/TodoRoutes");
mongoDB();

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("this is home page");
});

// User authentication routes
app.use("/user", UserRoutes);
// Todo routes
app.use("/todo", TodoRoutes);

app.listen(port, () => {
  console.log(`Server started listening at port : ${port}`);
});
