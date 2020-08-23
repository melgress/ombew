const express = require("express");
const db = require("../db.js");
const routerEssen = express.Router();

//Creating GET Router to fetch all the learner details from the MySQL Database
routerEssen.get("/essen", (req, res) => {
  db.query("SELECT * FROM essen", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Router to GET specific learner detail from the MySQL database
routerEssen.get("/essen/:id", (req, res) => {
  db.query(
    "SELECT * FROM essen WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});
//route for insert data
routerEssen.post("/addEssen", (req, res) => {
  let data = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  let sql = "INSERT INTO essen SET ?";
  db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/api/essen");
  });
});

routerEssen.put("/essen/:id", function (req, res) {
  let data = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  console.log("Put received");
  db.query(
    "UPDATE essen SET ? WHERE id = ?",
    [data, req.params.id],
    (err, result) => {
      if (err) {
        console.log(err.message);
        throw err;
      }
      res.send(data);
      //res.redirect("/api/essen");
    }
  );
});

routerEssen.delete("/essen/:id", (req, res) => {
  db.query(
    "DELETE FROM essen WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        console.log("Essen deleted successfully.");
        res.redirect("/api/essen");
      } else console.log(err);
    }
  );
});

module.exports = routerEssen;
