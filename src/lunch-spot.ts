export class LunchSpot {
	public id: number;
	public title: string;
	public score: number;
	public lastSuggsted: Date;

	constructor(row) {
		this.id = parseInt(row['id']);
		this.title = row['title'];
		this.score = parseInt(row['score']);
		this.lastSuggsted = new Date(row['lastSuggsted']);
	}
}
