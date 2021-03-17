const { v4: uuidv4 } = require('uuid')

const User = require('../models/user')

/*let users = [
	{id: 1, name: 'Lisa Aprilia', email: 'lisaaprilia243@gmail.com'},
	{id: 2, name: 'Erwin Kurniawan', email: 'kurnw29@gmail.com'}
]*/

module.exports = {
	index: function(request, response) {
		let keyword = {}

		if(request.query.keyword) {
			keyword = {name: {$regex: request.query.keyword}}
		}


		// carapertama
		/*User.find(keyword, "name _id", function(error, users){
			if(error) console.log(error)

			console.log(users)
			response.render('pages/user/index' , {users})
		})*/

		// carakedua
		const query = User.find(keyword)
		query.exec(function(error, users) {
			if(error) console.log(error)

			console.log(users)
			response.render('pages/user/index', {users})
		})
		
	},
	show:  function(request, response) {
		const id =request.params.id
		/*const data =users.filter( user=> {
			return user.id == id 
		})*/

		User.findById(id, function(error, data){
			if(error) console.log(error)
				console.log(data)
				response.render('pages/user/show', {user: data})
		})

	},
	create: function(request, response) {
		response.render('pages/user/create')
	},
	store: function(request, response) {
		// cara pertama
		/*const user = new User({
			name: request.body.name,
			email: request.body.email,
			password: request.body.password,
		})

		user.save(function(error, data){
			if(error) console.log(error)

			console.log(data)
			response.redirect('/users')
		})*/


		// carakedua
		User.create({
			name: request.body.name,
			email: request.body.email,
			password: request.body.password,

		},  function(error, data){
			if(error) console.log(error)

			console.log(data)
			response.redirect('/users')
		})

/*		users.push({
			id: uuidv4(), 
			name: request.body.name,
			email: request.body.email,
		})*/
	},
	update: function(request, response){
	const id = request.params.id
	users.filter(user => {
		if(user.id == id) {
			user.id = id
			user.name = request.body.name
			user.email = request.body.email

			return user
		}
	})
	response.json({
		status: true,
			data: users,
			message: 'Data users Berhasil Di Edit',
			method: request.method,
			url: request.url
		})
	},
	delete: function(request, response){
	let id = request.params.userId
	users = users.filter(user =>user.id != id)
	response.send({
		status: true,
			data: users,
			message: 'Data users Berhasil Di Hapus',
			method: request.method,
			url: request.url
		})
	}
}