import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, Input } from "antd";

export const NewsLetterSection = () => {
  return (
    <>
      <div>
        <div className={"py-24 relative"}>
          <LazyLoadImage
            className={"mx-auto h-80 md:h-auto"}
            src={"https://i.ibb.co/sVgYkQZ/Group-355.png"}
          />
          <div
            className={
              "absolute flex flex-col items-center top-[30%] md:top-[30%] md:left-[15%] lg:left-[25%] xl:top-[40%] xl:left-[37%]"
            }
          >
            <h1
              className={
                "text-center text-xl  lg:text-4xl mb-[0.81rem] font-bold text-white"
              }
            >
              Subscribe to our newsletter
            </h1>
            <p className={"text-center text-lg text-white mb-[2.57rem]"}>
              Sign up for our newsletter to get the latest updates and offers.
            </p>
            <div className={"relative"}>
              <Input
                placeholder={"Email Address"}
                className={
                  "lg:w-[34rem] h-[3rem] px-8 font-medium text-[#ACACAC] text-[1.25rem] lg:h-20 rounded-full"
                }
              />
              <Button
                className={
                  "bg-[#FF7426] absolute right-2 text-white rounded-full top-2 lg:w-[12.3125rem] lg:h-[4.125rem]"
                }
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
