import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";
import {
  type userInfo,
  type post,
  type userInfoData,
  type userPostData,
} from "types";
import Post from "~/components/Post";

const pageVariants = {
  initial: {
    x: "-100vw",
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    x: "100vw",
    transition: {
      duration: 0.5,
    },
  },
};

const User = () => {
  const { data: sessionData } = useSession();
  const [userData, setUserData] = useState<userInfo | null>(null);
  const [userPosts, setUserPosts] = useState<post[] | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const router = useRouter();
  const { id } = router.query;

  api.users.getUserInfo.useQuery(id as string, {
    onSuccess: (data: userInfoData) => {
      setUserData(data[0]!);
      console.log(data);
    },
  });
  api.posts.getUserPosts.useQuery(id as string, {
    onSuccess: (data: userPostData) => {
      setUserPosts(data);
      console.log("userPosts", data);
    },
  });
  api.users.getFollowing.useQuery(undefined, {
    onSuccess: (data) => {
      for (const d of data) {
        if (d.followingId === id) return setIsFollowing(true);
      }
      return setIsFollowing(false);
    },
  });

  const follow = api.users.followUser.useMutation().mutate;
  const followUser = () => {
    setIsFollowing(true);
    follow(id as string);
  };

  const unfollow = api.users.unfollowUser.useMutation().mutate;
  const unfollowUser = () => {
    setIsFollowing(false);
    unfollow(id as string);
  };

  return (
    <main className="big:justify-center flex min-h-screen w-screen flex-col items-center justify-start gap-1 bg-black pb-5 pt-16 text-white">
      {userData && (
        <div className="mt-5 w-1/3">
          <div className="flex ">
            <Avatar.Root className="AvatarRoot">
              <Avatar.Image
                className="AvatarImage h-100 rounded-full border-2 border-gray-700 border-transparent hover:border-current"
                src={userData.image}
                alt="Profile Picture"
              />
            </Avatar.Root>
            <div className="ml-6 flex flex-col justify-around">
              <p className="w-100 m-0 text-center text-3xl">{userData.name}</p>
              {userData.name === sessionData?.user.name ? null : isFollowing ? (
                <button
                  className="rounded bg-purple text-lg"
                  onClick={() => unfollowUser()}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="rounded bg-purple text-lg"
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          {/* <div className="mt-5 flex h-2/3 w-full flex-col items-center justify-center overflow-x-hidden overflow-y-scroll bg-purple"> */}
          {userPosts && userPosts.map((p) => <Post post={p} key={p.id} />)}
          {/* </div> */}
        </div>
      )}
    </main>
  );
};

export default User;
