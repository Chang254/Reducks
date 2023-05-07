import React, { useState } from "react";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import Image from "next/image";
import { type postProps, type userImageData } from "types";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

const duckMap = [
  "/crying.png",
  "/happy.png",
  "/laugh.png",
  "/love.png",
  "/mad.png",
  "/wink.png",
];

const Post: React.FC<postProps> = ({ post }) => {
  const { data: sessionData } = useSession();
  const [userImage, setUserImage] = useState<string>("");
  api.users.getImage.useQuery(post.userId, {
    onSuccess: (data: userImageData) => {
      console.log(data);
      setUserImage(data[0]!.image);
    },
  });
  //Configure redux and filter out deleted post from feed posts state
  const deletePost = api.posts.deletePost.useMutation().mutate;
  return (
    <div className="relative mb-6 flex h-32 w-72 items-center justify-around bg-slate-300 px-6 py-6">
      <Link href={`/user/${post.userId}`}>
        <Avatar.Root className="AvatarRoot">
          <Avatar.Image
            className="AvatarImage h-20 rounded-full border-2 border-gray-700 border-transparent hover:border-current"
            src={userImage}
            alt="Profile Picture"
          />
        </Avatar.Root>
      </Link>
      <Image
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        src={duckMap[post.duckType]!}
        alt="duck image"
        height={100}
        width={100}
      />
      {sessionData && sessionData.user.id === post.userId ? (
        <button
          onClick={() => deletePost(post.id)}
          className="absolute right-2 top-2 text-black hover:text-red-500"
        >
          X
        </button>
      ) : null}
    </div>
  );
};

export default Post;
