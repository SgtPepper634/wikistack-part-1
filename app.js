const express = require("express");
const morgan = require("morgan");
const main = require("./views/main.js");
const app = express();
const { db, Page, User } = require("./models");

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  res.send(main(""));
});

const PORT = 1337;

const init = async () => {
  await db.sync({ force: true });
  // make sure that you have a PORT constant
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();

// app.listen(PORT, () => {
//   console.log(`app listening in PORT ${PORT}`);
// });
