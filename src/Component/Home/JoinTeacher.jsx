import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, ConfigProvider } from "antd";
import { Link } from "react-router-dom";

export const JoinTeacher = () => {
  const containerStyle = {
    backgroundImage: 'url("https://i.ibb.co/rMLnD8B/Group-327.png")',
  };
  return (
    <>
      <div
        className={
          "flex flex-col bg-[#FDF8EE]  lg:flex-row items-center py-28 px-6 gap-20 xl:px-36"
        }
        style={containerStyle}
      >
        <LazyLoadImage
          effect="blur"
          src="https://i.ibb.co/1zf19JP/teacher-2.png"
          alt=""
          width="800"
        />
        <div className={"space-y-10"}>
          <h1 className={"xl:text-6xl text-4xl font-bold text-[#FF7426]"}>
            Join As A Teacher
          </h1>
          <p
            className={
              " text-[1rem] xl:text-[1.225rem] text-[#8A8A8A] font-medium leading-9 "
            }
          >
            Instructors from around the world teach millions of learners <br />{" "}
            on Blaze Edu. We provide the tools and skills to teach what you
            love.
          </p>
          <ConfigProvider
            theme={{
              token: {
                colorPrimaryHover: "#FF7426",
                colorPrimaryActive: "#FF7426",
              },
            }}
          >
            <Button
              className={"bg-[#FF7426] font-medium h-12 text-[16px] "}
              type="primary"
            >
              <Link to={"/teacher/apply"}> Start Teaching Today</Link>
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};
