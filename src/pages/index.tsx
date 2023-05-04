import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Layout } from "~/components/layout";


const Home: NextPage = () => {
  const hello = api.podcast.hello.useQuery();

  return (
    <>
      <Head>
        <title>Podcaster</title>
        <meta name="description" content="Made by Rayaan <3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] ml-auto mr-auto ">
        <Layout>
          <h1 className="text-3xl font-semibold text-indigo-300 text-left">Home</h1>
          <h2 className="text-5 font-sans text-cyan-600 py-2">Listen to your favourite podcasts</h2>
        </Layout>
      </main>
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
