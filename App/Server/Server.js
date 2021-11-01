const express = require("express");

const app = express();

// middleware for allowing react to fetch() from server
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS");
  next();
});

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});

connection.connect();

connection.query("USE MANAGER", function (err, rows, fields) {
  if (err) throw err;
  console.log("Now using MANAGER account ");
});

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
  const list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("sent list of items");
});

app.listen(8001, () => {
  console.log(`listening on port ${8001}`);
});

// An api endpoint that returns login info
// app.get("/api/Login", (req, res) => {
//   res.json(list);

//   // 

//   connection.query()

// });

// app.listen(8123, () => {
//   console.log(`listening on port ${8123}`);
// });

// mysql part

// connection.query("SELECT 1 + 1 AS solution", function (err, rows, fields) {
//   if (err) throw err;
//   console.log("The solution is: ", rows[0].solution);
// });

connection.end();
