let express = require("express");
let db = require("../models");
let router = express.Router();

router.get('/', (req, res) => {
    db.category.findAll()
    .then(category => {
        res.render('categories/categories', {category: category})
    })
    .catch(error => {
        console.log('Error', error)
    })
})

router.get('/:id', (req, res) => {
    db.category.findOne({
        where: {
            id: req.params.id
        },
        include: [db.project]
    })
    .then(category => {
        console.log(category.projects)
        res.render('categories/show', {category: category })
    })
    .catch(error => {
        console.log('Error', error)
    })
})