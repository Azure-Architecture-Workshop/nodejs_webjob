var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');
var EntryContext = require('./models/entryContext');

var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});
var entryContext = new EntryContext(docDbClient, config.databaseId, config.collectionId);
entryContext.init();

var querySpec = {
    query: 'SELECT * FROM root r WHERE r.completed=@completed',
    parameters: [{
        name: '@completed',
        value: false
    }]
};

entryContext.find(querySpec, function (err, items) {
    if (err) {
        throw (err);
    }

    console.log(items);
});