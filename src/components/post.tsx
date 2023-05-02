import React from "react";
import Image from "next/image";
import { type postProps } from "types";

const duckMap = {
  1: '/crying.png',
  2: '/happy.png',
  3: '/laugh.png',
  4: '/love.png',
  5: '/mad.png',
  6: '/wink.png'
};

const Post: React.FC<postProps> = ({ post }) => {

  return(
    <div className = 'bg-slate-300 h-64 w-96 py-6 px-6 mb-6'>
      {post.id}
      <Image 
        src = {duckMap[post.duckType]}
        alt = 'duck image'
        height = {100}
        width = {100}
      />
    </div>
  );
};

export default Post;