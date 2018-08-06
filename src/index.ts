require('dotenv').config();
import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as alexa from './alexa';
import * as slack from './slack';

const app: express.Application = express();
app.use(bodyparser.json());

app.use('/api', alexa.router);
app.use('/slack', slack.router);
app.use('/images/', express.static('images'));
app.use('/', function(_req, res) {
	res.send("<html><body><h1>Lunch Bot</h1><p>This is the api server for the Lunch Bot alexa skill.</p></body></html>");
});

app.listen(process.env.PORT, () => {
	// Success callback
	console.log(`Listening at ${process.env.PORT}/`);
});
