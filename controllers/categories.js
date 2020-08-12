let express = require("express");
let db = require("../models");
let router = express.Router();

// GET / categories - getting categories
router.get("/", (req, res) => {
  db.category.findAll().then((response) => {
    res.render("categories/index", { categories: response });
  });
});

// GET /categories/:id - getting categories by id
router.get("/:id", (req, res) => {
  db.category.findByPk(req.params.id).then((category) => {
    category.getProjects().then((projects) => {
      res.render("categories/show", { earth: projects, flower: category });
    });
  });
});

module.exports = router;
