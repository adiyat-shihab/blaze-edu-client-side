import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../Hooks/UseAxiosOpen.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "antd";

export const CourseSection = () => {
  const axiosOpen = useAxiosOpen();
  const { data } = useQuery({
    queryKey: ["courseSection"],
    queryFn: async () => {
      return await axiosOpen.get("/get/sort/enrollment");
    },
  });

  return (
    <>
      <div className={"pt-[3.92rem] relative"}>
        <img
          alt={"casual-life-3d-idea-lamp-1"}
          className={"absolute left-6 top-0"}
          src={"https://i.ibb.co/xztgjYt/casual-life-3d-idea-lamp-1.png"}
        />
        <img
          alt={"casual-life-3d-idea-lamp-1"}
          className={"absolute right-6 top-0"}
          src={"https://i.ibb.co/BZ46Dm1/Group-1.png"}
        />
        <div className={"text-center  mb-[4.03rem] space-y-[0.57rem]"}>
          <h1 className={"text-[3.125rem] font-semibold uppercase"}>
            Our Courses
          </h1>
          <p className={"text-[1.25rem] font-medium text-[#8A8A8A] "}>
            Learn From most of our student like
          </p>
        </div>
        <div className={"lg:px-24 cursor-pointer px-12 relative pb-32"}>
          <Swiper
            spaceBetween={50}
            slidesPerView={4}
            breakpoints={{
              465: {
                slidesPerView: 1,
              },

              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {data?.data?.map((item) => (
              <SwiperSlide key={item.id}>
                <CourseSectionData data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

const CourseSectionData = (data) => {
  return (
    <>
      <div>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <LazyLoadImage
            className="p-8 w-[380px] rounded-lg h-[230px] overflow-hidden "
            src={data.data.photo}
            alt="product image"
          />

          <div className="px-5 pb-5 space-y-4">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {data.data.title}
            </h5>
            <p
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "400px",
              }}
            >
              {data.data.description}
            </p>
            <div className="flex items-center justify-between">
              <div className={"flex items-center gap-1"}>
                <UserOutlined className={"font-extrabold"} />
                <p className={"text-black"}>{data.data.name}</p>
              </div>
              <span className="text-1xl font-bold text-gray-900 dark:text-white">
                {data.data.enrollCount} Enrolled
              </span>
            </div>{" "}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ${data.data.price}
              </span>
              <div className={"flex items-center gap-1"}>
                <Link to={`/single/class/${data.data._id}`}>
                  <Button>Enroll</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
