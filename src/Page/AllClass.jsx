import useAxiosOpen from "../Hooks/UseAxiosOpen.jsx";
import { useQuery } from "@tanstack/react-query";
import { ClassAllCard } from "../Component/Dashboard/Student Dashboard/ClassAllCard.jsx";
import Search from "antd/es/input/Search.js";
import { Button } from "antd";
import { useState } from "react";
import { useAxiosPrivate } from "../Hooks/useAxiosPrivate.jsx";

export const AllClass = () => {
  const axiosOpen = useAxiosOpen();
  const axiosSecure = useAxiosPrivate();
  const query = useQuery({
    queryKey: ["getClass"],
    queryFn: async () => {
      return await axiosOpen
        .get("/class/filter/approve")
        .then((res) => setData(res.data));
    },
  });

  const [data, setData] = useState([]);
  const onSearch = (value, _e, info) => {
    axiosOpen.get(`/get/class/search?query=${value}`).then((res) => {
      setData(res.data);
    });
  };

  return (
    <>
      <div className={"flex max-w-sm ml-auto mt-10 pr-6 justify-end"}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton={<Button>Search</Button>}
        />
      </div>
      <div className="grid grid-cols-1 p-4 lg:p-36 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-12 w-full">
        {data?.map((item) => (
          <ClassAllCard item={item} />
        ))}
      </div>
    </>
  );
};
