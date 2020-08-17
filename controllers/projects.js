let express = require("express");
let db = require("../models");
let router = express.Router();

// POST /projects - create a new project

router.post("/", (req, res) => {
  //creating the project
  db.project.create({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployLink,
      description: req.body.desction,
    })
    //take the project we create either find or create the catagori iteself in its own table

    .then((project) => {
      db.category.findOrCreate({
          where: { name: req.body.category },
        })
        //.then looks for an array and knos what element 0 or 1 is a boolen
        //assocate project with the category
        .then(([category, created]) => {
          console.log(created);
          console.log("new category^^^^^");
          project.addCategory(category)
          .then(() => {
            res.redirect("/");
          });
        })
      })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});

// GET /projects/new - display form for creating a new project
router.get("/new", (req, res) => {
  res.render("projects/new");
});

// GET /projects/:id - display a specific project
router.get("/:id", (req, res) => {
  db.project
    .findOne({
      where: { id: req.params.id },
    })
    .then((project) => {
      if (!project) throw Error();
      res.render("projects/show", { project: project });
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});

module.exports = router;
