type HeadingBannerProps = {
  title: string;
};

const HeadingBanner: React.FC<HeadingBannerProps> = ({ title }) => {
  return (
    <>
      <div className="bg-red clip-path-heading w-max">
        <p className="mx-6 p-3 text-center font-sans text-xl font-medium text-white">
          {title}
        </p>
      </div>
    </>
  );
};

export default HeadingBanner;
