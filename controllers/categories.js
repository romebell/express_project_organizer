let express = require('express');
let db = require('../models');
let router = express.Router();

// Add to the view associated withe the POST /projects route, which allows the user to add categories to each individual project.
// Create the following routes for viewing categories and viewing projects by category:
// GET /categories - show all the categories that exist
// GET /categories/:id - show a specific category and all the projects with that category

router.get('/', (req, res) => {
    db.category.findAll()
    .then(categories => {
        res.render ('categories/show', { categories: categories })
    }).catch(err => {
        console.log(err, 'error')
    })
})


router.get('/:id', (req, res) => {
    db.category.findOne({
        where: { id: req.params.id },
        include: [db.project]
    }).then((categories) =>{
        res.render('categories/details', { category: categories })
    }).catch(err => {
        console.log(err, 'error')
    })
})



module.exports = router