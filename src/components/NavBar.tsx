import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AiFillGithub } from "react-icons/ai";
import { IconContext } from "react-icons";
import Image from "next/image";

//Navbar, notice the styling changes based on screen size.  Check tailwind.config.ts for details on custom screen breakpoints
const NavBar = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="fixed z-40 flex h-16 w-screen items-center justify-start bg-slate-300 text-gray-900">
      <div className="flex h-16 w-screen items-center justify-start md:justify-center">
        <Link
          href="/"
          className="px-12 font-semibold text-black no-underline transition hover:underline"
        >
          <Image
            src="/line-logo.png"
            alt="ReDucks Logo"
            height={64}
            width={200}
          />
        </Link>
      </div>
      <AuthShowcase />
      {/* <Link
        href="https://github.com/Chang254/Reducks"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-10 top-0 z-50 flex h-16 items-center justify-center"
      >
        <IconContext.Provider value={{ size: "40px" }}>
          <AiFillGithub />
        </IconContext.Provider>
      </Link> */}
    </div>
  );
};

export default NavBar;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      !sessionData &&
      router.pathname !== "/" &&
      router.pathname !== "/DailySchedule" &&
      !router.pathname.includes("/details")
    ) {
      void router.push("/");
    }
  }, [sessionData, router]);

  return (
    <div className="fixed right-4 top-0 z-50 flex h-16 items-center justify-center gap-4 px-12">
      {/* {sessionData && (
        <span>Welcome, {sessionData.user?.name?.split(` `)[0]}!</span>
      )} */}

      {sessionData && (
        <Link href="/Profile">
          <Avatar.Root className="AvatarRoot">
            <Avatar.Image
              className="AvatarImage h-12 rounded-full border-2 border-gray-700 border-transparent hover:border-current"
              src={sessionData.user?.image as string}
              alt="Profile Picture"
            />
          </Avatar.Root>
        </Link>
      )}
      <button
        className="font-semibold text-black no-underline transition hover:underline"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
