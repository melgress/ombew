const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
var app = express();
var cors = require("cors");

//Configuring express server
app.use(bodyparser.json());
app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "essen",
  password: "essen",
  database: "essen",
});

con.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});

//Creating GET Router to fetch all the learner details from the MySQL Database
app.get("/essen", (req, res) => {
  con.query("SELECT * FROM essen", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Router to GET specific learner detail from the MySQL database
app.get("/essen/:id", (req, res) => {
  con.query(
    "SELECT * FROM essen WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});
//route for insert data
app.post("/addEssen", (req, res) => {
  let data = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  let sql = "INSERT INTO essen SET ?";
  let query = con.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/essen");
  });
});

app.put("/essen/:id", function (req, res) {
  let data = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  console.log("Put received");
  con.query(
    "UPDATE essen SET ? WHERE id = ?",
    [data, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err.message);
        throw err;
      }
      res.send(data);
    }
  );
});

app.delete("/essen/:id", (req, res) => {
  con.query(
    "DELETE FROM essen WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) console.log("Essen deleted successfully.");
      else console.log(err);
    }
  );
});

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
