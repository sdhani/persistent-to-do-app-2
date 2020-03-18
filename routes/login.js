/* routes/login.js */
const Router = require("express").Router();
const axios = require("axios");
const TODO_API_URL = "https://hunter-todo-api.herokuapp.com";


/* GET Login Page */
Router.get('/', async (req, res) => {
  try { res.render('login'); } 
  catch (err) { console.log(err); }
});


/* POST Login User */
Router.post('/', async (req, res) => {
  const { username } = req.body;
  try{
    const userToken = await axios.post(`${TODO_API_URL}/auth`, { username });    
    res.cookie('Authentication', userToken.data.token, { httpOnly: true });
    res.cookie('Username', username, { httpOnly: true });
    res.status(200).redirect('/todo');
  }
  catch (err) { 
    res.status(400).render('login', { message: 'User does not exist. Please register user OR log in as a different user.' });
  }
});


module.exports = Router;