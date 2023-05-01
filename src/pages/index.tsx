import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const createPost = api.posts.createPost.useMutation
  const getDucks = api.posts.getPost.useQuery()
  const duckMap = {
    1: '/crying.png',
    2: '/happy.png',
    3: '/laugh.png',
    4: '/love.png',
    5: '/mad.png',
    6: '/wink.png'
  }
  return (
    <>
      <Head>
        <title>Reducks</title>
        <meta name="description" content="Duck themed messaging board" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center">
       Feed
       <div className = 'h-2/3 w-2/3 bg-purple'>
        hello world
       </div>
       <br/>
       <br/>
       <AuthShowcase/>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
