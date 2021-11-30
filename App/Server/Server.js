const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const salt = 10;

const app = express();
const multer = require('multer')
const path = require('path');



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

let mysql = require("mysql");
const { json } = require("body-parser");
//const { isColString } = require("sequelize/types/lib/utils");
let connection = mysql.createConnection({
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
// sign-up
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
          let token = jwt.sign({ id: param[3] }, 'secret-key', {
            expiresIn: 86400
          });
          res.status(200).send({
            accessToken: token,
            id: param[3],
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
// sign-in
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
          let token = jwt.sign({ id: param[0] }, 'secret-key', {
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

app.get("/api/myphoto", (req, res) => {
  jwt.verify(req.headers['x-access-token'], 'secret-key', (err, decoded) => {
    if (err) throw err;
    connection.query("SELECT PHOTO_LINK FROM user where LOGIN_ID=?", decoded.id, function (err, rows) {
      if (err) throw err;
      else {


        const image = `user_photos/${rows[0].PHOTO_LINK}`;
        res.send(image);
        console.log(typeof (image), image);
        // console.log(path.join(__dirname, filepath));

      }
    });
  })
});

app.get("/api/mypage", (req, res) => {
  // token verification
  jwt.verify(req.headers['x-access-token'], 'secret-key', (err, decoded) => {
    if (err) throw err;
    connection.query("SELECT * FROM user where LOGIN_ID=?", decoded.id, function (err, rows) {
      if (err) throw err;
      else {
        res.send(rows);
        // console.log("rows", rows);
      }
    });
  })
});





const storage = multer.diskStorage({
  destination: path.join(__dirname, '../Client/src/assets/user_photos'),
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
})

app.post('/api/user_upload', async (req, res) => {
  try {
    // 'avatar' is the name of our file input field in the HTML form

    let upload = multer({ storage: storage }).single('photo');

    upload(req, res, function (err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields

      if (!req.file) {
        console.log('Please select an image to upload');
        return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
        console.log('multererror');
        return res.send(err);
      }
      else if (err) {
        console.log('error');
        return res.send(err);
      }
      console.log("req.body: ", req.body.id);
      const param = [
        req.file.filename,
        req.body.id
      ];

      const sql = "UPDATE USER SET PHOTO_LINK= ? WHERE CUSTOMER_ID = ?";
      console.log(param);
      connection.query(sql, param, (err, rows, results) => {
        if (err) throw err;
        console.log(rows);
        res.json({ success: 1 })
      });
    });

  } catch (err) { console.log(err) }
})

// app.post("/api/user_upload", (req, res) => {
//   const query = "UPDATE USER SET PHOTO_LINK= ? WHERE CUSTOMER_ID = ?";
//   const photo = req.body.photo;
//   const param = [readImageFile(photo), req.body.user_id];
//   connection.query(query, param, function (err, rows, fields) {
//     if (err) throw err;
//     console.log(rows)
//     res.json(rows)
//   });
// })

// An api endpoint for review CRUD
// Create
app.post("/api/review", [body('comment').trim().escape()], (req, res) => {
  connection.query("SELECT customer_id from USER where LOGIN_ID=?", req.body.id, function (err, rows, fields){
    if (err) throw err;
    const param = [req.body.booking_id, rows[0].customer_id, req.body.shop_id, req.body.booking_date, req.body.comment, req.body.rating];
    connection.query("INSERT INTO COMMENT (`BOOKING_ID`, `CUSTOMER_ID`, `SHOP_ID`, `BOOKING_DATE`, `COMMENT_TEXT`, `SCORE`) VALUES (?, ?, ?, ?, ?, ?)", param, function (err, rows, fields) {
      if (err) throw err;
      console.log(rows)
      res.json(rows)
    });
  })
})

// Read
app.get("/api/review/:id", (req, res) => {
  connection.query(
    "SELECT booking_id as booking_id, shop_id as shop_id, hairshop.name as name, comment.score as score, comment_text as comment_text FROM comment join hairshop using(shop_id) where COMMENT_ID=?", req.params.id,
    function (err, rows, fields) {
      if (err) throw err;
      res.json(rows)
    }
  );
})
// Update
app.put('/api/review/:id', (req, res) => {
  const param = [req.body.rating, req.body.comment, req.params.id];
  connection.query("UPDATE comment set score=?, comment_text=? where COMMENT_ID=?", param,
    function (err, rows, fields) {
      if (err) throw err;
      res.json(rows);
    });
})
// Delete
app.delete('/api/review/:id', (req, res) => {
  connection.query("delete from comment where COMMENT_ID=?", req.params.id,
    function (err, rows, fields) {
      if (err) throw err;
      res.send();
    });
})

// An api endpoint for getting all Review for each Shop
app.get("/api/getReview/", (req, res) => {
  connection.query(
    "SELECT * FROM comment join user using(customer_id) where SHOP_ID=?", req.query.shop_id,
    function (err, rows, fields) {
      if (err) throw err;
      res.json(rows)
    }
  );
})

// An api endpoint for user Booking
app.get("/api/myBooking", (req, res) => {
  jwt.verify(req.headers['x-access-token'], 'secret-key', (err, decoded) => {
    if (err) throw err;
    connection.query(
      "SELECT customer_id from user where login_id=?", decoded.id, function (err, idValue, fields) {
        if (err) throw err;
        connection.query(
          "SELECT * from BOOKING join HAIRSHOP using(shop_id) where customer_id=? order by -shop_id;", idValue[0].customer_id,
          function (err, rows, fields) {
            if (err) throw err;
            res.json(rows)
          }
        );
      }
    )
  })
})
// An api endpoint for user Review
app.get("/api/myReview", (req, res) => {
  jwt.verify(req.headers['x-access-token'], 'secret-key', (err, decoded) => {
    if (err) throw err;
    connection.query(
      "SELECT customer_id from user where login_id=?", decoded.id, function(err, idValue, fields) {
        if (err) throw err;
        connection.query(
          "SELECT * from COMMENT join HAIRSHOP using(shop_id) where customer_id=? order by -comment_id;", idValue[0].customer_id,
          function (err, rows, fields) {
            if (err) throw err;
            res.json(rows)
          }
        );
      }
    )
  })
})

// An api endpoint for verification
// check whether booking exists
app.get("/api/checkBooking/:shop_id", (req, res) => {
  jwt.verify(req.headers['x-access-token'], 'secret-key', (err, decoded) => {
    if (err) throw err;
    connection.query(
      "SELECT customer_id from user where login_id=?", decoded.id, function(err, idValue, fields) {
        if (err) throw err;
        const param = [idValue[0].customer_id, req.params.shop_id]
        connection.query(
          "SELECT booking_id from BOOKING where customer_id=? and shop_id=?", param,
          function (err, rows, fields) {
            if (err) throw err;
            res.json(rows)
          }
        );
      }
    )
  })
})
// check duplication of review
app.get("/api/checkComment/:booking_id", (req, res) => {
  connection.query("SELECT count(*) as count from COMMENT where booking_id=?", req.params.booking_id,
  function (err, rows, field) {
    if (err) throw err;
    res.json(rows)
  })
})

// An api endpoint for Reservation
// Create
app.post("/api/reservation", (req, res) => {
  jwt.verify(req.headers['x-access-token'], 'secret-key', (err, decoded) => {
    if (err) throw err;
    connection.query("SELECT customer_id from user where login_id=?", decoded.id, function(err, row, fields){
      if (err) throw err;
      const param = [row[0].customer_id, req.body.shop_id, req.body.booking_date, req.body.description];
      connection.query("INSERT INTO BOOKING (`CUSTOMER_ID`, `SHOP_ID`, `BOOKING_DATE`, `DESCRIPTION`) VALUES (?, ?, ?, ?)", param, function (err, row, fields) {
        if (err) throw err;
        res.send(row);
  })
    })
})
});

app.listen(8001, () => {
  console.log(`listening on port ${8001}`);
})