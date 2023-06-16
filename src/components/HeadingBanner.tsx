type HeadingBannerProps = {
  title: string;
};

const HeadingBanner: React.FC<HeadingBannerProps> = ({ title }) => {
  return (
    <>
      <div className="w-max bg-red clip-path-heading">
        <p className="mx-6 p-3 text-center font-sans text-xl font-medium text-white">
          {title}
        </p>
      </div>
    </>
  );
};

export default HeadingBanner;
