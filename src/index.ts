require('dotenv').config();
import * as express from 'express';
import * as bodyparser from 'body-parser';
import { AlexaResponse } from './response';
import { GetIdeaIntent } from './intents';

//insert into lunch_spots (title) values ("Test");

const app: express.Application = express();
const port: number = parseInt(process.env.PORT);

app.use(bodyparser.json());



const intents = {};
const getidea = new GetIdeaIntent();
intents[getidea.key] = getidea;

app.post('/api', (req, res) => {
	const context = req.body.context;
	const request = req.body.request;
	let r = new AlexaResponse();

	if (request.type === 'LaunchRequest') {
		r.setSpeech("Heroku test");
	} else if (request.type === 'IntentRequest') {
		r = intents[request.intent.name].execute(request);
	}

	res.send(r.getData());
});

app.use('/', (req, res) => {
	res.send("Hello world")
});


app.listen(port, () => {
	// Success callback
	console.log(`Listening at http://localhost:${port}/`);
});
