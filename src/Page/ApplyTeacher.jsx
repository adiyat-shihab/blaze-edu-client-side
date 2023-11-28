import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Button, ConfigProvider, Result, Select } from "antd";
import { useState } from "react";
import { UseAuth } from "../Hooks/UseAuth.jsx";
import useAxiosOpen from "../Hooks/UseAxiosOpen.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../Hooks/useAxiosPrivate.jsx";
import Swal from "sweetalert2";

export const ApplyTeacher = () => {
  const axiosSecure = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { userDetails } = UseAuth();

  const containerStyle = {
    backgroundImage: 'url("https://i.ibb.co/rMLnD8B/Group-327.png")',
  };
  const [experience, setExperience] = useState("");
  const [category, setCategory] = useState("");

  const { data: statusCheck } = useQuery({
    queryKey: ["requestStatus"],
    queryFn: async () => {
      return await axiosSecure.get(`/teacher/request/${userDetails?.email}`);
    },
  });
  console.log(statusCheck);
  const handleExperienced = (value) => {
    setExperience(value);
  };
  const handleCategory = (value) => {
    setCategory(value);
  };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const teacher = {
      teacherName: data.name,
      teacherTitle: data.title,
      teacherExperience: experience,
      teacherCategory: category,
      teacherPhoto: userDetails.photoURL,
      teacherEmail: userDetails.email,
      status: "pending",
    };
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        mutationApply.mutate(teacher);
      }
    });
  };

  const mutationApply = useMutation({
    mutationFn: async (data) => {
      return await axiosSecure.post("/teacher/apply", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requestStatus"] });
      Swal.fire({
        title: "Success!",
        icon: "success",
      });
    },
  });

  const mutation = useMutation({
    mutationFn: () => {
      return axiosSecure.put(`/teacher/another/request/${userDetails?.email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requestStatus"] });
      Swal.fire({
        title: "Success!",
        icon: "success",
      });
    },
  });
  return (
    <>
      <Helmet>
        <title>Apply Teacher</title>
      </Helmet>
      <div>
        {statusCheck?.data?.status === "pending" ? (
          <Result
            className={"h-[60vh] py-32"}
            title="Your application is pending"
          />
        ) : statusCheck?.data?.status === "approve" ? (
          <Result
            className={"h-[60vh] py-32"}
            status="success"
            title="Your appication was approve"
          />
        ) : statusCheck?.data?.status === "reject" ? (
          <Result
            className={"h-[60vh] py-32"}
            status="error"
            extra={
              <Button
                onClick={() =>
                  Swal.fire({
                    title: "Are you sure?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      mutation.mutate();
                    }
                  })
                }
              >
                Request to Another Review
              </Button>
            }
            title={"Your application was rejected"}
          />
        ) : (
          <div
            style={containerStyle}
            className="min-h-screen  p-6 bg-[#FDF8EE] flex items-center justify-center"
          >
            <div className="container  max-w-screen-lg mx-auto">
              <div>
                <h2 className="font-bold  text-3xl  ">
                  Apply as a teacher in <br />
                  <p className={"text-[#FF7426] my-2 "}>Blaze edu</p>
                </h2>

                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    <div className="text-gray-600">
                      <p className="font-medium text-lg">Personal Details</p>
                      <p>Please fill out all the fields.</p>
                    </div>

                    <div className="lg:col-span-2">
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid py-16  gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                      >
                        <div className="md:col-span-3">
                          <label>Full Name</label>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            className="h-10 border outline-none mt-1 rounded px-4 w-full bg-gray-50"
                            {...register("name", { required: true })}
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label>Title</label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            className="h-10 border outline-none mt-1 rounded px-4 w-full bg-gray-50"
                            {...register("title", { required: true })}
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label>Experience</label>

                          <ConfigProvider
                            theme={{
                              components: {
                                Select: {
                                  selectorBg: "#F9FAFB",
                                  borderRadius: "4px",
                                  colorPrimary: "white",
                                },
                              },
                            }}
                          >
                            <Select
                              placeholder="Select Your experience"
                              onChange={handleExperienced}
                              className={
                                "border-none mt-1 h-10 flex w-full border border-gray-200 rounded items-center"
                              }
                              options={[
                                {
                                  value: "some idea",
                                  label: "Some Idea",
                                },
                                {
                                  value: "beginner",
                                  label: "Beginner",
                                },
                                {
                                  value: "experienced",
                                  label: "Experienced",
                                },
                              ]}
                            />
                          </ConfigProvider>
                        </div>

                        <div className="md:col-span-2">
                          <label>Category</label>
                          <ConfigProvider
                            theme={{
                              components: {
                                Select: {
                                  selectorBg: "#F9FAFB",
                                  borderRadius: "4px",
                                  colorPrimary: "white",
                                },
                              },
                            }}
                          >
                            <Select
                              placeholder="Select Your experience"
                              onChange={handleCategory}
                              className={
                                "border-none mt-1 h-10 flex w-full border border-gray-200 rounded items-center"
                              }
                              options={[
                                {
                                  value: "web development",
                                  label: "Web Development",
                                },
                                {
                                  value: "digital marketing",
                                  label: "Digital Marketing",
                                },
                                {
                                  value: "game developer",
                                  label: "Game Developer",
                                },
                                {
                                  value: "app developer",
                                  label: "App Developer",
                                },
                                {
                                  value: "video editor",
                                  label: "Video Editor",
                                },
                              ]}
                            />
                          </ConfigProvider>
                        </div>

                        <div className="md:col-span-5 text-right">
                          <div className="inline-flex items-end">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Submit for review
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
