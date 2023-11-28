import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  DeleteFilled,
  EditFilled,
  MailOutlined,
  SwapRightOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, message, Modal, Tooltip, Upload } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import UseAxiosOpen from "../../../Hooks/UseAxiosOpen.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAxiosPrivate } from "../../../Hooks/useAxiosPrivate.jsx";

export const ClassCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState("");
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosPrivate();

  const { register, handleSubmit } = useForm();
  const axiosOpen = UseAxiosOpen();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    const image = { image: file };

    const response = await axios.post(
      "https://api.imgbb.com/1/upload?key=0ebb240c8ce479a4159793d2a4acc3f4",
      image,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      },
    );

    if (response.data.success) {
      setImage(response.data.data.display_url);
      message.success("Image uploaded successfully");
      onSuccess();
    } else {
      message.error("Error uploading image");
      onError();
    }
  };

  const mutation1 = useMutation({
    mutationFn: ([id, data]) => {
      return axiosOpen.put(`/class/modify/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myClasses"] });
      Swal.fire({
        icon: "success",
        title: "Class Updated Successfully",
      });
    },
  });
  const mutation2 = useMutation({
    mutationFn: (id) => {
      return axiosSecure.delete(`/class/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myClasses"] });
      Swal.fire({
        icon: "success",
        title: "Class Deleted Successfully",
      });
    },
  });
  const onSubmit = (data) => {
    data.photo = image;
    console.log(data);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation1.mutate([item?._id, data]);
        setOpen(false);
      }
    });
  };

  return (
    <>
      <div>
        <div className="relative mx-auto w-full">
          <div className="relative inline-block duration-300 ease-in-out transition-transform transform  w-full">
            <div className="shadow lg:w-[21.875rem] p-4 rounded-lg bg-white">
              <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
                <div className="transition-transform duration-500 transform ease-in-out  w-full">
                  <LazyLoadImage src={item.photo} />
                </div>

                <div className="absolute flex justify-center bottom-0 mb-3">
                  <div className="flex cursor-pointer bg-white px-4 py-1 space-x-5 rounded-lg overflow-hidden shadow">
                    <Tooltip title={"Edit"}>
                      {" "}
                      <p
                        onClick={() => setOpen(true)}
                        className="flex hover:bg-gray-100 items-center p-1 rounded "
                      >
                        <EditFilled className={"text-green-500"} />
                      </p>
                    </Tooltip>

                    <Tooltip title={"Delete"}>
                      {" "}
                      <p
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              mutation2.mutate(item?._id);
                            }
                          });
                        }}
                        className="flex items-center hover:bg-gray-100 p-1 rounded "
                      >
                        <DeleteFilled className={"text-red-500"} />
                      </p>
                    </Tooltip>
                  </div>
                </div>

                {item.status === "pending" ? (
                  <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-green-500 text-sm font-medium text-white select-none">
                    {item.status}
                  </span>
                ) : item.status === "reject" ? (
                  <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
                    {item.status}
                  </span>
                ) : (
                  <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-blue-500 text-sm font-medium text-white select-none">
                    {item.status}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <h2 className="font-medium text-base md:text-lg text-gray-800 line-clamp-1">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm text-gray-800 line-clamp-1">
                  {item.description}
                </p>
              </div>

              <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-8">
                <p className="inline-flex flex-col xl:flex-row pr-6  xl:items-center text-gray-800">
                  <MailOutlined />
                  <span className="mt-2 ml-3 xl:mt-0 break-all ">
                    {item.email}
                  </span>
                </p>
                <p className="inline-flex flex-col ml-2 xl:flex-row xl:items-center text-gray-800">
                  <UserOutlined />
                  <span className="mt-2 ml-3 xl:mt-0">{item.name}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 ">
                <div className="flex gap-2 items-center">
                  {item?.status === "approve" ? (
                    <>
                      <Link
                        to={`/dashboard/teacher/class/assignment/${item?._id}`}
                      >
                        {" "}
                        <Button
                          icon={<SwapRightOutlined />}
                          className={"text-blue-500"}
                        >
                          See Details
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Button disabled icon={<SwapRightOutlined />}>
                        See Details
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex justify-end">
                  <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
                    <span className="text-sm uppercase">$</span>
                    <span className="text-lg ml-1">{item.price}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Update Details"
          footer={null}
          open={open}
          confirmLoading={confirmLoading}
          onCancel={() => setOpen(false)}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700 block mb-1 font-medium">
                  Title
                </label>
                <input
                  type="text"
                  className="bg-gray-100 outline-none border border-gray-200 rounded py-1 px-3 block  text-gray-700 w-full"
                  {...register("title", { required: true })}
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 block mb-1 font-medium">
                  Price
                </label>
                <input
                  type="number"
                  {...register("price", { required: true })}
                  required
                  className="bg-gray-100 outline-none border border-gray-200 rounded py-1 px-3 block  text-gray-700 w-full"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 block mb-1 font-medium">
                  Description
                </label>
                <textarea
                  className="bg-gray-100 outline-none border border-gray-200 rounded py-1 px-3 block  text-gray-700 w-full"
                  {...register("description", { required: true })}
                  required
                />
              </div>

              <div className="w-full px-3 mb-12">
                <label className="text-xs font-semibold px-1">Update</label>
                <div className="flex">
                  <Upload
                    customRequest={customRequest}
                    disabled={fileList.length === 1}
                    onChange={onChange}
                    fileList={fileList}
                    listType="picture"
                    maxCount="1"
                  >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                </div>
                <div className={"flex gap-2 mt-10 -mb-10 justify-end"}>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  {image ? (
                    <Button>
                      <input type="submit" className={"cursor-pointer"} />
                    </Button>
                  ) : (
                    <Button disabled>submit</Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};
