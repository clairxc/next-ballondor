const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
const req = require('express/lib/request')
const methodOverride = require('method-override')
require('dotenv').config() 

// GET /nominees - read/return a page with all nominees 
router.get('/', async (req, res) => {
  if (res.locals.user) {
    try {
      const allNominees = await res.locals.user.getNominees()
      console.log('lksdjflkasjdflkajsdlkfjalskdjf')
      console.log(allNominees)

      res.render('nominees/nominees.ejs', { 
        nominees: allNominees
      })
    } catch (error) {
      res.status(400).render('main/404.ejs')
    }
  }
  });

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
      res.redirect('/user/nominees')
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

// add notes below nominee details
router.post('/comment', (req, res) => {
  db.note.create({
    userId: res.locals.user.id,
    nomineeId: req.body.nomineeId,
    email: req.body.email,
    comment: req.body.comment
  })
  .then((post) => {
    res.redirect(`/user/nominees/${req.body.nomineeId}`)
  })
  .catch((error) => {
    res.status(400).render('main/404.ejs')
  })
})

// show all comments of the user for that specific nominee
// router.get("/edit/:nomineeId/comment", (req, res) => {
//   res.render('/comment', { 
//     comment: req.body.comment
//   })
// })


router.get('/:nomineeId/:commentId/edit', async (req, res) => {
  try {
    const comment = await db.note.findByPk(req.params.commentId)
    res.render('user/edit.ejs', {
      comment: comment
    })
  } catch (error) {
    console.log(error)
  }
})

// edit/update notes
router.put("/:nomineeId/:commentId", async (req, res) => {
  try {
    const updateComment = await db.note.findByPk(req.params.commentId) //tried using .update
    updateComment.set({
      comment: req.body.comment
      })
    await updateComment.save()
    res.redirect(`/user/nominees/${req.params.nomineeId}`) 
    // want to redirect back to nominee details page
  } catch (error) {
    res.status(400).render('main/404.ejs')
  }
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