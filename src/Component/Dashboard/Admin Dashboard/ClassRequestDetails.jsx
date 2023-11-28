import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../Hooks/useAxiosPrivate.jsx";

export const ClassRequestDetails = () => {
  const param = useParams();
  const axiosSecure = useAxiosPrivate();
  const { data } = useQuery({
    queryKey: ["classRequestDetails", param.id],
    queryFn: async () => {
      return await axiosSecure.get(`/get/student/feedback/${param.id}`);
    },
  });
  console.log(data);
  return <></>;
};
