let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  db.project.findOrCreate({
    where: { name: req.body.name },
    defaults: { 
      githubLink: req.body.githubLink,
      deployLink: req.body.deployLink,
      description: req.body.desction
    }
  })
  .then(([project, created]) => {
     console.log('project created',created);
     db.category.findOrCreate({
       where: { name: 'node' }
     })
     .then(([category, created]) => {
        console.log('category created',created);
        project.addCategory(category)
        .then(newRelationship => {
          console.log('New Relationship');
          console.log(newRelationship);
        })
        .catch(err => {
          console.log(err);
        });
     })
     .catch(err => {
       console.log(err);
     })
  })
  .catch(err => {
    console.log('Error', err);
  });
    res.redirect('/')
  })
  

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  
  res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

module.exports = router
