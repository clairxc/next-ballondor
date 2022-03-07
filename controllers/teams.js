const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
const { response } = require('express')
require('dotenv').config()

router.get("/:name", (req, res) => {
  // console.log(req.query.q)
  const url = `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${req.params.name}`;
  console.log(url)
  const leagueTeams = [];
  axios.get(url).then((response) => {
    console.log(response)
    const teams = [...response.data.teams];
    // // console.log(teams)
    teams.forEach((team) => {
      leagueTeams.push({
        name: team.strTeam,
        badge: team.strTeamBadge,
        description: team.strDescriptionEN
      });
    })
    // console.log(leagueTeams)
    // // res.send(leagueTeams)
    res.render("teams/teams.ejs", {
      leagueTeams: leagueTeams
    });
  });
})
 
module.exports = router