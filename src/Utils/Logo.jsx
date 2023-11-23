import { LazyLoadImage } from "react-lazy-load-image-component";

export const Logo = () => {
  return (
    <>
      <div className={" flex  items-center gap-8"}>
        <LazyLoadImage src="https://i.ibb.co/48ZN6dN/Group.png" effect="blur" />
        <h1 className="text-[#1D1D1D] font-bold text-[1.5rem]">Blaze Edu</h1>
      </div>
    </>
  );
};
