/* routes/index.js */


const Router = require('express').Router();
const queries = require('../db/users');


/* GET Home Page */
Router.get('/', async (req, res) => {
  try { res.render('home'); } 
  catch (err) { console.log(err); }
});


/* GET Register-User Page */
Router.get('/register', async (req, res) => {
  try { res.render('register-user'); } 
  catch (err) { console.log(err); }
});


/* POST New User To API */
Router.post('/register', async (req, res) => {
  const { username } = req.body;

  queries.registerUser(username).then(response => {
    if(response !== -1) {
      res.cookie('Username', username, { httpOnly: true });
      res.status(200).redirect('/todo');
    } else {
      res.status(200).render('register-user', {
        message: `The user ${username} already exists.`
      });
    }
  });  
});


/* GET Logout User  | Requires a Refresh to Update Cookies, redirect is not sufficient */
Router.get('/logout', async(req, res) => {
  try {
    res.clearCookie('Username');
    res.status(200).redirect('/login');
  }
  catch (err) { console.log(err); }
});


module.exports = Router; /* export Router */