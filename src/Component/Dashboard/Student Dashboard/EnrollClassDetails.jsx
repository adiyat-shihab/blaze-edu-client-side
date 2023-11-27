import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../Hooks/useAxiosPrivate.jsx";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { UseAuth } from "../../../Hooks/UseAuth.jsx";
import Swal from "sweetalert2";

export const EnrollClassDetails = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const param = useParams();
  const axiosSecure = useAxiosPrivate();
  const { userDetails } = UseAuth();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const { data } = useQuery({
    queryKey: ["studentAssignment", param.id],
    queryFn: async () => {
      return await axiosSecure.get(`/student/assignment/${param.id}`);
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      return axiosSecure.post(`/student/assignment/submit`, data);
    },
  });

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
    {
      render: (record) => {
        const assignmentDate = new Date(record?.date);

        const formattedCurrentDate = `${
          currentDate.getMonth() + 1
        }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

        const formattedCurrentDateObject = new Date(formattedCurrentDate);

        const isBeforeDeadline = formattedCurrentDateObject > assignmentDate;
        const data = {
          class_id: record?.class_id,
          assignment_id: record?._id,
          submission_date: formattedCurrentDate,
          student_email: userDetails?.email,
        };
        const handleSubmit = (data) => {
          mutation.mutate(data);
          if (mutation.data?.data?.message) {
            Swal.fire({
              icon: "error",
              title: mutation.data?.data?.message,
            });
          } else if (mutation.data?.data) {
            Swal.fire({
              icon: "success",
              title: "Assignment Submitted Successfully",
            });
          }
        };

        return (
          <>
            {isBeforeDeadline ? (
              <Button disabled>Submit</Button>
            ) : (
              <Button onClick={() => handleSubmit(data)}>Submit</Button>
            )}
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table dataSource={data?.data} columns={columns} />
    </>
  );
};
