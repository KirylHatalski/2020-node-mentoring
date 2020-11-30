import jwt from 'jsonwebtoken'
import { configs } from '../config'

const checkToken = (req, res, done) => {
	let token = req.headers['x-access-token']

	if(token) {
		jwt.verify(token, configs.SECRET_TOKEN, (err) => {
			if(err) { return res.status(401).send('Failed to authenticate token.') }
			done();
		});
	} else {
		res.status(403).send('No token provided');
	}
}

export { checkToken }
