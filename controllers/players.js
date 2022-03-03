const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
require('dotenv').config() // this is so that our .process.env.SECRET works


router.get("/:name", (req, res) => {
  // console.log(req.query.q)
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookup_all_players.php?l=${req.params.name}`; // fix this url when i get api key
  console.log(url)
  const teamPlayers = [];
  axios.get(url).then((response) => {
    console.log(response)
    const players = [...response.data.players];
    // // console.log(players)
    players.forEach((player) => {
      teamPlayers.push({
        name: player.strPlayer
      });
    })
    // console.log(teamPlayers)
    // // res.send(teamPlayers)
    res.render("players/players.ejs", {
      teamPlayers: teamPlayers
    });
  });
})


// not sure if this works yet, need to test
// post route that will receive the name of player and add it to nominee db and redirect to /nominees
router.post('/', async (req, res) => {
  try{
    await db.nominee.create({
      name: req.body.name
    })
    res.redirect('/nominees') // this should redirect back to nominees route
  } catch (error) {
    console.log(error)
  }
  // res.send(req.body)
})

// delete a nominee
router.delete('/:name', (req, res) => {
  db.nominee.destroy({
    where: { name: req.params.name }
  }) .then( deletedNominee => {
    console.log(deletedNominee)
    res.redirect('/nominees')
  }).catch(err => {
    console.log(err)
  })
})



module.exports = router

// export all these routes to the entry point file
// router.get('/', (req, res) => {
//     console.log(process.env.FOOTBALL_API_KEY)
//     const options = {
//       method: 'get',
//       url: 'https://v3.football.api-sports.io/players?league=39',
//     //   qs: {league: '39'},
//       headers: {
//         'x-rapidapi-key': `${process.env.FOOTBALL_API_KEY}`,
//         'x-rapidapi-host': 'v3.football.api-sports.io'
//       }
//     }
    
//     axios(options)
//     .then(function (response) {
//       console.log(response.data)
//       // console.log(JSON.stringify(response.data.team))
//     //   const allPlayers = response.data.response
//       res.send(response.data)
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
// })