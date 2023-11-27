import { useNavigate, useParams } from "react-router-dom";
import useAxiosOpen from "../../../Hooks/UseAxiosOpen.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UseAxiosOpen from "../../../Hooks/UseAxiosOpen.jsx";
import { useAxiosPrivate } from "../../../Hooks/useAxiosPrivate.jsx";
import { UseAuth } from "../../../Hooks/UseAuth.jsx";
import { Button, message } from "antd";

export const SingleClass = () => {
  const axiosSecure = useAxiosPrivate();

  const { userDetails } = UseAuth();

  const param = useParams();

  const { data } = useQuery({
    queryKey: ["singleclass"],
    queryFn: async () => {
      return await axiosSecure.get(`/student/class/single/${param?.id}`);
    },
  });
  const navigate = useNavigate();
  const handleEnrollment = (classData) => {
    const sendingData = {};
    sendingData.class_id = classData._id;
    sendingData.title = classData.title;
    sendingData.description = classData.description;
    sendingData.photo = classData.photo;
    sendingData.teacher = classData.name;
    sendingData.student_email = userDetails?.email;
    mutation.mutate(sendingData);
  };

  const mutation = useMutation({
    mutationFn: (classData) => {
      return axiosSecure.post(`/student/enrollment`, classData);
    },
    onSuccess: () => {
      navigate("/dashboard/student/class");
    },
  });

  return (
    <>
      {" "}
      <section className="text-gray-700 py-16 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <LazyLoadImage
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={data?.data?.photo}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {data?.data?.title}
              </h1>

              <p className="leading-relaxed">{data?.data?.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <p>Teacher: {data?.data?.name}</p>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${data?.data?.price}
                </span>
                {mutation?.data?.data?.message === "Already Enrolled" ? (
                  <Button className={"flex ml-auto"} disabled>
                    Already Enrolled
                  </Button>
                ) : (
                  <button
                    onClick={() => handleEnrollment(data?.data)}
                    className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
