const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
require('dotenv').config() // this is so that our .process.env.SECRET works

// EXTRA: GET all players in top 5 leagues to show when user clicks PLAYERS in nav bar



// GET all players in specific league and display on player.ejs
router.get("/:name", (req, res) => {
  // console.log(req.query.q)
  const url = `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_API_KEY}/searchplayers.php?t=${req.params.name}`;
  console.log(url)
  const teamPlayers = [];
  axios.get(url).then((response) => {
    console.log(response)
    const player = [...response.data.player];
    // // console.log(player)
    player.forEach((player) => {
      console.log(player)
      teamPlayers.push({
        name: player.strPlayer,
        team: player.strTeam
      });
    })
    // console.log(teamPlayers)
    // // res.send(teamPlayers)
    res.render("players/players.ejs", {
      teamPlayers: teamPlayers
    });
  });
})

// GET one individual player create new route to playerdetail.ejs
router.get("/:teamname/:playername", (req, res) => {
  // console.log(req.query.q)
  const url = `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_API_KEY}/searchplayers.php?p=${req.params.playername}`;
  console.log(url)
  axios.get(url).then((response) => {
    console.log(response.data.player)
    const details = response.data.player[0]
    res.render("players/playerdetails.ejs", {
      details: details
    });
  });
})

// POST
// router.post('/:teamname/:playername', async (req, res) => {
//   try {
//     await db.nominee.create({
//       name: req.body.name
//     })
//     res.redirect('/nominees')
//   } catch (error) {
//     console.log(error)
//   }
// })

// router.get("/:name", (req, res) => {
//   // console.log(req.query.q)
//   let playerName = req.params.name
//   axios.get(`https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_API_KEY}/searchplayers.php?t=${[playerName]}`)
//   .then(response => {
//     let imgSrc = response.data.player.strThumb
//     let name = response.data.player.strPlayer
//     let team = response.data.player.strTeam
//     let nationality = response.data.player.strNationality

//     res.render("players/playerdetails.ejs", {
//       src:imgSrc, name, team, nationality})
//     });
//   });

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