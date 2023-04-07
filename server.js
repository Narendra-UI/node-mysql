const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*",

  methods: [      //these methods are for the data update from ui to server
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ssasasasa application." });
});

require("./app/routes/tutorial.routes.js")(app);      //registered postman URL for tutorial
require("./app/routes/employe.routes.js")(app);       //registered postman URL for employe
require("./app/routes/user.routes.js")(app);
require("./app/routes/role.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;                //localhost is running on the port number 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
