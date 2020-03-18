/* routes/index.js */

const Router = require('express').Router();
const axios = require("axios");
const TODO_API_URL = "https://hunter-todo-api.herokuapp.com";


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
  try {
    await axios.post(`${TODO_API_URL}/user`, { username });
    /* Login new user */
    const userToken = await axios.post(`${TODO_API_URL}/auth`, { username });    
    res.cookie('Authentication', userToken.data.token, { httpOnly: true });
    res.cookie('Username', username, { httpOnly: true });
    res.status(200).redirect('/todo');
  }
  catch (err) { 
    res.status(200).render('register-user', {
      message: `The user ${username} already exists.`
    });
  }
});


/* GET Logout User  | Requires a Refresh to Update Cookies, redirect is not sufficient */
Router.get('/logout', async(req, res) => {
  try {
    res.clearCookie('Authentication');
    res.status(200).redirect('/login');
  }
  catch (err) { console.log(err); }
});


module.exports = Router; /* export Router */