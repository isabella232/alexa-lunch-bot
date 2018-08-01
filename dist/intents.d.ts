import { AlexaResponse } from './response';
export declare class GetIdeaIntent {
    readonly key: string;
    execute(handlerInput: object): Promise<AlexaResponse>;
}
export declare class AddIdeaIntent {
    readonly key: string;
    execute(handlerInput: any): Promise<AlexaResponse>;
}
