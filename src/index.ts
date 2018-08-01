require('dotenv').config();
import * as express from 'express';
import * as bodyparser from 'body-parser';
import { AlexaResponse } from './response';
import { LaunchIntent, GetIdeaIntent, AddIdeaIntent, TestIntent } from './intents';

//insert into lunch_spots (title) values ("Test");

const app: express.Application = express();

app.use(bodyparser.json());


const launchIntent = new LaunchIntent();
const intents = {};
intents['getidea'] = new GetIdeaIntent();
intents['addidea'] = new AddIdeaIntent();
intents['test'] = new TestIntent();

app.post('/api', async (req, res) => {
	const alexaContext = req.body.context;
	const alexaRequest = req.body.request;
	let r: AlexaResponse;

	if (alexaRequest.type === 'LaunchRequest') {
		r = await launchIntent.execute(req);
	} else if (alexaRequest.type === 'IntentRequest') {
		r = await intents[alexaRequest.intent.name].execute(req);
	}

	res.send(r.getData());
});

app.use('/images/', express.static('images'));

app.listen(process.env.PORT, () => {
	// Success callback
	console.log(`Listening at ${process.env.HOST}:${process.env.PORT}/`);
});
