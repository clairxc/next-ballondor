const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");
const axios = require("axios");
require("dotenv").config();

router.get("/", (req, res) => {
  // console.log(req.query.q)
  const url = `https://www.thesportsdb.com/api/v1/json/2/all_leagues.php`;
  // console.log(url)
  axios.get(url).then((response) => {
    // console.log(response.data.Search)
    const leagues = [...response.data.leagues];
    const soccerLeagues = [];
    leagues.forEach((league) => {
      if (league.idLeague === '4331' || league.idLeague === '4328' || league.idLeague === '4332' || league.idLeague === '4334' || league.idLeague === '4335') {
        soccerLeagues.push(league);
      }
    });
    res.render("leagues/leagues.ejs", {
      soccerLeagues,
      results: leagues
    });
  });
});

module.exports = router;
