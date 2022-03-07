const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
require('dotenv').config()

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
        team: player.strTeam,
        image: player.strCutout
      });
    })
    // console.log(teamPlayers)
    // // res.send(teamPlayers)
    res.render("players/players.ejs", {
      teamPlayers: teamPlayers
    });
  });
})

// GET one individual player details to display on playerdetail.ejs
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

module.exports = router

