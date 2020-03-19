/* routes/login.js */


const Router = require("express").Router();
const queries = require('../db/users');


/* GET Login Page */
Router.get('/', async (req, res) => {
  try { res.render('login'); } 
  catch (err) { console.log(err); }
});


/* POST Login User */
Router.post('/', async (req, res) => {
  const { username } = req.body;

  /* Does User Exist? */
  queries.loginUser(username).then(response => {
    if(response !== -1){
      res.cookie('Username', username, { httpOnly: true });
      res.status(200).redirect('/todo');
    } else { /* User does not exist */
      res.status(400).render('login', { message: 'User does not exist. Please register user OR log in as a different user.' });
    }
  });
});


module.exports = Router;