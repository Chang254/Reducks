import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";
import { type userInfo, type post } from "types";
import Post from "~/components/post";

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

  api.users.getUserInfo.useQuery(id, {
    onSuccess: (data) => {
      console.log(data);
      setUserData(data[0]);
    },
  });
  api.posts.getUserPosts.useQuery(id, {
    onSuccess: (data) => {
      console.log(data);
      setUserPosts(data);
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
    console.log("in follow");
    setIsFollowing(true);
    follow(id);
  };

  const unfollow = api.users.unfollowUser.useMutation().mutate;
  const unfollowUser = () => {
    setIsFollowing(false);
    unfollow(id);
  };

  return (
    <main className="big:justify-center flex min-h-screen w-screen flex-col items-center justify-start gap-1 bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-5 pt-16 text-white">
      {userData && (
        <div>
          {userData.name}
          <Avatar.Root className="AvatarRoot">
            <Avatar.Image
              className="AvatarImage h-100 rounded-full border-2 border-gray-700 border-transparent hover:border-current"
              src={userData.image}
              alt="Profile Picture"
            />
          </Avatar.Root>
          {isFollowing ? (
            <button onClick={() => unfollowUser()}>Unfollow</button>
          ) : (
            <button onClick={() => followUser()}>Follow</button>
          )}
          <div className="flex h-2/3 w-2/3 flex-col items-center justify-center overflow-y-scroll bg-purple">
            {userPosts && userPosts.map((p) => <Post post={p} key={p.id} />)}
          </div>
        </div>
      )}
    </main>
  );
};

export default User;
