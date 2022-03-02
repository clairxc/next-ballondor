const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
const { response } = require('express')
require('dotenv').config() // this is so that our .process.env.SECRET works


// router.get('/teams', (req, res) => {
//     res.send('Hello teams!')
// })

// premier league
router.get("/", (req, res) => {
  // console.log(req.query.q)
  const url = `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=English%20Premier%20League`;
  // console.log(url)
  const leagueTeams = [];
  axios.get(url).then((response) => {
    // console.log(response.data.Search)
    const teams = [...response.data.teams];
    // console.log(teams)
    teams.forEach((team) => {
      leagueTeams.push({
        name: team.strTeam
      });
    })
    console.log(leagueTeams)
    res.send(leagueTeams)
    });
    // res.render("teams/teams.ejs", {
    //   leagueTeams: leagueTeams
    // });
  });

// router.get("/", (req, res) => {
//   const url = `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php`;
//   axios.get(url).then((response) => {
//     // const teams = [...response.data.teams];
//     // const leagueTeams = [];
//     // teams.forEach((team) => {
//     //   console.log(team, 'alskdjflksjdflksjdflkajsldkfjlskadjflkasdfjalskdjflkasjdf')
//     //   if (team.strLeague === 'English Premier League') {
//     //     leagueTeams.push(team);
//     //   }
//     // });
//     // res.render("teams/teams.ejs", {
//     //   leagueTeams,
//     // });
//     console.log(response)
//   });
// });



// router.get('/', (req, res) => {
//     const url = `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php`
//     axios.get(url)
//       .then(response => {
//         // console.log(response.data)
//         const searchResults = response.data
//         res.render('teams/teams.ejs', {
//             results: searchResults
//         })
//       })
//   })

//   
module.exports = router