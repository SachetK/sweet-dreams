import type { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import HeadComponent from "../../components/HeadComponent";
import NavigationBar from "../../components/NavigationBar";
import ButtonComponent from "../../components/ButtonComponent";
import { useState } from "react";
import Link from "next/link";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelpers";

const Profile: NextPage<{ userId: string }> = ({ userId }) => {
  const {
    data: session,
    status,
    update,
  } = useSession({
    required: true,
  });

  const { data: user } = api.user.byId.useQuery({ id: userId });

  const [hidden, setHidden] = useState<boolean>(true);
  const [bio, setBio] = useState<string>(user?.bio ?? "");

  const updateBio = api.user.updateBio.useMutation({
    onSuccess: () => update(),
  });

  if (status === "loading") return <div>Loading...</div>;

  const isOwner = session.user.id === userId;

  return (
    <main className="h-screen overflow-x-hidden bg-main">
      <HeadComponent
        title={"Sweet Dreams - Profile Page"}
        description={`Profile page for ${user?.name ?? "user"}`}
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
                contentEditable={isOwner}
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
            {isOwner && (
              <ButtonComponent
                text="Submit Changes"
                onClick={() => {
                  if (!bio) return;
                  else void updateBio.mutateAsync({ bio });
                }}
                color="bg-red"
                borderColor="border-dark-red"
              />
            )}
          </div>
          <div className="flex w-1/4 flex-col items-center justify-center space-y-4">
            <div className="flex h-32 w-full flex-col items-center overflow-auto rounded-3xl bg-yellow scrollbar-hide">
              <h3 className="p-4 text-center text-xl font-bold">Allergies</h3>
              <ol className="text-center text-lg">
                {!user?.allergies?.toString()
                  ? "No allergies yet!"
                  : user?.allergies?.map((allergy) => (
                      <li key={allergy}>{allergy}</li>
                    ))}
              </ol>
            </div>
            {isOwner && (
              <ButtonComponent
                text="Add allergies"
                onClick={() => setHidden(!hidden)}
                color="bg-red"
                borderColor="border-dark-red"
              />
            )}
          </div>
        </section>
        <section className="mx-[25%] mt-[10%] flex w-max flex-row items-center justify-center gap-6">
          <Link href={`/${userId}/recipes`}>
            <ButtonComponent
              text="Saved Recipes"
              color="bg-purple"
              borderColor="border-purple-dark"
            />
          </Link>

          {isOwner && (
            <Link href="/history">
              <ButtonComponent
                text="Recipe History"
                color="bg-green"
                borderColor="border-green-dark"
              />
            </Link>
          )}

          <Link href="/about">
            <ButtonComponent
              text="Help & Contact"
              color="bg-blue"
              borderColor="border-blue-dark"
            />
          </Link>
        </section>
        <NewAllergyModal
          toggleHide={() => {
            setHidden(!hidden);
            void update();
          }}
          hidden={hidden}
        />
      </div>
    </main>
  );
};

const NewAllergyModal: React.FC<{
  toggleHide: () => void;
  hidden: boolean;
}> = ({ toggleHide, hidden }) => {
  const updateAllergy = api.user.updateAllergies.useMutation({
    onSuccess: () => toggleHide(),
  });

  return (
    <section
      className={`fixed left-0 top-0 h-screen w-screen backdrop-blur-lg ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="flex h-full items-center justify-center">
        <form
          className="mt-8 flex h-1/3 w-1/3 flex-col items-center justify-center border-8 border-red bg-yellow"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();

            const formRes = Object.fromEntries(
              new FormData(e.currentTarget).entries()
            );

            const maybeAllergy = z
              .object({
                allergy: z.string().nonempty(),
              })
              .safeParse(formRes);

            if (!maybeAllergy.success) {
              toggleHide();
              return;
            }

            void updateAllergy.mutateAsync(maybeAllergy.data.allergy);
          }}
        >
          <p className="text-center text-lg font-bold">Add allergy:</p>
          <input
            className="mt-4 h-1/4 w-1/2 rounded-3xl border-2 border-red p-2"
            type="text"
            placeholder="Add allergy"
            id="allergy"
            name="allergy"
          />
          <div className="mt-4 flex w-32 flex-row items-center justify-center space-x-4">
            <ButtonComponent
              text="Submit"
              type="submit"
              color="bg-red"
              borderColor="border-dark-red"
            />
            <ButtonComponent
              text="Escape"
              onClick={() => toggleHide()}
              color="bg-red"
              borderColor="border-dark-red"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export const getStaticPaths = async () => {
  const ssg = generateSSGHelper();

  const users = await ssg.user.all.fetch();

  return {
    paths: users.map((user) => ({
      params: {
        userId: user.id,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const ssg = generateSSGHelper();

  const parsedSlug = z.string().cuid().safeParse(context.params?.userId);

  if (!parsedSlug.success) {
    return {
      notFound: true,
      redirect: {
        destination: "/feed",
        permanent: false,
      },
    };
  }

  try {
    await ssg.user.byId.fetch({ id: parsedSlug.data });
    return {
      props: {
        trpcState: ssg.dehydrate(),
        userId: parsedSlug.data,
      },
    };
  } catch (e) {
    return {
      notFound: true,
      redirect: {
        destination: "/feed",
        permanent: false,
      },
    };
  }
};

export default Profile;
