import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";
import { type post } from "types";
import Post from "~/components/Post";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [duckType, setDuckType] = useState<number>(1);
  const [posts, setPosts] = useState<post[]>([]);
  const { data: sessionData } = useSession();
  const createPost = api.posts.createPost.useMutation({
    onSuccess: () => void refetchPosts(),
  }).mutate;
  const { refetch: refetchPosts } = api.posts.getPost.useQuery(undefined, {
    onSuccess: (data: post[]) => {
      setPosts(data);
    },
  });
  const duckMap = {
    0: "/crying.png",
    1: "/happy.png",
    2: "/laugh.png",
    3: "/love.png",
    4: "/mad.png",
    5: "/wink.png",
  };
  const searchMap = {
    crying: 1,
    happy: 2,
    laugh: 3,
    love: 4,
    mad: 5,
    wink: 6,
  };

  const makePost = () => {
    createPost({ duckType: duckType });
  };

  return (
    <>
      <Head>
        <title>Reducks</title>
        <meta name="description" content="Duck themed messaging board" />
        <link rel="icon" href="/Logo.png" />
      </Head>
      <main className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-black text-white">
        {sessionData && (
          <div className="justify-betweenborder-b-2 mt-32 flex">
            <Avatar.Root className="AvatarRoot">
              <Avatar.Image
                className="AvatarImage mr-4 h-16 rounded-full  border-gray-700 border-transparent"
                src={sessionData.user?.image as string}
                alt="Profile Picture"
              />
            </Avatar.Root>
            <div className="mb-5 flex flex-col">
              <p className="text-2xl">What duck are you?</p>
              <div className="flex justify-center">
                <select
                  className="mr-5 rounded bg-slate-400"
                  onChange={(e) => setDuckType(Number(e.target.value))}
                >
                  <option value={0}>Crying</option>
                  <option value={1}>Happy</option>
                  <option value={2}>Laughing</option>
                  <option value={3}>Heart Eyes</option>
                  <option value={4}>Mad</option>
                  <option value={5}>Wink</option>
                </select>
                <button
                  className="bg-gray rounded hover:text-slate-300"
                  onClick={() => makePost()}
                >
                  Make Post
                </button>
              </div>
            </div>
          </div>
        )}

        {posts.length > 0 && posts.map((p) => <Post post={p} key={p.id} />)}
      </main>
    </>
  );
};

export default Home;
