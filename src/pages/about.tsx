import type { NextPage } from "next";
import HeadComponent from "../components/HeadComponent";
import HeadingBanner from "../components/HeadingBanner";
import NavigationBar from "../components/NavigationBar";
import Image from "next/image";
import JiaXi from "../../public/profile/JiaXi.jpg";
import Sachet from "../../public/profile/Sachet.jpg";
import Anthony from "../../public/profile/Anthony.jpg";
import Sakash from "../../public/profile/Sakash.jpg";
import Link from "next/link";
import ButtonComponent from "../components/ButtonComponent";

const About: NextPage = () => {
  return (
    <main className="h-screen overflow-x-hidden bg-main">
      <NavigationBar />

      {/* about the creators part */}

      <div className="space-y-24">
        <div className="ml-52 mt-11">
          <HeadComponent
            title="Sweet Dreams - About"
            description="About Page for Sweet Dreams App"
          />
          <HeadingBanner title="About the Creators" />
          <div className="mt-16 flex w-full flex-col justify-center space-y-11">
            <div className="flex flex-row space-x-8 text-lg">
              <div className="flex-none">
                <Image
                  src={JiaXi}
                  alt="JiaXi"
                  height={300}
                  width={225}
                  priority={true}
                />
              </div>
              <p>
                Jia Xi Lin is a junior at Northwest High School. During the
                development of the app, she was the lead designer. Outside of
                the project, she enjoys eating weet fruits and listening to
                music.
              </p>
            </div>
            <div className="flex flex-row space-x-8 text-lg">
              <div className="flex-none">
                <Image
                  src={Sachet}
                  alt="Sachet"
                  height={300}
                  width={225}
                  priority={true}
                />
              </div>
              <p>
                Sachet Korada is a junior at Poolesville High School. While
                working on the project, he was the lead programmer. Outside of
                the project, he enjoys to taekwondo and play video games.
              </p>
            </div>
            <div className="flex flex-row space-x-8 text-lg">
              <div className="flex-none">
                <Image
                  src={Anthony}
                  alt="Anthony"
                  height={300}
                  width={225}
                  priority={true}
                />
              </div>
              <p>
                Anthony Wang is a junior at Northwest High School. Throughout
                the project, he was a main designer of the user interface and
                researcher. During his free time, Anthony likes to play rhythm
                games and practice archery.
              </p>
            </div>
            <div className="flex flex-row space-x-8 text-lg">
              <div className="flex-none">
                <Image
                  src={Sakash}
                  alt="Sakash"
                  height={300}
                  width={225}
                  priority={true}
                />
              </div>
              <p>
                Sakash Khanna is a junior at Northwest High School. During the
                development of the project, he was both a programmer and
                reseracher. Outside of meeting times, he likes playing chess,
                biking, and playing badminton.
              </p>
            </div>
          </div>
        </div>

        {/* help and contact part  */}

        <div className="ml-52 mt-11">
          <HeadingBanner title="Help & Contact" />

          <div className="my-9 mt-16 flex w-full flex-col justify-center space-y-11">
            <Link href="https://forms.gle/us876ECE2DekAEwMA">
              <ButtonComponent
                text="Link to contact form"
                color="bg-blue"
                borderColor="border-blue-dark"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
