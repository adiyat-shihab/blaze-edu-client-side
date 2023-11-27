import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../Hooks/useAxiosPrivate.jsx";
import {
  Button,
  Card,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  Table,
} from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea.js";
import Swal from "sweetalert2";

export const ClassAssignment = () => {
  const param = useParams();
  const axiosSecure = useAxiosPrivate();
  console.log(param);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["classAssignment", param.id],
    queryFn: async () => {
      return await axiosSecure.get(`/teacher/single/class/details/${param.id}`);
    },
  });
  const { data: dataResult } = useQuery({
    queryKey: ["assignmentResult", param.id],
    queryFn: async () => {
      return await axiosSecure.get(`/teacher/assignment/result/${param.id}`);
    },
  });
  console.log(dataResult?.data);
  const [date, setDate] = useState();
  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      return axiosSecure.post(`/teacher/assignment`, data);
    },
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["assignmentResult"] });

      Swal.fire({
        icon: "success",
        title: "Assignment Create Successfully",
      });
    },
  });
  const handleSubmit = (data) => {
    data.date = date;
    data.class_id = param.id;
    console.log(data);
    mutation.mutate(data);
  };

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
    <div className={""}>
      <div
        className={"flex flex-row items-center lg:gap-20 justify-center py-10"}
      >
        {" "}
        <Card className={"bg-blue-400 text-white xl:w-[300px]"}>
          <p className={"xl:text-2xl font-bold "}>Total Enroll</p>
          <p className={"mt-2 font-bold text-xl"}>
            {data?.data?.enrollCount || 0}
          </p>
        </Card>
        <Card className={"bg-green-400 text-white xl:w-[300px]"}>
          <p className={"xl:text-2xl font-bold "}>Total Assignment</p>
          <p className={"mt-2 font-bold text-xl"}>
            {dataResult?.data?.result.length || 0}
          </p>
        </Card>
        <Card className={"bg-purple-400 text-white xl:w-[300px]"}>
          <p className={"xl:text-2xl font-bold "}>Per Day Assignment</p>
          <p className={"mt-2 font-bold text-xl"}>
            {dataResult?.data?.studentAssignment || 0}
          </p>
        </Card>
      </div>
      <div className={"flex justify-end px-24"}>
        <Button onClick={() => setIsOpen(true)} className={""}>
          Create
        </Button>
      </div>
      <div className={"py-24"}>
        {dataResult?.data?.result ? (
          <Table dataSource={dataResult?.data?.result} columns={columns} />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        className={"py-24"}
      >
        <h1 className={"mb-8 font-bold text-xl pl-10 mt-4"}>
          Assignment Details
        </h1>
        <Form
          name="basic"
          layout="vertical"
          className={"px-10"}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <div className={"grid grid-cols-3 gap-4 "}>
            <Form.Item
              className={"col-span-2"}
              label="Assignment Title"
              name="assignmentTitle"
              rules={[
                { required: true, message: "Please Enter your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Deadline"
              rules={[{ required: true, message: "Please Enter Deadline" }]}
            >
              <DatePicker onChange={onChange} />
            </Form.Item>
          </div>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please Enter Your Description" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item className={"flex justify-end"}>
            <Button className={"bg-blue-500"} type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
