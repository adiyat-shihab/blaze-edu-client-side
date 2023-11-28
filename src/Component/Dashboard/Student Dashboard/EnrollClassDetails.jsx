import { useLoaderData, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../Hooks/useAxiosPrivate.jsx";
import { Button, Input, Modal, Rate, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { UseAuth } from "../../../Hooks/UseAuth.jsx";
import Swal from "sweetalert2";
import TextArea from "antd/es/input/TextArea.js";

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
  const mutationFeedback = useMutation({
    mutationFn: (data) => {
      return axiosSecure.post(`/student/feedback`, data);
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Feedback Send Successfully",
      });
    },
  });

  const { data: feedBack } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      return await axiosSecure.get(`/student/class/single/${param.id}`);
    },
  });

  const handleFeedbackMutate = () => {
    const data = {};
    data.student_email = userDetails.email;
    data.student_feedback = feedback;
    data.class_id = param.id;
    data.rating = rating;
    data.class_title = feedBack.data.title;
    data.student_photo = userDetails.photoURL;
    data.student_name = userDetails.displayName;
    mutationFeedback.mutate(data);
    if (mutationFeedback.data?.data?.message) {
      Swal.fire({
        icon: "success",
        title: mutationFeedback.data?.data?.message,
      });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

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
      render: (description) => {
        return (
          <>
            <Tooltip title={description}>
              <p
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "400px",
                }}
              >
                {description}
              </p>
            </Tooltip>
          </>
        );
      },
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
    <div>
      <div className={"flex justify-end"}>
        <Tooltip title={"Teaching Evaluation Report"}>
          <Button onClick={() => setIsOpen(true)}>TER</Button>
        </Tooltip>
      </div>
      <Table dataSource={data?.data} columns={columns} />
      <Modal open={isOpen} footer={null} onCancel={() => setIsOpen(false)}>
        <form className={"px-8 space-y-6"}>
          <h1 className={"text-xl font-bold"}>Teacher Evolution Part</h1>
          <p>Enter Your Feedback</p>
          <TextArea onChange={(e) => setFeedback(e.target.value)} />
          <Rate onChange={setRating} value={rating} /> <br />
          <Button onClick={handleFeedbackMutate}>Submit</Button>
        </form>
      </Modal>
    </div>
  );
};
