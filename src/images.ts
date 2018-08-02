import { URL } from "url";

const backgroundList = [
	'cook-food-kitchen-eat-54455.jpeg',
	'pexels-photo-326281.jpeg',
	'pexels-photo-459469.jpeg',
	'pexels-photo-952356.jpeg'
];
const iconList = [
	'pexels-photo-356079.jpeg',
	'pexels-photo-355988.jpeg',
	'pexels-photo-247753.jpeg'
];
const basePath = '/images/';

export function getRandomBackground(): URL {
	const image = backgroundList[Math.floor(Math.random() * backgroundList.length)];
	const urlString = `${process.env.HOST}${basePath}${image}`;

	try {
		const url = new URL(urlString);
		return url;
	} catch (err) {
		console.log(`Error building image url: ${urlString}`)
	}

	return null;
}

export function getRandomIcon(): URL {
	const image = iconList[Math.floor(Math.random() * iconList.length)];
	const urlString = `${process.env.HOST}${basePath}${image}`;

	try {
		const url = new URL(urlString);
		return url;
	} catch (err) {
		console.log(`Error building image url: ${urlString}`)
	}

	return null;
}
