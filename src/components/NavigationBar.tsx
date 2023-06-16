import Image from "next/image";
import homeIcon from "../../public/nav-home-icon.png";
import searchIcon from "../../public/nav-search-icon.png";
import profileIcon from "../../public/nav-person-icon.png";
import insertIcon from "../../public/nav-insert-icon.png";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavigationBar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed inset-x-10 top-1/2 flex h-96 w-16 -translate-y-1/2 flex-col items-center justify-center gap-3 rounded-full bg-pink md:h-4/5 md:w-24 md:space-y-4">
      <Link href="/feed" className="relative w-full">
        <Image
          src={homeIcon}
          layout="intrinsic"
          height={homeIcon.height}
          width={homeIcon.width}
          alt="Navigation bar"
        />
      </Link>
      <Link href="/search" className="relative w-full">
        <Image
          src={searchIcon}
          layout="intrinsic"
          height={searchIcon.height}
          width={searchIcon.width}
          alt="Navigation bar"
        />
      </Link>
      <Link href="/new">
        <div className="relative w-full">
          <Image
            src={insertIcon}
            layout="intrinsic"
            height={insertIcon.height}
            width={insertIcon.width}
            alt="Navigation bar"
          />
        </div>
      </Link>
      <Link href={`/profile/${session?.user?.id}`}>
        <div className="relative w-full">
          <Image
            src={profileIcon}
            layout="intrinsic"
            height={profileIcon.height}
            width={profileIcon.width}
            alt="Navigation bar"
          />
        </div>
      </Link>
    </div>
  );
};

export default NavigationBar;
