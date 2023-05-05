import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Layout } from "~/components/layout";
import { PodcastList } from "~/components/podcastList";


const Home: NextPage = () => {
  const hello = api.podcast.hello.useQuery();

  return (
    <>
      <Head>
        <title>Podcaster</title>
        <meta name="description" content="Made by Rayaan <3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
          <h1 className="text-4xl font-semibold text-indigo-300 text-left">Home</h1>
          <h2 className="text-5 font-sans text-violet-500 py-2">Listen to your favourite podcasts</h2>
          <PodcastList podcasts={['1' , '2' , '3' , '4' , '5']}/>
      </Layout>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.podcast.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
