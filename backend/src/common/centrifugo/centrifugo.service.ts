import { Injectable } from '@nestjs/common';
import {CentClient} from 'cent.js'

@Injectable()
export class CentrifugoService {
    public centrifugoClient: CentClient;

    onModuleInit() {
        const apiKey = process.env.CENTRIFUGO_HTTP_API_KEY;
        const port = process.env.CENTRIFUGO_HTTP_SERVER_PORT;
        const host = process.env.CENTR_HOST ?? 'localhost';
        console.log(apiKey);
        this.centrifugoClient = new CentClient({
            url:`http://${host}:${port}/api`,
            apiKey,
            },
        );

    }

}