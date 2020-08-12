let express = require("express");
let db = require("../models");
let router = express.Router();

router.get('/', (req, res) => {
    db.category.findAll(
    {
        include: [db.project]
    })
    .then(categories => 
    {
        res.render('categories/index', {category: categories});
    })
    .catch(err => 
    {
        console.log(err);
    })
})

router.get('/:id', (req, res) => 
{
    db.category.findOne(
    {
        where: 
        {
            id: req.params.id
        },
        include: [db.project]
    })
    .then(category => 
    {
        console.log(category.projects);
        res.render('categories/show', { category });
    })
    .catch(error => {
        console.log('Error', error)
    })
})

module.exports = router; 