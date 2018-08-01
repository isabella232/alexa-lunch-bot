import { URL } from "url";

const imageList = [
	'appetizer-dark-delicious-326279.jpg',
	'basil-delicious-food-459469.jpg',
	'carrots-food-fresh-616404.jpg',
	'dish-egg-food-54455.jpg'
];
const basePath = '/images/';

export function getRandomImage(hostName: string): URL {
	const image = imageList[Math.floor(Math.random() * imageList.length)];
	return new URL(`${hostName}${basePath}${image}`);
}
