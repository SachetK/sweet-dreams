import type { NextPage } from "next";
import Image from "next/image";
import homeImage from "../../public/sweet-dreams-main.png";
import HeadComponent from "../components/HeadComponent";
import ButtonComponent from "../components/ButtonComponent";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <HeadComponent title="Sweet Dreams" description="Sweet Dreams app" />

      <main className="bg-main">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex-initial">
            <Image
              src={homeImage}
              alt="Home page image"
              height={homeImage.height}
              width={homeImage.width}
              priority={true}
            />
          </div>
          {!session ? (
            <div
              onClick={() => void signIn("google", { callbackUrl: "/feed" })}
            >
              <ButtonComponent
                text="Sign in with Google"
                color="bg-pink"
                borderColor="border-pink-dark"
              />
            </div>
          ) : (
            <Link href="/feed">
              <ButtonComponent
                text="Find your favorite recipes!"
                color="bg-pink"
                borderColor="border-pink-dark"
              />
            </Link>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
