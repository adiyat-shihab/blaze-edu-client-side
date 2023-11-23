import { LazyLoadImage } from "react-lazy-load-image-component";
import { Outline } from "../Component/Home/Outline.jsx";
import { Helmet } from "react-helmet";

export const Home = () => {
  const containerStyle = {
    backgroundImage: 'url("https://i.ibb.co/rMLnD8B/Group-327.png")',
  };
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div
        className={
          "lg:px-[12rem] z-0  relative  lg:py-44 gap-20 bg-[#FDF8EE] flex flex-col md:flex-row justify-between items-center  "
        }
        style={containerStyle}
      >
        <div className={""}>
          <h1 className={"font-extrabold text-[4.3125rem] mb-6 leading-[5rem]"}>
            The <span className={"text-[#FF7426]"}>Smart</span> <br /> Choice
            For <span className={"text-[#FF7426]"}>Future</span>
          </h1>
          <p className={"text-[#8A8A8A] text-[1.25rem] font-medium"}>
            Elearn is a global training provider based across the UK that
            specialises in accredited and bespoke training courses. We crush{" "}
            the...
          </p>
        </div>
        <LazyLoadImage
          effect={"blur"}
          src="https://i.ibb.co/LktrVw3/OBJECTS.png"
          alt=""
        />
      </div>
      <div
        className={
          "lg:mx-[15.25rem] relative  -mt-[7.15rem] z-50  flex py-[4.38rem] gap-[3.3rem] rounded-[0.875rem] bg-[#4D2C5E] lg:px-[2.5rem]"
        }
      >
        <Outline
          image={"https://i.ibb.co/xYMnHsK/online-test-1.png"}
          heading={"Learn The Latest Skills"}
          body={
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a BC, making it over 2000 years old."
          }
        />
        <Outline
          image={"https://i.ibb.co/QcnH6rx/exam-1.png"}
          heading={"Get Ready For a Career"}
          body={
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a BC, making it over 2000 years old."
          }
        />
        <Outline
          image={"https://i.ibb.co/yqLWvQh/certification-1.png"}
          heading={"Earn a Certificate"}
          body={
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a BC, making it over 2000 years old."
          }
        />
      </div>
    </div>
  );
};
