import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, ConfigProvider } from "antd";

export const JoinTeacher = () => {
  return (
    <>
      <div
        className={"flex flex-col lg:flex-row items-center py-16 gap-20 px-36"}
      >
        <LazyLoadImage
          effect="blur"
          src="https://i.ibb.co/3z0NbQD/Untitled-design-7.png"
          alt=""
          width="800"
        />
        <div className={"space-y-16"}>
          <h1 className={"text-6xl font-bold text-[#FF7426]"}>
            Join As A Teacher
          </h1>
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
              Start Teaching Today
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};
