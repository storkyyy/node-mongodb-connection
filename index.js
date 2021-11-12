const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected correctly to server');
        const db = client.db(dbname);
    
        //Delete documents in campsite collection (not normal, just for testing)
        db.dropCollection('campsites')
            .then(result => {console.log('Dropped collection', result)})
            .catch(err => console.log('No collection to drop.'));

        dboper.insertDocument(db, {name: 'Breadcrumb Trail Campground', description: 'Test'}, 'campsites')
            .then(result => {
                    console.log('Insert Document', result.ops)
                    return dboper.findDocuments(db, 'campsites')
            })
            .then(docs => {
                    console.log('Found documents:', docs)
                    return dboper.updateDocument(db, { name: 'Breadcrumb Trail Campground' }, { description: 'Updated Test Description' }, 'campsites')
            })
            .then(result => {
                    console.log('Updated Document Count:', result.result.nModified);
                    return dboper.findDocuments(db, 'campsites') 
            })
            then(docs => {
                    console.log('Found Documents:', docs);
                    return dboper.removeDocument(db, { name: 'Breadcrumb Trail Campground'}, 'campsites')
            })
            .then(result => {
                    console.log('Deleted Documents Count:', result.deletedCount);
                    return client.close();
            })
            .catch(err => {
                console.log(err)
                client.close();
            });
    })
.catch(err => console.log(err));