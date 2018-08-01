import { AlexaResponse } from './response';
import { Request } from 'express';
export declare class LaunchIntent {
    execute(httpRequest: Request, alexaRequest: any): Promise<AlexaResponse>;
}
export declare class GetIdeaIntent {
    execute(httpRequest: Request): Promise<AlexaResponse>;
}
export declare class AddIdeaIntent {
    execute(httpRequest: Request, alexaRequest: any): Promise<AlexaResponse>;
}
export declare class TestIntent {
    execute(httpRequest: Request): Promise<AlexaResponse>;
}
