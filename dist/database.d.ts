import { LunchSpot } from './lunch-spot';
export declare function getRandomIdea(): Promise<LunchSpot>;
export declare function getAllSpots(): Promise<LunchSpot[]>;
export declare function alterScore(id: number, amount: number): Promise<void>;
export declare function setDate(id: number): Promise<void>;
export declare function removeIdea(id: number): Promise<void>;
export declare function addIdea(title: string): Promise<LunchSpot>;
