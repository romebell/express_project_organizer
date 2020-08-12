let express = require('express')
let db = require('../models')
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
      where: { category: req.body.category }
    })
    .then(([category, created]) => {
      project.addCategory(category)
      console.log("New Category Added:", created)
      res.redirect('/')
    })
    .catch(err => {
      console.log("Error:", err)
    })

  })
  .catch((error) => {
    console.log("Error:", error)
    res.status(400).render('main/404')
  })
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

router.get('/edit/:id', (req, res) => {
  db.project.findOne({
    where: {
      id: req.params.id
    },
    include: { model: db.category }
  })
  .then(project => {
    res.render('projects/edit', { project: project })
  })
  .catch(err => {
    console.log("Error:", err)
    res.status(400).render('main/404')
  })
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id },
    include: { model: db.category, as: "categories" }
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

router.put('/:id', (req, res) => {
  db.project.update({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  },
  {
    where: { id: req.params.id }
  })
  .then(() => {
    res.redirect(`/projects/${req.params.id}`)
  })
  .catch(err => {
    res.status(400).render('main/404')
  })
})

router.delete('/:id', (req, res) => {
  db.project.destroy({
    where: {
      id: req.body.id
    }
  })
  .then(() => {
    res.redirect('/')
  })
})

module.exports = router
