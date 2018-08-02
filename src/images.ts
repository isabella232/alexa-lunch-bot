import { URL } from "url";

const imageList = [
	'cook-food-kitchen-eat-54455.jpeg',
	'pexels-photo-326281.jpeg',
	'pexels-photo-459469.jpeg',
	'pexels-photo-952356.jpeg'
];
const basePath = '/images/';

export function getRandomImage(): URL {
	const image = imageList[Math.floor(Math.random() * imageList.length)];
	const urlString = `${process.env.HOST}${basePath}${image}`;

	try {
		const url = new URL(urlString);
		return url;
	} catch (err) {
		console.log(`Error building image url: ${urlString}`)
	}

	return null;
}
