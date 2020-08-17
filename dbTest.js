var db = require('./models')
var async = require('async')
// Create a category: Category model must exist and be migrated

// db.category.create({
//   name: 'node'
// }).then(function(category) {
//   console.log(category.get())
// })

// Create a project and use the helper function create<ModelName> to create a category
// Requires categoriesProjects to exist, be migrated, and properly associated

// var cats = ['node', 'javascript', 'react', 'css', 'html']

// db.project.create({
//   name: 'PROJECT TWO',
//   deployLink: 'http://github.com/brandiw',
//   githubLink: 'http://github.com/brandiw',
//   description: 'This was a game'
// }).then(function(project) {
//   // IMPROVED VERSION WITH ASYNC
//   // async.forEach(arrayToIterate, iteratorFunctionToRunOnEachItem(item, callback), functionToRunWhenAllComplete)
//   async.forEach(cats, (cat, done) => {
//     db.category.findOrCreate({
//       where: { name: cat }
//     })
//     .spread((category, wasCreated) => {
//       project.addCategory(category)
//       .then(() => {
//         // res.redirect, or whatevs
//         console.log('done adding', cat)
//         done()
//       })
//     })
//   }, () => {
//     console.log('EVERYTHING is done. Now redirect or something')
//   })





  // TIMING DOESNOT WORK
  // cats.forEach((cat) => {
  //   db.category.findOrCreate({
  //     where: { name: cat }
  //   })
  //   .spread((category, wasCreated) => {
  //     project.addCategory(category)
  //     .then(() => {
  //       // res.redirect, or whatevs
  //       console.log('done adding', cat)
  //     })
  //   })
  // })
  // console.log('redirect or something')
// })

// db.category.findOrCreate({
//   where: {name: 'node'}
// })
// //making an array and pass in the category and create it
// .then(([category, created])=>{
//   console.log(`This was created: ${created}`)
//   console.log(category.get())
// })
// .catch(err =>{
//   console.log('Error', err)
// })

// db.project.findOrCreate({
//   where: {name: 'Project Organizer'},
//   defaults: {githubLink: 'https://github.com/chamon562/express_project_organizer',
//   deployLink: 'https://github.com/chamon562/express_project_organizer',
//   description: 'This is a project wehre we use express to organize'
//   }
// })
// .then(([project, created])=>{
//   console.log(created)
//   db.category.findOrCreate({
//     where: {name: 'node'}
//   })
//   .then(([category, created]) =>{
//     console.ong(created)
//     //to add associate them together
//     project.addCategory(category)
//     .then(newRelation =>{
//       console.log('new Relation')
//       console.log(newRelation)
//     })

//     .catch(err=>{
//       console.log(err)
//     })
    
//   })
//   .catch(err=>{
//     console.log(err)
//   })
  
  
// })
// .catch(err=>{
//   console.log(err)
// })


db.project.findOrCreate({
  where: { name: 'Main Project Organizer' },
  defaults: { 
    githubLink: 'https://github.com/romebell/express_project_organizer',
    deployLink: 'https://github.com/romebell/express_project_organizer',
    description: 'This is a project where Rome uses express to organize.'
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