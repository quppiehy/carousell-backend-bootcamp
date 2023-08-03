const cors = require("cors");
const express = require("express");
require("dotenv").config();

// importing DB
const db = require("./db/models/index");
const { listing, user } = db;

// import middlewares
const jwtCheck = require("./middlewares/jwtCheck");

// importing Controllers
const ListingsController = require("./controllers/listingsController");

// initializing Controllers -> note the lowercase for the first word
const listingsController = new ListingsController(listing, user);

// importing Routers
const ListingsRouter = require("./routers/listingsRouter");

// initialize Routers
const listingsRouter = new ListingsRouter(listingsController, jwtCheck);

// declare port to listen to and initialise Express
const PORT = process.env.PORT;
const app = express();
// Enable CORS access to this server
const corsOptions = {
  origin: process.env.REACT_APP_CORS_OPTIONS,
};
app.use(cors(corsOptions));
// Enable reading JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable and use router
app.use("/listings", listingsRouter.routes());
// app.get("/authorized", function (req, res) {
//   res.send("Secured Resource");
// });

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
