

let express = require("express");
let db = require("../models");
let router = express.Router();

// POST /projects - create a new project
router.post("/", (req, res) => {
  db.catagory.findOrCreate({
      where: { name: req.body.name },
    })
    .then(([category, created]) => {
      console.log("category created", created);
      project.addCategory(category);
    })
    .catch((err) => {
      console.log(err);
    });
    res.render("catagories/show")
});




module.exports = router;
