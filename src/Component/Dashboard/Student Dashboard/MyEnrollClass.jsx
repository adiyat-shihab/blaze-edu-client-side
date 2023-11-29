import { useAxiosPrivate } from "../../../Hooks/useAxiosPrivate.jsx";
import { useQuery } from "@tanstack/react-query";
import { UseAuth } from "../../../Hooks/UseAuth.jsx";
import { AllClass } from "../../../Page/AllClass.jsx";
import { StudentEnrollCard } from "./StudentEnrollCard.jsx";
import { Empty } from "antd";

export const MyEnrollClass = () => {
  const { userDetails } = UseAuth();
  const axiosSecure = useAxiosPrivate();
  const { data: dataTwo } = useQuery({
    queryKey: ["getenrollData"],
    queryFn: async () => {
      return await axiosSecure.get(`/student/enrollment/${userDetails?.email}`);
    },
  });
  return (
    <>
      <div>
        {dataTwo?.data.length ? (
          <div className={"grid gap-16 py-24 grid-cols-3"}>
            {dataTwo?.data?.map((card) => (
              <StudentEnrollCard item={card} key={card._id} />
            ))}
          </div>
        ) : (
          <div className={"py-32"}>
            <Empty description={"No Class Found"} className={"mt-32"} />
          </div>
        )}
      </div>
    </>
  );
};
