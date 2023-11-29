import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../Hooks/UseAxiosOpen.jsx";
import { Avatar, Card, Rate } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Feedback = () => {
  const axiosOpen = useAxiosOpen();
  const { data } = useQuery({
    queryKey: "feedback",
    queryFn: async () => {
      const { data } = await axiosOpen.get("/get/public/feedback");
      return data;
    },
  });
  return (
    <div className={"relative py-32"}>
      {" "}
      <div>
        <h1 className={"text-center text-[2.5rem] uppercase font-semibold"}>
          What student’s say
        </h1>
      </div>
      <LazyLoadImage
        src="https://i.ibb.co/zX2wfHb/Group-2.png"
        className={"absolute left-6 bottom-6 "}
      />
      <LazyLoadImage
        src="https://i.ibb.co/cNz4mh2/casual-life-3d-orange-planet-with-disk-1.png"
        className={"absolute right-6 top-6 "}
      />
      <LazyLoadImage
        src="https://i.ibb.co/sJBCbGW/Ellipse-27.png"
        className={"absolute left-0 top-0 "}
      />
      <LazyLoadImage
        src="https://i.ibb.co/mXJDypX/Ellipse-27-1.png"
        className={"absolute right-0 top-0 "}
      />
      <div
        className={
          "xl:px-96 md:grid-cols-2 grid-cols-1 xl:grid-cols-3 grid justify-items-center py-32"
        }
      >
        {data?.map((data) => (
          <div className={""}>
            {" "}
            <Card
              title={`Course Name : ${data.class_title}`}
              style={{ width: 300 }}
              className={"shadow-lg"}
            >
              <div className={"flex gap-2 items-center"}>
                <Avatar src={data.student_photo} />
                <h2>{data.student_name}</h2>
              </div>
              <p className={"mt-4 bg-gray-100  italic p-3"}>
                "{data.student_feedback}"
                <p className={"flex justify-end mt-2"}>
                  <Rate disabled value={data.rating} />
                </p>
              </p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
