import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectID} from "mongodb";
import {Fragment} from "react";
import Head from "next/head";


const MeetupDetailsPage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description}/>
            </Head>
            <MeetupDetail image={props.meetupData.image}
                          title={props.meetupData.title}
                          address={props.meetupData.address}
                          description={props.meetupData.description}
            />
        </Fragment>
        );
};

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://dattocngan:doitruong@cluster0.ptlub.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({},{_id: 1}).toArray();

    client.close().then();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() }}))
    }
}

export async function getStaticProps(context) {
    //fetch data for a single meetup

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://dattocngan:doitruong@cluster0.ptlub.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectID(meetupId)});

    client.close().then();

    console.log(selectedMeetup);

    const {_id, ...remainingSelectedMeetup} = selectedMeetup;

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                ...remainingSelectedMeetup
            }
        },
        revalidate: 1
    };
}

export default MeetupDetailsPage;
