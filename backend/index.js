//Unsere Einstiegsdatei ist die index.js und beinhaltet das Starten unsere Webservers und
//die Einbindung der Routen, die wir in der Datei routes/router.js definieren.

const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
//const cors = require("cors");
// set up port
const PORT = process.env.PORT || 9000;
app.use(bodyParser.json());
app.use(cors());
/*app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});*/
/*app.use(cors({
    origin: 'http://localhost:3000'
  }));*/
// add routes
const routerUser = require("./routes/routerUser.js");
const routerEssen = require("./routes/routerEssen.js");
app.use("/api", routerUser);
app.use("/api", routerEssen);
// run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
