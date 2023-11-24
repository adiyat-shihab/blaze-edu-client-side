import { LazyLoadImage } from "react-lazy-load-image-component";
import { useForm } from "react-hook-form";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { UseAuth } from "../Hooks/UseAuth.jsx";
import { message } from "antd";

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
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="password"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="************"
                          {...register("password", { required: true })}
                        />
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
