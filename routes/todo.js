/* routes/todo.js */


const Router = require("express").Router();
const queries = require('../db/todo');


function validUser(username) {
	const hasUsername = typeof username == 'string' && username.trim() != '';
	return hasUsername;  
}

function getUserId(username) {
	return queries.getUserID(username);
}

/* Middleware to validate todo id */
function isValid(req, res, next){
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}



/* GET To-Do List */
Router.get('/', async (req, res) => {
	const { Username } = req.cookies;
	if(validUser(Username)){
		queries.getAllUserTodos(Username).then(todos => {
			if(todos !== []){
				res.status(200).render('todo', { todoList: todos, username: Username });
			}else {
				res.render('todo', { message: ':O Oh no, you have nothing to-do! Add something to-do below.'}); 
			}
		});
	}else {
		res.render('todo', { message: 'Tsk Tsk Tsk. It looks like your not signed in. Please sign in OR register.'}); 
	}
});


/* POST New Todo-Item */
Router.post('/', async(req, res) => {
	const { Username } = req.cookies;
	const { content } = req.body;

	const todo = {
		user_id: getUserId(Username),
		content: content
	}

	if(validUser(Username)){ /* NEED TO FIX REFRESH PROBLEM WHEN ADD TODO PROBLEM */
		queries.createNewTodo(Username, todo).then(res.status(200).redirect('/todo'));
	} else { 
		res.render('todo', { message: 'Tsk Tsk Tsk. It looks like your not signed in. Please sign in OR register.'});  
	}
});


/* GET Todo-Item By ID [TESTING] */
Router.get('/:id', isValid, async (req, res) => {
	const { Username } = req.cookies;

	if(validUser(Username)){
		queries.getTodoByID(Username, req.params.id).then(todo => {res.status(200).json(todo)});
	} else {
		res.status(400).send('Hmmm. Looks like something went wrong.');
	}
});


/* PUT Completed Status */
Router.post('/:id/update', async (req, res) => {
	const { Username } = req.cookies;
	const { status, edit } = req.body;

	if(validUser(Username)){ /* NEED TO FIX REFRESH PROBLEM WHEN UPDATE TODO PROBLEM */
		queries.update(Username, req.params.id, edit, status).then(res.status(200).redirect('/todo'));
	} else {
		res.render('todo', { message: `OH NO! :O Something went wrong... :/`});  
  }
});


/* DELETE Todo-Item */
Router.post('/:id/delete', async(req, res, next) => {
	const { Username } = req.cookies;

	if(validUser(Username)){ /* NEED TO FIX REFRESH PROBLEM WHEN DELETE TODO PROBLEM */
		queries.delete(Username, req.params.id).then(res.status(200).redirect('/todo'));
	} else {
		res.render('todo', { message: `OH NO! Looks like you will never be able to delete this to-do item!!! :O`});
	}
});


module.exports = Router; /* export Router */

