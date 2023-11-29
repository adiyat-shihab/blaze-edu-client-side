import { LazyLoadImage } from "react-lazy-load-image-component";
import { Card, Statistic } from "antd";
import CountUp from "react-countup";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../Hooks/UseAxiosOpen.jsx";

export const StudentStatic = () => {
  const axiosOpen = useAxiosOpen();

  const { data } = useQuery({
    queryKey: ["studentStatic"],
    queryFn: async () => {
      return await axiosOpen.get("/public/statistic");
    },
  });

  const formatter = (value) => (
    <CountDelay end={value} duration={3} delay={0.5} />
  );
  return (
    <>
      <h1
        className={
          "text-[3.125rem] text-center mt-10  text-gray-600 font-semibold uppercase"
        }
      >
        Our Statistic
      </h1>
      <div
        className={
          "flex flex-col lg:flex-row items-center  justify-center gap-36 py-24 "
        }
      >
        <div>
          <Card
            className={"bg-[#FDF8EE] drop-shadow-md"}
            style={{
              width: 400,
            }}
          >
            <div className={"flex items-center justify-center gap-14"}>
              <Statistic
                className={"font-bold"}
                title="Total User"
                value={data?.data?.totalUser}
                formatter={formatter}
              />
              <Statistic
                className={"font-bold"}
                title="Total classes"
                value={data?.data?.totalClass}
                formatter={formatter}
              />
            </div>
            <div className={"flex justify-center mt-6"}>
              {" "}
              <Statistic
                className={"font-bold"}
                title="Total enrollment"
                value={data?.data?.totalEnrollment}
                formatter={formatter}
              />
            </div>
          </Card>
        </div>
        <div className="bg-gray-100 hidden lg:block w-[3px] h-[500px] mx-4"></div>
        <div>
          <LazyLoadImage
            effect="blur"
            className={"w-[500px]"}
            src={
              "https://i.ibb.co/Ry6FKTq/Students-watching-webinar-on-computer-ai.png"
            }
          />
        </div>
      </div>
    </>
  );
};

const CountDelay = ({ end, duration, delay }) => {
  const countUpRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    observer.observe(countUpRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={countUpRef}>
      {isVisible && <CountUp end={end} duration={duration} delay={delay} />}
    </div>
  );
};
