import app from './app'
import { runDB } from './loaders'
import { endPoints } from './api'

import { configs } from './config'

const port = configs.PORT;

export default function init(){
	app.listen(port, () => {
		console.log(`App listening at http://localhost:${port}`)
		runDB()
	})


	app.get('/', (req, res) => {
		res.send('App up!')
	})

	endPoints.forEach(endPoint => endPoint(app));

	app.use('*', (req, res) => res.sendStatus(404))
}