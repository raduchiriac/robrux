require("rootpath")();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");

const app = express();
app.use(errorHandler);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

app.use("/users", require("./users/user.controller"));
app.use("/gigs", require("./gigs/gig.controller"));
app.use("/graphql", require("./_graphql"));

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, function() {
  console.log("Server listening on port " + port);
});
