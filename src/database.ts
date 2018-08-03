import * as mysql from 'mysql';
import { LunchSpot } from './lunch-spot';

// Randomly select an idea
export async function getRandomIdea(): Promise<LunchSpot> {
	const options = await getAllSpots();

	// Pick a random one
	const selection = options[Math.floor(Math.random() * options.length)];
	await setDate(selection.id);

	return selection;
}

// Get a list of ideas to choose from
export async function getAllSpots(): Promise<LunchSpot[]> {
	const connection = mysql.createConnection(process.env.JAWSDB_URL);
	connection.connect();

	var options: LunchSpot[] = await (new Promise<LunchSpot[]>((resolve, reject) => {
		connection.query('select * from lunch_spots order by lastSuggested ASC, score DESC limit 5', function(error, results) {
			if (error) reject(error);

			let spots: LunchSpot[] = [];
			results.forEach(function(row) {
				spots.push(new LunchSpot(row));
			})

			resolve(spots);
		});
	}));
	connection.end();

	return options;
}

export async function alterScore(id: number, amount: number): Promise<void> {
	const connection = mysql.createConnection(process.env.JAWSDB_URL);
	connection.connect();

	await (new Promise<LunchSpot[]>((resolve, reject) => {
		connection.query('UPDATE lunch_spots SET score = score + ? WHERE id = ?', [amount, id], function(error) {
			if (error) reject(error);
			resolve();
		});
	}));
	connection.end();
}

// Set the last suggested date
export async function setDate(id: number): Promise<void> {
	const connection = mysql.createConnection(process.env.JAWSDB_URL);
	connection.connect();

	await (new Promise<LunchSpot[]>((resolve, reject) => {
		connection.query('UPDATE lunch_spots SET lastSuggested = NOW() where id = ?', [id], function(error) {
			if (error) reject(error);
			resolve();
		});
	}));
	connection.end();
}

// Remove an idea from the DB
export async function removeIdea(id: number): Promise<void> {
	const connection = mysql.createConnection(process.env.JAWSDB_URL);
	connection.connect();

	await (new Promise<LunchSpot[]>((resolve, reject) => {
		connection.query('DELETE FROM lunch_spots where id = ?', [id], function(error) {
			if (error) reject(error);
			resolve();
		});
	}));
	connection.end();
}

// Add an idea to the DB
export async function addIdea(title: string): Promise<LunchSpot> {
	const connection = mysql.createConnection(process.env.JAWSDB_URL);
	connection.connect();

	const insertedSpot = await (new Promise<LunchSpot>((resolve, reject) => {
		connection.query('Insert into lunch_spots SET ?', { title }, function(error, insertResult) {
			if (error) reject(error);

			connection.query('SELECT * FROM lunch_spots WHERE id = ?', [insertResult.insertId], function(error, queryResult) {
				if (error) reject(error);
				if (queryResult.length === 0) reject();

				resolve(new LunchSpot(queryResult[0]));
			});
		});
	}));
	connection.end();

	return insertedSpot;
}
