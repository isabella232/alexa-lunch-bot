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

app.post('/api', (req, res) => {
	const alexaContext = req.body.context;
	const alexaRequest = req.body.request;
	let r = new AlexaResponse();

	(async function() {
		console.log("very start");
		try {
			if (alexaRequest.type === 'LaunchRequest') {
				console.log("Doing launch");
				r = await launchIntent.execute(req, alexaRequest);
				console.log("Done launch");
			} else if (alexaRequest.type === 'IntentRequest') {
				r = await intents[alexaRequest.intent.name].execute(req);
			} else if (alexaRequest.type === 'SessionEndedRequest') {
				r = await launchIntent.execute(req, alexaRequest);
			}
		} catch (err) {
			console.log("Error while creating response.", err);
		}

		console.log("Sending data");
		res.send(r.getData());
	})();
});

app.use('/images/', express.static('images'));
app.use('/', function(req, res) {
	res.send("");
});

app.listen(process.env.PORT, () => {
	// Success callback
	console.log(`Listening at ${process.env.PORT}/`);
});
