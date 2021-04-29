const express = require("express");
const morgan = require("morgan");
const main = require("./views/main.js");
const app = express();
const { db, Page, User } = require("./models");
const wiki = require("./routes/wiki");
const users = require("./routes/users");

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/wiki", wiki);
//app.use("/users", users);

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res, next) => {
  //res.send(main(""));
  res.redirect("/wiki");
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
