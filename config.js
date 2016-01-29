var config = {}

config.host = process.env.DocumentDBURI || "[the URI value from the DocumentDB Keys blade on http://portal.azure.com]";
config.authKey = process.env.DocumentDBAuthKey || "[the PRIMARY KEY value from the DocumentDB Keys blade on http://portal.azure.com]";
config.databaseId = "EntryList";
config.collectionId = "Items";

module.exports = config;
