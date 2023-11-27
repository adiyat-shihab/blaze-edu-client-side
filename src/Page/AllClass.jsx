import useAxiosOpen from "../Hooks/UseAxiosOpen.jsx";
import { useQuery } from "@tanstack/react-query";
import { ClassAllCard } from "../Component/Dashboard/Student Dashboard/ClassAllCard.jsx";

export const AllClass = () => {
  const axiosOpen = useAxiosOpen();
  const { data: data1 } = useQuery({
    queryKey: ["getClass"],
    queryFn: async () => {
      return await axiosOpen.get("/class/filter/approve");
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 p-4 lg:p-36 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full">
        {data1?.data?.map((item) => (
          <ClassAllCard item={item} />
        ))}
      </div>
    </>
  );
};
