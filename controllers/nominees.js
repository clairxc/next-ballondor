const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
const req = require('express/lib/request')
const methodOverride = require('method-override')
require('dotenv').config() // this is so that our .process.env.SECRET works

// router.get('/', (req, res) => {
//   res.send('Hello nominees!')
// })

// GET /nominees - read/return a page with all nominees 
router.get('/', async (req, res) => {
  if (res.locals.user) {
    // TODO: Get all records from the DB and render to view
    try {
      const allNominees = await res.locals.user.getNominees()
      console.log('lksdjflkasjdflkajsdlkfjalskdjf')
      console.log(allNominees)
      // res.json(allNominees) -- would use this if we were only trying to get the data back
      res.render('nominees/nominees.ejs', { 
        // res.render would "display" the data vs res.json which just gives the raw data
        nominees: allNominees
      })
    } catch (error) {
      res.status(400).render('main/404.ejs')
    }
  }
    // res.send('Render a page of nominees here');
  });

// // try this if the above doesn't work
// router.get('/', async (req, res) => {
//   try {
//     const allNominees = await db.nominee.findAll()
//     res.render(allNominees)
//   } catch (err) {
//     console.log(err)
//   }
// })


// POST route that will receive the name of player and add it to nominee db and redirect to /nominees
router.post('/', async (req, res) => {
  if (res.locals.user) {
    try{
      const [nominee, nomineeCreated] = await db.nominee.findOrCreate({
        where: {
          name: req.body.name,
          team: req.body.team
        },
      })
      nominee.addUser(res.locals.user)
      const localUser = res.locals.user
      console.log(nominee,'is this thing working')
      // await localUser.addNominee(nominee)
      res.redirect('/user/nominees') // this should redirect back to nominees route
    } catch (error) {
      res.status(400).render('main/404.ejs')
    }
  } else {
    res.redirect('/users/login')
  }
})


// GET nominee details (should display same information as playerdetails.ejs)
router.get("/:nomineeId", async (req, res) => {
  const user = res.locals.user
  const comment = await db.note.findAll({
    where: {
      nomineeId: req.params.nomineeId
    }
  })
  const nominee = await db.nominee.findByPk(req.params.nomineeId)
  // console.log(nominee)

  const url = `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_API_KEY}/searchplayers.php?p=${nominee.name}`;
  console.log(url)
  axios.get(url).then((response) => {
    console.log(response.data.player)
    const details = response.data.player[0]
    res.render("nominees/nomineedetails.ejs", {
      details: details,
      nominee: nominee,
      user: user,
      comment: comment
    });
  });
})

// DELETE specific nominee and redirect to nominee list page
router.delete("/:nomineeId", async (req, res) => {
  try {
    const foundNominee = await db.user_nominee.findOne({
      where: {
        userId: res.locals.user.id,
        nomineeId: req.params.nomineeId
      }
    })
    await foundNominee.destroy()
    res.redirect('/user/nominees')
  } catch (error) {
    res.status(400).render('main/404.ejs')
  }
})


// adding/deleting notes/comments

// need to be able to add notes
// // add a notes section to the already displayed nomineesdetail.ejs page
router.post('/comment', (req, res) => {
  db.note.create({
    userId: res.locals.user.id,
    nomineeId: req.body.nomineeId,
    email: req.body.email,
    comment: req.body.comment
  })
  .then((post) => {
    res.redirect('/user/nominees/')
  })
  .catch((error) => {
    res.status(400).render('main/404.ejs')
  })
})

// delete note and redirect to same page (stay on page)
router.delete("/:nomineeId/comment", async (req, res) => {
  try {
    const foundNote = await db.note.findOne({
      where: {
        id: req.body.commentId
      }
    })
    await foundNote.destroy()
    res.redirect(`/user/nominees/${req.params.nomineeId}`)
  } catch (error) {
    res.status(400).render('main/404.ejs')
  }
})



module.exports = router;









// need to be able to add notes
// // add a notes section to the already displayed nomineesdetail.ejs page
// router.post('/:nomineeId', async (req, res) => {
//   if (res.locals.user) {
//     try {
//       const [note, noteCreated] = await db.note.findOrCreate({
//         where: {
//           comment: req.body.comment
//         },
//       })
//       const localUser = res.locals.user
//       nominee.addNote(localUser)
//       res.redirect('/user/nominees')
//       } catch(error) {
//         console.log(error)
//       }
//     } else {
//       res.redirect('/users/login')
//     }
// })

// router.put('/', async (req, res) => {
//   try {
//     const notes = await db.note.findOne({
//       where: {
//         id: req.params.name,
//       }
//     })
//     notes.update){
//       comment: rem
//     }
//   } catch (error) {
//     console.log(error)
//   }
// })


// POST route that will receive comments and add it to note db and redirect to /nominees
// router.post('/', async (req, res) => {
//   try{
//     const [note, noteCreated] = await db.note.findOrCreate({
//       where: {
//         comment: req.body.text
//       },
//       // include: [db.user]
//     })
//     const localUser = res.locals.user
//     console.log(note,'is this thing working')
//     // await localUser.addnote(note)
//     res.redirect('/user/nominees') // this should redirect back to nominees route
//   } catch (error) {
//     console.log(error)
//   }
// })

