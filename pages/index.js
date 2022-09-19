import MeetupList from "../components/meetups/MeetupList";

import { MongoClient } from "mongodb"; // Server쪽에서 사용되는 패키지는 클라이언트 번들파일에 포함되지 않으므로 걱정말자

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  // fetch data
  const client = await MongoClient.connect("mongodb+srv://");
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  console.log(meetups);
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        description: meetup.description,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data and can use req.params or etc..

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
