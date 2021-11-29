const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
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
//const { isColString } = require("sequelize/types/lib/utils");
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
app.get("/api/getListByScore", (req, res) => {
  // const list = ["item1", "item2", "item3"];
  // res.json(list);

  connection.query(
    "SELECT * FROM hairshop order by score desc",
    function (err, rows, fields) {
      if (err) throw err;
      res.json(rows)
    }
  );
});

app.get("/api/getListByName", (req, res) => {
  // const list = ["item1", "item2", "item3"];
  // res.json(list);

  connection.query(
    "SELECT * FROM hairshop order by name",
    function (err, rows, fields) {
      if (err) throw err;
      res.json(rows)
    }
  );
});


app.get("/api/getListById", (req, res) => {
  // const list = ["item1", "item2", "item3"];
  // res.json(list);

  connection.query(
    "SELECT * FROM hairshop order by name",
    function (err, rows, fields) {
      if (err) throw err;
      res.json(rows)
    }
  );
});

// app.post("/api/getList", (req, res) => {
//   let sql = "SELECT * FROM reple_ ";

//   connection.query(sql, function (err, rows, result) {
//     //연결!
//     if (err) throw err;
//     else {
//       // console.log(rows);
//       // console.log(result);
//       res.send(rows);
//     }
//   });
// });


// An api endpoint for authentication
app.post("/api/signup", [body('firstName').not().isEmpty().trim().escape(), body('lastName').not().isEmpty().trim().escape(),
body('contact').not().isEmpty().trim().escape(), body('id').not().isEmpty().isEmail().normalizeEmail(),
body('pw').not().isEmpty().trim().escape(), body('pw2').not().isEmpty().trim().escape()], (req, res) => {
  const validation_error = validationResult(req);
  if (!validation_error.isEmpty())
    return res.status(200).json({ validation_error: validation_error.array() });
  const param = [req.body.firstName, req.body.lastName, req.body.contact, req.body.id, req.body.pw, req.body.pw2];

  // check password
  if (param[4] != param[5]) {
    return res.status(200).send({ password_error: 'signup failed' });
  }

  // duplicate check
  connection.query("SELECT * FROM user where LOGIN_ID=?", param[3], function (err, rows, fields) {
    if (err) throw err;

    if (rows.length == 0) { // no same user id
      // encryption for user password
      bcrypt.hash(param[4], salt, (error, hash) => {
        if (error) throw error;
        param[4] = hash;
        connection.query("INSERT INTO USER (`CUSTOMER_FIRST_NAME`, `CUSTOMER_LAST_NAME`, `CONTACT_NO`, `LOGIN_ID`, `LOGIN_PW`) VALUES (?, ?, ?, ?, ?)", param, function (err, rows, fields) {
          if (err) throw err;
          var token = jwt.sign({ id: param[3] }, 'secret-key', {
            expiresIn: 86400
          });
          res.status(200).send({
            accessToken: token,
            id: param[3]
          });
        });
        console.log('sign up new user');
      });
    }
    else {
      return res.status(200).send({ signup_error: 'signup failed' });
    }
  });
});
app.post('/api/login', [body('id').isEmail().normalizeEmail(), body('pw').not().isEmpty().trim().escape()], (req, res) => {
  const validation_error = validationResult(req);
  if (!validation_error.isEmpty())
    return res.status(200).json({ validation_error: validation_error.array() });
  const param = [req.body.id, req.body.pw];
  connection.query("SELECT * FROM user where LOGIN_ID=?", param[0], function (err, rows, fields) {
    if (err) throw err;
    // id exists
    if (rows.length > 0) {
      bcrypt.compare(param[1], rows[0].LOGIN_PW, (error, result) => {
        if (result) {
          console.log('Login success');
          var token = jwt.sign({ id: param[0] }, 'secret-key', {
            expiresIn: 86400
          });
          res.status(200).send({
            accessToken: token,
            login_id: rows[0].LOGIN_ID,
            customer_id: rows[0].CUSTOMER_ID
          });
        }
      })
    }
    else {
      res.status(200).send({ login_error: 'login failed' });
    }
  });
})
app.get("/api/mypage", (req, res) => {
  jwt.verify(req.headers['x-access-token'], 'secret-key', (err, decoded) => {
    if (err) throw err;
    connection.query("SELECT * FROM user where LOGIN_ID=?", decoded.id, function (err, rows) {
      if (err) throw err;
      else {
        res.send(rows);
      }
    });
  })
});

app.post("/api/review", (req, res) => {
  const param = [req.body.booking_id, req.body.customer_id, req.body.shop_id, req.body.booking_date,
  req.body.comment, req.body.rating];
  connection.query("INSERT INTO COMMENT (`BOOKING_ID`, `CUSTOMER_ID`, `SHOP_ID`, `BOOKING_DATE`, `COMMENT_TEXT`, `SCORE`) VALUES (?, ?, ?, ?, ?, ?)", param, function (err, rows, fields) {
    if (err) throw err;
  });
  res.send();
})

app.get("/api/getReview/", (req, res) => {
  connection.query(
    "SELECT * FROM comment join user using(customer_id) where SHOP_ID=?", req.query.shop_id,
    function (err, rows, fields) {
      if (err) throw err;
      res.json(rows)
    }
  );
})

app.post("/api/reservation", (req, res) => {
  let numRow = 0;
  connection.query("SELECT COUNT(*) FROM BOOKING", function (err, rows, fields) {
    numRow = Object.values(JSON.parse(JSON.stringify(rows)));
    console.log(numRow);
  }
  );

  const temp = new Date().toISOString().slice(0, 10);

  const param = [numRow + 2, req.body.customer_id, req.body.shop_id, req.body.booking_date, req.body.description];
  connection.query("INSERT INTO BOOKING (`BOOKING_ID`, `CUSTOMER_ID`, `SHOP_ID`, `BOOKING_DATE`, `DESCRIPTION`) VALUES (?, ?, ?, ?,?)", param, function (err, rows, fields) {
    if (err) throw err;
  });
  res.send();
})


app.listen(8001, () => {
  console.log(`listening on port ${8001}`);
})