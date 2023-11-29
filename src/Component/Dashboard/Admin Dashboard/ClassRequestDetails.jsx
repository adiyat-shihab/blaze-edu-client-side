import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../Hooks/useAxiosPrivate.jsx";
import { Avatar, Card, Empty, Rate } from "antd";

export const ClassRequestDetails = () => {
  const param = useParams();
  const axiosSecure = useAxiosPrivate();
  const { data } = useQuery({
    queryKey: ["classRequestDetails", param.id],
    queryFn: async () => {
      return await axiosSecure.get(`/get/student/feedback/${param.id}`);
    },
  });
  return (
    <>
      <div className={"py-32"}>
        {data?.data.length ? (
          data?.data.map((data) => (
            <div className={"gird grid-cols-2"}>
              {" "}
              <Card style={{ width: 300 }}>
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
          ))
        ) : (
          <div className={"my-52"}>
            <Empty description={"No Feedback Found"} />
          </div>
        )}
      </div>
    </>
  );
};
