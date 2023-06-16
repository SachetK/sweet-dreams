import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import HeadComponent from "../../components/HeadComponent";
import NavigationBar from "../../components/NavigationBar";
import ButtonComponent from "../../components/ButtonComponent";
import { useRef, useState } from "react";
import Link from "next/link";
import { api } from "~/utils/api";
import { appRouter } from "~/server/api/root";
import { getServerAuthSession } from "~/server/auth";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelpers";

const Profile: NextPage = () => {
  const util = api.useContext();
  const userId = useRouter().query.userId as string;
  const { data: user } = api.user.byId.useQuery({ id: userId });
  const [hidden, setHidden] = useState<boolean>(true);
  const [bio, setBio] = useState<string>(user?.bio ?? "");
  const [allergy, setAllergy] = useState<string>("");
  const allergyRef = useRef<HTMLInputElement>(null);

  const updateAllergy = api.user.updateAllergies.useMutation({
    onSuccess: () => {
      util.user.byId.invalidate({ id: userId });
    },
  });
  const updateBio = api.user.updateBio.useMutation({
    onSuccess: () => {
      util.user.byId.invalidate({ id: userId });
    },
  });

  return (
    <>
      <main className="h-screen overflow-x-hidden bg-main">
        <HeadComponent
          title={"Sweet Dreams - Profile Page"}
          description={`Profile page for ${user?.name}`}
        />
        <div className="relative left-10 top-12 h-screen w-full md:bottom-4 md:left-12 md:top-8">
          <div className="absolute">
            <NavigationBar />
          </div>
          <h1 className="mb-4 text-center text-4xl font-bold">
            Hello {user?.name}!
          </h1>
          <section className="ml-12 flex flex-row items-center justify-center space-x-8">
            <Image
              src={user?.image ?? "/default.png"}
              alt="Profile picture"
              height={200}
              width={200}
              className="rounded-full"
            />
            <div className="flex w-1/4 flex-col items-center justify-center space-y-4">
              <div className="flex h-32 w-full items-center justify-center rounded-3xl bg-yellow align-middle">
                <p
                  className="h-full w-full rounded-3xl p-4 text-center text-lg font-bold"
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={(e) => {
                    setBio(e.currentTarget.textContent ?? "");
                  }}
                  onClick={(e) => {
                    e.currentTarget.textContent = bio;
                  }}
                >
                  {user?.bio ?? "No bio yet!"}
                </p>
              </div>
              <ButtonComponent
                text="Submit Changes"
                onClick={() => {
                  if (!bio) return;
                  else updateBio.mutateAsync({ bio: bio });
                }}
                color="bg-red"
                borderColor="border-dark-red"
              />
            </div>
            <div className="flex w-1/4 flex-col items-center justify-center space-y-4">
              <div className="flex h-32 w-full flex-col items-center overflow-auto rounded-3xl bg-yellow scrollbar-hide">
                <h3 className="p-4 text-center text-xl font-bold">
                  {" "}
                  Allergies{" "}
                </h3>
                <ol className="text-center text-lg">
                  {!user?.allergies?.toString()
                    ? "No allergies yet!"
                    : user?.allergies?.map((allergy) => (
                        <li key={allergy}>{allergy}</li>
                      ))}
                </ol>
              </div>
              <ButtonComponent
                text="Add allergies"
                onClick={() => setHidden(!hidden)}
                color="bg-red"
                borderColor="border-dark-red"
              />
            </div>
          </section>
          <section className="mx-[25%] mt-[10%] flex w-max flex-row items-center justify-center gap-6">
            <Link href="/profile/recipes">
                <ButtonComponent
                  text="Saved Recipes"
                  color="bg-purple"
                  borderColor="border-purple-dark"
                />
            </Link>

            <Link href="/history">
                <ButtonComponent
                  text="Recipe History"
                  color="bg-green"
                  borderColor="border-green-dark"
                />
            </Link>

            <Link href="/about">
                <ButtonComponent
                  text="Help & Contact"
                  color="bg-blue"
                  borderColor="border-blue-dark"
                />
            </Link>
          </section>
          <div
            className={`fixed left-0 top-0 h-screen w-screen backdrop-blur-lg ${
              hidden ? "hidden" : ""
            }`}
          >
            <div className="flex h-full items-center justify-center">
              <div
                className={`mt-8 flex h-1/3 w-1/3 flex-col items-center justify-center border-8 border-red bg-yellow`}
              >
                <p className="text-center text-lg font-bold">Add allergy:</p>
                <input
                  className="mt-4 h-1/4 w-1/2 rounded-3xl border-2 border-red p-2"
                  type="text"
                  placeholder="Allergy"
                  ref={allergyRef}
                  onChange={(e) => {
                    setAllergy(e.target.value);
                  }}
                />
                <div className="mt-4 flex w-32 flex-row items-center justify-center space-x-4">
                  <ButtonComponent
                    text="Submit"
                    onClick={() => {
                      if (!allergy || !allergyRef.current || !user) {
                        setHidden(!hidden);
                      } else {
                        allergyRef.current.value = "";
                        if (!user.allergies.includes(allergy)) {
                          updateAllergy.mutate({
                            allergies: [...user.allergies, allergy],
                          });
                        }
                        setHidden(!hidden);
                      }
                    }}
                    color="bg-red"
                    borderColor="border-dark-red"
                  />
                  <ButtonComponent
                    text="escape"
                    onClick={() => {
                      if (!allergyRef.current) setHidden(!hidden);
                      else allergyRef.current.value = "";
                      setHidden(!hidden);
                    }}
                    color="bg-red"
                    borderColor="border-dark-red"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(context);
  const userId = context.params?.userId as string;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const ssg = generateSSGHelper();

  try {
    await ssg.user.byId.fetch({ id: userId });
  } catch (error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      trpcState: ssg.dehydrate(),
      session,
    },
  };
};
