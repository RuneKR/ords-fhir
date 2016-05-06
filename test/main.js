var Server = require('../dist/index').Server;

// this is just for testing
new Server({
    config: {
        limit_upload_mb: 1,
        port: 8000,
        whitelist: []
    },
    modules: [],
    resources: []
});
