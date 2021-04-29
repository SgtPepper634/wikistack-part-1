const express = require("express");
const router = express.Router();
const { Page } = require("../models");
const { addPage } = require("../views");

router.get("/", (req, res, next) => {
  res.send("got to GET /wiki");
  //res.redirect("/wiki");
});

router.post("/", async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  //const slug = (title) => title.replace(/\s+/g, '_').replace(/\W/g, '');
  try {
    const page = await Page.create({
      title: title,
      content: content,
      slug: slug(title),
    });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
  res.json(req.body);
});

router.get("/add", (req, res, next) => {
  const addPage = require("../views/addPage");
  res.send(addPage());
});

module.exports = router;
