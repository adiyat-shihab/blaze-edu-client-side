import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../Hooks/useAxiosPrivate.jsx";
import { Table } from "antd";

export const EnrollClassDetails = () => {
  const param = useParams();
  const axiosSecure = useAxiosPrivate();
  console.log(param);
  const { data } = useQuery({
    queryKey: ["studentAssignment", param.id],
    queryFn: async () => {
      return await axiosSecure.get(`/student/assignment/${param.id}`);
    },
  });
  console.log(data);
  const columns = [
    {
      title: "Assignment Title",
      dataIndex: "assignmentTitle",
      key: "assignmentTitle",
    },
    {
      title: "Deadline",
      dataIndex: "date",
      key: "deadline",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "address",
    },
  ];
  return (
    <>
      <Table dataSource={data?.data} columns={columns} />
    </>
  );
};
