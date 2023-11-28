import { LazyLoadImage } from "react-lazy-load-image-component";
import { useForm } from "react-hook-form";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { UseAuth } from "../Hooks/UseAuth.jsx";
import { message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosOpen from "../Hooks/UseAxiosOpen.jsx";

export const Login = () => {
  const { Signin } = UseAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    await Signin(data.email, data.password).then((res) => {
      message.success("Login Successfully");
      return navigate("/");
    });
  };
  const { register, handleSubmit } = useForm();

  const { googleSign } = UseAuth();
  const queryClient = useQueryClient();
  const axiosOpen = useAxiosOpen();

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
  return (
    <>
      <div>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="min-w-screen  lg:py-32 min-h-screen  flex items-center justify-center px-5 py-5">
          <div className="bg-gray-100 max-w-[1000px] text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
            <div className="md:flex w-full">
              <div className="hidden md:block w-1/2 bg-[#FDF8EE] py-10 px-10">
                <LazyLoadImage
                  src={"https://i.ibb.co/2F7KhWG/Welcome-cuate.png"}
                  effect={"blur"}
                />
              </div>
              <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                <div className="text-center mb-10">
                  <h1 className="font-bold text-3xl text-gray-900">Login</h1>
                  <p>Enter your information to Login</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-6">
                      <label className="text-xs font-semibold px-1">
                        Password
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="Email"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Your Email"
                          {...register("email", { required: true })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-6">
                      <label className="text-xs font-semibold px-1">
                        Password
                      </label>
                      <div className="flex relative">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type={see ? "text" : "password"}
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="************"
                          {...register("password", { required: true })}
                        />
                        {see ? (
                          <EyeInvisibleOutlined
                            className={
                              " absolute right-4 top-4 text-black  cursor-pointer"
                            }
                            onClick={() => setSee(!see)}
                          />
                        ) : (
                          <EyeOutlined
                            className={
                              " absolute right-4 top-4 text-black cursor-pointer"
                            }
                            onClick={() => setSee(!see)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <input
                        className="block cursor-pointer w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                        type="submit"
                        placeholder="Login"
                        value={"Login"}
                      />
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
                          Not An User{" "}
                          <Link className={"text-blue-500"} to={"/Register"}>
                            Join
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
    </>
  );
};
