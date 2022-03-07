# Next Best: Who will win the next Ballon d'Or?

<h1 align="center">
  <img src="https://library.sportingnews.com/styles/crop_style_16_9_tablet_2x/s3/2021-08/ballon-dor_jdrcxk2gyy5v1qbj8784anq4a.jpg?itok=ZlNPtzCQ">
 </h1>

## Deployed App


## App Description
The Ballon d'Or is the highest individual honor in football/soccer, recognizing the best players.
Next Best is a full CRUD application that provides the user the ability to view top 5 leagues (because let's be honest, the winner will come from one of these five), all teams in specific league, all players in specific team, and player details in order to predict who they think will win the next coveted Ballon d'Or.

## User Stories
- As a user, I want to predict and keep track of who I think will win the next ballon d'or 
- As a user, I want to select who I think are the top nominees
- As a user, once I add a player to my list of nominees, I want to be redirected to my nominees page
- As a user, I want to be able to view the team performances, rankings, player rankings, player statistics/details

## Install
1. Fork and clone this repo
2. In the terminal, run ```npm i``` and install the following packages:
  - ```axios```
  - ```method_override```
  - ```ejs```
  - ```express```
  - ```express-ejsLayouts```
  - ```cookieParser```
  - ```cryptojs```
  - ```bcrypt```
  - ```dotenv```
  - ```pg```
  - ```sequelize```
  - ```sequelize-cli```
3. Open code in desired code editor

## API
- THESPORTSDB
  - API key optional (don't need to utilize most features)  

## Tech Stack
- Postgres
- Sequelize
- Express
- Node.JS
- CSS/Bootstrap

## Wireframes/Screenshots
- Home Page
![image](https://user-images.githubusercontent.com/96402339/157020303-794feed0-cc7b-4ab9-a83e-e5a9aeb2c2fc.png)

- Log In Page
![image](https://user-images.githubusercontent.com/96402339/157020360-2d28af72-89ba-4051-8c65-0b052105d9fe.png)

- Sign Up Page
![image](https://user-images.githubusercontent.com/96402339/157020391-1010fe84-da58-4605-8668-8ca8f521ac54.png)

- Leagues Page
![image](https://user-images.githubusercontent.com/96402339/157020513-7cee4915-3d8f-40af-af8d-e994df23179d.png)

- Teams Page
![image](https://user-images.githubusercontent.com/96402339/157020712-ed5bf497-66d0-49af-960e-4a4ef45aa479.png)
![image](https://user-images.githubusercontent.com/96402339/157020741-11c6586a-8500-4fc1-8697-4499cd267f40.png)

- Players Page
![image](https://user-images.githubusercontent.com/96402339/157020783-9da98f34-ac1d-49f2-8ee1-cf307c74682f.png)

- Player Details Page
![image](https://user-images.githubusercontent.com/96402339/157021339-7df3a346-48b7-4c09-aaa3-48b2bf8e63fc.png)

- List of Saved Nominees
![image](https://user-images.githubusercontent.com/96402339/157020876-72a02e68-5cbb-4a8b-9d89-838e55e81e03.png)

- Create Note Section/Page
![image](https://user-images.githubusercontent.com/96402339/157021026-23a177dc-50d3-4aa7-8e39-ff66095b6c11.png)
![image](https://user-images.githubusercontent.com/96402339/157021055-6b5c5b37-08dc-4503-a45b-8106085f2696.png)


## ERDs
![image](https://user-images.githubusercontent.com/96402339/156917303-e72d800a-f714-427f-b034-8efcd2274a20.png)

## RESTful Routing Chart
![image](https://user-images.githubusercontent.com/96402339/156918146-344ff9ad-2c24-48ee-8828-51c7c6155afe.png)

## MVP goals
- [X] Create a welcome page that renders login/sign up
- [X] Create a home page that lists all teams and all players
- [X] Create a page that lists all "favorited" nominees
- [X] Create a page displaying specific player details/stats
- [X] Allow user to add "personal notes/comments" to each nominee

## Code Highlights
```js 
router.get("/", (req, res) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/all_leagues.php`;
  // console.log(url)
  axios.get(url).then((response) => {
    const leagues = [...response.data.leagues]
    const soccerLeagues = []
    leagues.forEach((league) => {
      if (league.idLeague === '4331' || league.idLeague === '4328' || league.idLeague === '4332' || league.idLeague === '4334' || league.idLeague === '4335') {
        soccerLeagues.push(league);
      }
    })
    res.render("leagues/leagues.ejs", {
      soccerLeagues,
      results: leagues
    })
  })
})
```
```js
router.get("/:name", (req, res) => {
  const url = `https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_API_KEY}/searchplayers.php?t=${req.params.name}`
  console.log(url)
  const teamPlayers = []
  axios.get(url).then((response) => {
    console.log(response)
    const player = [...response.data.player];
    player.forEach((player) => {
      console.log(player)
      teamPlayers.push({
        name: player.strPlayer,
        team: player.strTeam,
        image: player.strCutout
      })
    })
    res.render("players/players.ejs", {
      teamPlayers: teamPlayers
    })
  })
})
```

## Stretch Goals
- [ ] Create a search bar/page
- [X] Add widgets (partial)
- [ ] Add ability to watch video highlights on homepage
- [ ] Display null values as 'N/A'


## Other Sources:
- https://www.scoreaxis.com/free-soccer-widgets/


P.S. Thank you to all my peers and instructors for helping me complete this project 😬 I couldn't have made it without you all!
