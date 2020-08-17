let express = require("express");
let db = require("../models");
const category = require("../models/category");
let router = express.Router();

router.get('/', (req, res)=>{
    db.category.findAll()
    .then(categories =>{
        res.render('categories/index', {categories:categories})
    }).catch(err =>{console.log(err)})
})




module.exports = router