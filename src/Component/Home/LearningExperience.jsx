import { LazyLoadImage } from "react-lazy-load-image-component";

export const LearningExperience = () => {
  const containerStyle = {
    backgroundImage: 'url("https://i.ibb.co/TvGB2d4/Group-380.png")',
    backgroundRepeat: "no-repeat",
  };
  return (
    <div>
      <div
        className={
          "bg-[#FDF8EE] flex-col relative pb-8 lg:flex-row flex items-center justify-center gap-[10rem]"
        }
        style={containerStyle}
      >
        <div>
          <LazyLoadImage
            effect={"blur"}
            src={"https://i.ibb.co/0qnQbsP/OBJECTS-1.png"}
            className={"mt-14 lg:w-[440px]"}
          ></LazyLoadImage>
        </div>
        <div>
          <h1
            className={
              "text-4xl leading-10 px-6 xl:text-[4.3125rem] font-extrabold text-[#050C26] xl:leading-[5.82188rem]"
            }
          >
            Premium Learning <br />{" "}
            <span className={"text-[#FF7426]"}>Experience</span>
          </h1>
          <div className={"mt-[3.5rem] flex items-center px-8 gap-[1.44rem] "}>
            <div className={"bg-[#4D2C5E] p-[1.5rem]  rounded-full"}>
              <img src="https://i.ibb.co/WxMpyML/hearts-1.png" alt="" />
            </div>
            <div>
              {" "}
              <h2
                className={
                  " text-2xl xl:text-[1.875rem] text-[#050C26] font-medium  leading-loose xl:leading-[3.20625rem]"
                }
              >
                Easily Accessible
              </h2>
              <p
                className={
                  " text-xl xl:text-[1.225rem] text-[#8A8A8A] font-medium leading-loose xl:leading-[3.20625rem]"
                }
              >
                Learning Will fell Very Comfortable With Courslab.
              </p>
            </div>
          </div>
          <div
            className={"mt-[3.5rem] flex  gap-[1.44rem] px-8   items-center"}
          >
            <div className={"bg-[#4D2C5E] p-[1.5rem]  rounded-full"}>
              <img src="https://i.ibb.co/7zHy7mt/jigsaw-1.png" alt="" />
            </div>
            <div>
              <h2
                className={
                  " text-2xl xl:text-[1.875rem] text-[#050C26] font-medium  leading-loose xl:leading-[3.20625rem]"
                }
              >
                Fun learning experience
              </h2>
              <p
                className={
                  " text-xl xl:text-[1.225rem] text-[#8A8A8A] font-medium leading-loose xl:leading-[3.20625rem]"
                }
              >
                Learning Will fell Very Comfortable With Courslab
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
