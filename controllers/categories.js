
const express = require('express');
const db = require('../models');
const router = express.Router();


router.post('/', (req,res)=> {
    db.category.findOrCreate({
        where: {name: req.body.name}
    })
    .then(([category,created])=> {
        res.redirect('/categories/new');
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})

router.get('/new', (req, res) => {
    db.category.findAll()
    .then((category) => {
        res.render('categories/new', { categories: category })
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})


router.get('/:id',(req,res)=> {
    db.category.findOne({
        where: {id: req.params.id}
    },
    {include: [db.project]})
    .then((category)=> {
        category.getProjects()
        .then(project => {
            res.render('projects/projectsList', {projects: project})
        })
        .catch((error) => {
            res.status(400).render('main/404')
        })
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})


module.exports = router;