//import { UserService as User } from '../services'
import jwt from 'jsonwebtoken'
import { logger, loggingHandler, checkToken } from '../loaders'

//const userRoutesHandler = callback => loggingHandler('User', callback)

export default function loginRoute(app) {
	app.post('/login', (req, res) => {
		let token = jwt.sign({ "sub": `#idhere`, isDeleted: false }, 'secret', { expiresIn: 60 })
		res.send(token);
	});

}