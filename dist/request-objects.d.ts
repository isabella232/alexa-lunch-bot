export interface AlexaRequest {
    version: "1.0";
    session: any;
    context: {
        System: {
            device: {
                deviceId: string;
                supportedInterfaces: any;
            };
        };
    };
}
