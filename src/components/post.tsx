import React, { useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import Image from "next/image";
import { type postProps } from "types";
import { api } from "~/utils/api";

const duckMap = [
  '/crying.png', 
  '/happy.png',
  '/laugh.png',
  '/love.png',
  '/mad.png',
  '/wink.png'
];


const Post: React.FC<postProps> = ({ post }) => {
  const [ userImage, setUserImage ] = useState<string>('');
  api.users.getImage.useQuery(
    post.userId,
    {
      onSuccess: (data) => {
        console.log(data)
        setUserImage(data[0].image);
      }
    }
  );
  return(
    <div className = 'bg-slate-300 h-64 w-96 py-6 px-6 mb-6 flex items-center justify-around'>
      <Avatar.Root className="AvatarRoot">
        <Avatar.Image
          className="AvatarImage h-20 rounded-full border-2 border-gray-700 border-transparent hover:border-current"
          src={userImage}
          alt="Profile Picture"
        />
      </Avatar.Root>
      <Image 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        src = {duckMap[post.duckType]!}
        alt = 'duck image'
        height = {100}
        width = {100}
      />
    </div>
  );
};

export default Post;