import {MongoClient} from 'mongodb';

//POST /api/new-meetup

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;


        const client = await MongoClient.connect('mongodb+srv://dattocngan:doitruong@cluster0.ptlub.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close().then();

        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;
