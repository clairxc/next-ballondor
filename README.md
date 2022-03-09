# Next Best: WHO WILL WIN THE NEXT BALLON d'OR?

<h1 align="center">
  <img src="https://library.sportingnews.com/styles/crop_style_16_9_tablet_2x/s3/2021-08/ballon-dor_jdrcxk2gyy5v1qbj8784anq4a.jpg?itok=ZlNPtzCQ">
 </h1>

## Deployed App
https://next-best-ballondor.herokuapp.com/


## App Description
The Ballon d'Or is the highest individual honor in football/soccer, recognizing the best players.
Next Best is a full CRUD application that provides the user the ability to view top 5 leagues (because let's be honest, the winner will come from one of these five), all teams in specific league, all players in specific team, and player details in order to predict who they think will win the next coveted Ballon d'Or.


## User Stories
- As a user, I want to predict and keep track of who I think will win the next ballon d'or 
- As a user, I want to select who I think are the top nominees
- As a user, once I add a player to my list of nominees, I want to be redirected to my nominees page
- As a user, I want to be able to view the team performances, rankings, player rankings, player statistics/details


## Installation
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
4. OPTIONAL: request an API key to utilize more information, but not necessary to do basic/free queries
5. Create a ```.env``` file and copy your API key into the file, like so:

   ```js
   SECRET='i ate ice cream for breakfast'
   SPORTS_API_KEY='insertPrivateApiKeyHere'
   PORT=portYoureRunningOn
   ```
   - No need to create and insert an API key if you do not request one, just use the one the API already embeds in the url

## API
- THESPORTSDB: 
  - https://thesportsdb.com/
- API key optional (don't need to utilize most features)  
- To use all the upgraded features, upgrade to become a patreon for $5 by going to this link: https://www.patreon.com/thedatadb 
  - Make sure to choose/specify the correct API when becoming a patreon as this API runs multiple sites
   <img width="100" alt="image" style="center" src="https://user-images.githubusercontent.com/96402339/157138910-6b23d379-2bb0-4832-84c8-f20a8857c2a7.png">
   
  - Email you receive when receiving the API key will provide instructions on how to implement the API key


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

- Edit Notes
![image](https://user-images.githubusercontent.com/96402339/157505888-ea8ebfe4-e905-4ce6-a649-d159cd3fe2bd.png)
![image](https://user-images.githubusercontent.com/96402339/157505907-8ff5ff0a-d0b2-4da9-84ec-effd3f785d0f.png)

## ERDs
![image](https://user-images.githubusercontent.com/96402339/156917303-e72d800a-f714-427f-b034-8efcd2274a20.png)


## RESTful Routing Chart
![image](https://user-images.githubusercontent.com/96402339/157505512-008cbf3f-05ee-4532-9a14-8e6a65e4225e.png)

## MVP goals
- [X] Create a welcome page that renders login/sign up
- [X] Create a home page that lists all teams and all players
- [X] Create a page that lists all "favorited" nominees
- [X] Create a page displaying specific player details/stats
- [X] Allow user to add "personal notes/comments" for each nominee
- [X] Allow user to edit their personal notes/comments for each nominee


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


## Things I Learned
Imposter syndrome is SO REAL.


## Other Sources:
- https://www.scoreaxis.com/free-soccer-widgets/


P.S. Thank you to all my peers and instructors for helping me complete this project 😬 I couldn't have done it without you all!
