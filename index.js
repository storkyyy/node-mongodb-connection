const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);
    console.log('Connected correctly to server');

    const db = client.db(dbname);
    
    //Delete documents in campsite collection (not normal, just for testing)
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);

        console.log('Dropped collection', result);

        dboper.insertDocument(db, {name: 'Breadcrumb Trail Campground', description: 'Test'}, 'campsites', result => {
            console.log('Insert Document', result.ops);

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found documents:', docs);

                dboper.updateDocument(db, { name: 'Breadcrumb Trail Campground' }, { description: 'Updated Test Description' }, 'campsites', result => {
                    console.log('Updated Document Count:', result.result.nModified);

                    dboper.findDocuments(db, 'campsites', docs => {
                        console.log('Found Documents:', docs);

                        dboper.removeDocument(db, { name: 'Breadcrumb Trail Campground'}, 'campsites', result => {
                            console.log('Deleted Documents Count:', result.deletedCount);
                            client.close();
                        });
                    });
                });
            });
        });
    });
});