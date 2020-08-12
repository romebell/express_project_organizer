console.log('catagories connected')

let express = require("express");
let db = require("../models");
let router = express.Router();

// POST /projects - create a new project
router.get("/:id", (req, res) => {
  db.catagories.findOrCreate({
     where: {id: req.params.id }
    })
    .then(([category, created]) => {
      console.log("category created", created);
    
    })
    .catch((err) => {
      console.log('error in catagories.js',err);
    });
    res.render("/catagories/show")
});




module.exports = router;
