import { UseAuth } from "../Hooks/UseAuth.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useForm } from "react-hook-form";
import { Upload, Button, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAxiosOpen from "../Hooks/UseAxiosOpen.jsx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Register = () => {
  const { SignUp, googleSign } = UseAuth();
  const queryClient = useQueryClient();
  const axiosOpen = useAxiosOpen();
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
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

  const { register, handleSubmit } = useForm();

  const [passValidation, setPassValidation] = useState("");
  const [validation, setValidation] = useState("");
  const onSubmit = async (data) => {
    if (data.password.length < 6) {
      setPassValidation("Password must be 6 character");
    } else if (data.password.length > 15) {
      setPassValidation("Password is not exceed over 15 character");
    } else if (!/[A-Z]/.test(data.password)) {
      setPassValidation("Password must need atleast one Capital Letter");
    } else if (!/\d/.test(data.password)) {
      setPassValidation("Password must need atleast one number");
    } else if (!/[@$!%*?&]/.test(data.password)) {
      setPassValidation("Password must need atleast one special character");
    } else if (phoneNumber <= 0) {
      setPhoneValidate("Please enter your phone number");
    } else {
      await SignUp(data.email, data.password, data.name, image)
        .then(async () => {
          const setuser = {
            email: data.email.toLowerCase(),
            password: data.password,
            name: data.name,
            photo: image,
            phone: phoneNumber,
            role: "student",
          };
          mutation.mutate(setuser);
        })
        .catch((err) => {
          setValidation("Email Already in Use");
        });
    }
  };

  const mutation = useMutation({
    mutationFn: async (userData) => {
      await axiosOpen.post("/user/add", userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Role"] });
      message.success("Sign Up Successful");
      navigate("/dashboard");
    },
  });
  const [see, setSee] = useState(false);
  const [phoneValidate, setPhoneValidate] = useState("");
  console.log(mutation);
  return (
    <div className={""}>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="min-w-screen  lg:py-32 min-h-screen  flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 max-w-[1000px] text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-[#FDF8EE] py-10 px-10">
              <LazyLoadImage
                src={"https://i.ibb.co/Ry6LLK4/Fill-out-amico-1.png"}
                effect={"blur"}
              />
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>Enter your information to register</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex -mx-3">
                  <div className=" px-3 mb-5">
                    <label className="text-xs font-semibold px-1">name</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="Your Name"
                        {...register("name", { required: true })}
                      />
                    </div>
                  </div>
                  <div className=" px-3 mb-5">
                    <label htmlFor="" className="text-xs font-semibold px-1">
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="email"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="johnsmith@example.com"
                        {...register("email", { required: true })}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex relative -mx-3">
                  <div className="w-full px-3 mb-6">
                    <label className="text-xs font-semibold px-1">
                      Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type={see ? "text" : "password"}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="************"
                        {...register("password", { required: true })}
                        required
                      />
                    </div>
                    {see ? (
                      <EyeInvisibleOutlined
                        className={
                          " absolute right-8 top-9 text-black  cursor-pointer"
                        }
                        onClick={() => setSee(!see)}
                      />
                    ) : (
                      <EyeOutlined
                        className={
                          " absolute right-8 top-9 text-black cursor-pointer"
                        }
                        onClick={() => setSee(!see)}
                      />
                    )}
                    <strong className={"text-red-400"}>
                      {passValidation || validation}
                    </strong>
                  </div>
                </div>{" "}
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-6">
                    <label className="text-xs font-semibold px-1">
                      Phone Number
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <PhoneInput
                        country={"bd"}
                        inputStyle={{ width: "100%", marginLeft: "-30px" }}
                        buttonStyle={{ marginLeft: "-33px" }}
                        onChange={(phone) => setPhoneNumber(phone)}
                        inputProps={{
                          required: true,
                        }}
                      />
                      <strong className={"text-red-400"}>
                        {phoneValidate}
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label className="text-xs font-semibold px-1">
                      Upload Image
                    </label>
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
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    {image ? (
                      <input
                        className="block cursor-pointer w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 -mt-5 text-white rounded-lg px-3 py-3 font-semibold"
                        type="submit"
                        placeholder="Register Now"
                      />
                    ) : (
                      <div className={"flex justify-center"}>
                        <Button
                          disabled
                          className=" h-10 -mt-5  w-full max-w-xs mx-auto  focus:bg-indigo-700  rounded-lg font-semibold"
                        >
                          Submit
                        </Button>
                      </div>
                    )}
                    <div className="px-6 mt-4 flex  justify-center sm:px-0 max-w-sm">
                      <button
                        type="button"
                        onClick={() =>
                          googleSign().then((res) => {
                            const setuser = {
                              email: res.user.email,
                              name: res.user.displayName,
                              photo: res.user.photoURL,
                              role: "student",
                            };
                            mutation.mutate(setuser);
                          })
                        }
                        className="text-white ml-14   bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                      >
                        <svg
                          className="mr-2 -ml-1 w-4 h-4"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="google"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 488 512"
                        >
                          <path
                            fill="currentColor"
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                          ></path>
                        </svg>
                        Sign up with Google<div></div>
                      </button>
                    </div>
                    <div className={"pt-4"}>
                      <p className={"text-center"}>
                        Already an User?{" "}
                        <Link className={"text-blue-500"} to={"/login"}>
                          Login
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
