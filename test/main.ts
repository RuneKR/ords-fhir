import {Server} from '../src/index';

export const server: Server = new Server({
    config: {
        domain: 'ords.io',
        limit_upload_mb: 1,
        port: 8000,
        whitelist: []
    },
    conformance: {
        date: new Date()
    }
});

