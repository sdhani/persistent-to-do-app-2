/* routes/users.js */
const Router = require("express").Router();
const queries = require('../db/users');


/* GET all users on server */
Router.get("/", async (req, res) => {
	try {
		queries.getAllUsers().then(users => {
			res.status(200).render('user-list', { users: users });
		});
	}
  catch(err) { console.log(err); }
});


module.exports = Router; /* export Router */