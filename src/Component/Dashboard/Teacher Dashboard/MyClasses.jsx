import useAxiosOpen from "../../../Hooks/UseAxiosOpen.jsx";
import { useQuery } from "@tanstack/react-query";
import { UseAuth } from "../../../Hooks/UseAuth.jsx";
import { ClassCard } from "./ClassCard.jsx";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure.jsx";
import { Helmet } from "react-helmet";

export const MyClasses = () => {
  const { userDetails } = UseAuth();
  const axiosOpen = useAxiosOpen();
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["myClasses", userDetails?.email],
    queryFn: async () => {
      return await axiosSecure.get(`/class/${userDetails?.email}`);
    },
  });

  return (
    <>
      <Helmet>
        <title>Dashboard | My Class</title>
      </Helmet>
      <div className="grid grid-cols-1 py-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
        {data?.data?.map((item) => (
          <ClassCard key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};
