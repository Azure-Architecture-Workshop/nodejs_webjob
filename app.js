var DocumentDBClient = require('documentdb').DocumentClient;
var temporal = require("temporal");
var config = require('./config');
var EntryContext = require('./models/entryContext');

var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

var entryContext = new EntryContext(docDbClient, config.databaseId, config.collectionId);
entryContext.init(function (err) { }, startProcessing);

function startProcessing() {
        
    entryContext.getNextItems(5, function (err, items) {
        if (err) {
            throw (err);
        }

        console.log("Retrieved Entity Count: " + items.length);
        
        for (var i=0, tot=items.length; i < tot; i++) {
    
            console.log("Processing");
            console.log(items[i]);
            console.log("");

            entryContext.completeItem(items[i].id, function() {});

        }
    
        temporal.delay(5000, function() {
            startProcessing();
        });

    });
    
}