let express = require('express')
let db = require('../models')
// const { where } = require('sequelize/types')
let router = express.Router()


// POST /projects - create a new project
router.post('/', (req, res) => {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project) => {
    db.category.findOrCreate({
      where: {name: req.body.category}
    })
    .then(([category, created]) => {
      console.log('new category')
      console.log(created)
      project.addCategory(category)
        res.redirect('/')
      })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})


router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error() 
    db.category.findByPk(req.params.id, {
      include: {model: db.project}
    })
    .then((category) => {
      res.render('projects/show', { project: project, category: category })
    })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

router.delete('/:id', (req, res) => {
  db.categories_projects.destroy ({
    where: {projectId: req.params.id}
  })
  .then(() => {
    db.project.destroy({ 
    where: {id: req.params.id}
    })
    .then(destroyedProject => {
      res.redirect('/')
    })
  })
})

module.exports = router
