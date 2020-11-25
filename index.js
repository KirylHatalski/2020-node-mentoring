import express from 'express';
import { readFile } from 'fs';
import path from 'path';
import https from 'https';
import Joi from 'joi';



import { customSort, getAutoSuggestUsers } from './utils'

const app = express()
const port = 3000
const validator = require('express-joi-validation').createValidator({})

let users = {}


https.get('https://next.json-generator.com/api/json/get/EJ8r7LUqY', (res) => {
    let body = '';
    res.on('data', (generated) => {
        body+=generated;
    });
    res.on('end', () => {
        users = JSON.parse(body);
    });
})
.on('error', (e) => {
  console.log("json api fails, trying to load local JSON");
    readFile(path.join(`${__dirname}/data/users.json`), 'utf8', (err, generated) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.error('users.json does not exist');
          return;
        }
        throw err;
      }
      users = JSON.parse(generated);
      console.log('Users used from local store')
    });
});

app.get('/', (req, res) => {
  res.send('App up!')
})

const userSchema = Joi.object({
										 id: Joi.string().required(),
										 login: Joi.string().required(),
										 password: Joi.string().required(),
										 age: Joi
										      .number()
												  .integer()
                          .min(4)
                          .max(130),
										 isDeleted: Joi.boolean().required(),
                   		    });

app.get('/user/:id', (req, res) => {
  let user = users.find(elem => elem.id === req.params.id);
  if(!user || user.isDeleted) return res.sendStatus(400);
  return res.send(user);
});

app.delete('/user/:id', (req, res) => {
		users.find(elem => elem.id === req.params.id).isDeleted = true;
    return res.sendStatus(200);
})

app.post('/user', validator.query(userSchema), (req, res) => {
		if(!req.query) return res.sendStatus(400);
    if(Object.keys(req.query).join('') === Object.keys(users[0]).join('')) {
      users = [...users, req.query]
      return res.sendStatus(200);
    }
    return res.sendStatus(400);
})

app.patch('/user/:id', (req, res) => {
		if(!req.query) return res.sendStatus(400);
		Object.assign(users.find(elem => elem.id === req.params.id), req.query);
		return res.sendStatus(200);
})


app.get('/users', (req, res) => {
  res.send(customSort(users))
});

app.get('/users/:limit', (req, res) => {
		if(req.params.limit) {
		  return res.send(getAutoSuggestUsers(users, req.query.login, parseInt(req.params.limit)));
		}
		return res.send(users.find(elem => elem.id === req.params.id));
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
