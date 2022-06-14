import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import {Fragment} from "react";
import {Head} from "next/document";


const NewMeetupPage = () => {
    const router = useRouter();

    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.push('/').then();
    };

    return <Fragment>
        <Head>
            <title>Add new meetup</title>
            <meta name='description' content='Add new meetup'/>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
};

export default NewMeetupPage;
