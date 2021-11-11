const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

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

        const collection = db.collection('campsites');

        collection.insertOne({name: 'Breadcrumb Trail Campground', description: 'Test'}, (err, result) => {
            assert.strictEqual(err, null);

            console.log('Insert Document', result.ops);
            
            //nesting callbacks not necessarily the best
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            });

        });

    });


});