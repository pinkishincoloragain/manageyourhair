const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
var jwt = require("jsonwebtoken");
const salt = 10;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(cookieParser());
app.use(
  session({
    key: "login", // 분리할 것
    secret: "Secret", // 분리할 것
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8001"],
  credentials: true, //access-control-allow-credentials:true
};
app.use(cors(corsOptions));

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
const { json } = require("body-parser");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "COLCTveCNfY8",
  password: "root",
  database: "manager",
  //  socketPath may differ from the default path
  socketPath: "/tmp/mysql.sock",
});

//connection.connect();

connection.query("USE MANAGER", function (err, rows, fields) {
  if (err) throw err;
  console.log("Now using MANAGER account ");
});

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
  const list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("sent list of items");

  const list = connection.query(
    "SELECT * FROM hairshopF",
    function (err, rows, fields) {
      if (err) throw err;
      console.log("get list of items");
    }
  );
});

// An api endpoint for authentication
app.post("/api/signup", (req, res) => {
  const param = [
    req.body.firstName,
    req.body.lastName,
    req.body.contact,
    req.body.id,
    req.body.pw,
  ];
  // encryption for user password
  bcrypt.hash(param[4], salt, (error, hash) => {
    if (error) throw error;
    param[4] = hash;
    connection.query(
      "INSERT INTO USER (`CUSTOMER_FIRST_NAME`, `CUSTOMER_LAST_NAME`, `CONTACT_NO`, `LOGIN_ID`, `LOGIN_PW`) VALUES (?, ?, ?, ?, ?)",
      param,
      function (err, rows, fields) {
        if (err) throw err;
        console.log("sign up new user");
      }
    );
  });
  res.end();
});

app.post("/api/login", (req, res) => {
  const param = [req.body.id, req.body.pw];
  connection.query(
    "SELECT * FROM user where LOGIN_ID=?",
    param[0],
    function (err, rows, fields) {
      if (err) throw err;
      // id exists
      if (rows.length > 0) {
        bcrypt.compare(param[1], rows[0].LOGIN_PW, (error, result) => {
          if (result) {
            console.log("Login success");
          } else console.log("Login fail");
        });
      } else {
        console.log("Login fail");
      }
    }
  );
  var token = jwt.sign({ id: param[0] }, "secret-key", {
    expiresIn: 86400,
  });
  res.status(200).send({
    accessToken: token,
  });
  res.end();
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

//connection.end();
