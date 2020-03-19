/* routes/todo.js */


const Router = require("express").Router();
const queries = require('../db/todo');

function validUser(username) {
	const hasUsername = typeof username == 'string' && username.trim() != '';
	return hasUsername;  
}

/* GET To-Do List */
Router.get('/', async (req, res) => {
	const { Username } = req.cookies;
		if(validUser(Username)){
			queries.getAllUserTodos(Username).then(todos => {
				if(todos !== []){
					res.status(200).render('todo', { todoList: todos.filter((item) => !item.deleted), username: Username });
				}else {
					res.render('todo', {	message: ':O Oh no, you have nothing to-do! Add something to-do below.'}); 
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
	try {
		// queries.createNewTodo(Username, content).then(res.status(200).redirect('/todo'));
	}
	catch (err) { res.render('todo', { message: 'Tsk Tsk Tsk. It looks like your not signed in. Please sign in OR register.'});  }
});


/* GET Todo-Item By ID [TESTING] */
Router.get('/:id', async (req, res) => {
	const { Authentication } = req.cookies;
	try {
		const response = await axios.get(`${TODO_API_URL}/todo-item/${req.params.id}`, {
			headers: {
				Cookie: `token=${Authentication}`
			}
		});
		res.status(200).json(response.data);
	}
	catch (err) { console.log(err); }
});


/* PUT Completed Status */
Router.post('/:id/update', async (req, res) => {
	const { Authentication } = req.cookies;
	const { status, edit } = req.body;
	try {
		/* Switched format for Auth access */
		await axios({
			method: "PUT",
			url: `${TODO_API_URL}/todo-item/${req.params.id}`,
			headers: {
				Cookie: `token=${Authentication}`
			},
			data: {
				completed: status === "true",
				content: edit
			}
		});
		res.status(200).redirect('/todo');
	}
	catch (err) { 
		res.render('todo', { message: `OH NO! :O Something went wrong... :/ ${err}`});
	}
});


/* DELETE Todo-Item */
Router.post('/:id/delete', async(req, res) => {
	const { Authentication } = req.cookies;
	try{
		await axios.delete(`${TODO_API_URL}/todo-item/${req.params.id}`, {
			headers: {
				Cookie: `token=${Authentication}`
			}
		});
		res.status(200).redirect('/todo');
	} 
	catch (err) {
		res.render('todo', { message: `OH NO! Looks like you will never be able to delete this to-do item!!! :O`});
	}
});


module.exports = Router; /* export Router */

