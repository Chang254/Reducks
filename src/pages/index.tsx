import { useState } from "react"
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { type post } from "types";
import Post from "~/components/post";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [duckType, setDuckType] = useState<number>(1);
  const [posts, setPosts] = useState<post[]>([]);
  const createPost = api.posts.createPost.useMutation({onSuccess: () => void refetchPosts()}).mutate;
  const { refetch: refetchPosts} = api.posts.getPost.useQuery(
    undefined,
    {
      onSuccess: (data: post[]) => {
        setPosts(data);
      }
    }
  );
  const duckMap = {
    1: '/crying.png',
    2: '/happy.png',
    3: '/laugh.png',
    4: '/love.png',
    5: '/mad.png',
    6: '/wink.png'
  }
  const searchMap = {
    'crying': 1,
    'happy': 2,
    'laugh': 3,
    'love': 4,
    'mad': 5,
    'wink': 6,
  }

  const makePost = () => {
    createPost({duckType: duckType});
  };
  

  return (
    <>
      <Head>
        <title>Reducks</title>
        <meta name="description" content="Duck themed messaging board" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center">
       Feed
  
        <select onChange = {(e) => setDuckType(Number(e.target.value))}>
          <option value={1}>Crying</option>
          <option value={2}>Happy</option>
          <option value={3}>Laughing</option>
          <option value={4}>Heart Eyes</option>
          <option value={5}>Mad</option>
          <option value={6}>Wink</option>
        </select>
        <button onClick = {() => makePost()}>Make Post</button>
        <div className = 'h-2/3 w-2/3 bg-purple flex flex-col items-center justify-center overflow-y-scroll'>
          {posts.length > 0 &&
          posts.map((p) => (
            <Post post = {p} key = {p.id}/>
          ))}
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


  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
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
