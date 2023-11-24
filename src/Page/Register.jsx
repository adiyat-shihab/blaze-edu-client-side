import { UseAuth } from "../Hooks/UseAuth.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useForm } from "react-hook-form";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const { SignUp } = UseAuth();
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const customRequest = async ({ file, onSuccess, onError }) => {
    console.log(file);
    const image = { image: file };
    console.log(image);
    const response = await axios.post(
      "https://api.imgbb.com/1/upload?key=0ebb240c8ce479a4159793d2a4acc3f4",
      image,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      },
    );

    // Check if the upload was successful
    if (response.data.success) {
      message.success("Image uploaded successfully");
      onSuccess();
    } else {
      message.error("Error uploading image");
      onError();
    }
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    // const image = { image: data.image[0] };
    // const res = await axios.post(
    //   "https://api.imgbb.com/1/upload?key=0ebb240c8ce479a4159793d2a4acc3f4",
    //   image,
    //   {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   },
    // );
    //
    // console.log(res.data);
    // console.log(image);
  };

  return (
    <div className={""}>
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
                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>Enter your information to register</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-5">
                    <label className="text-xs font-semibold px-1">
                      First name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="John"
                        {...register("name", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 mb-5">
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
                      />
                    </div>
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
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
                  <div className="w-full px-3 mb-12">
                    <label className="text-xs font-semibold px-1">
                      Upload Image
                    </label>
                    <div className="flex">
                      <Upload
                        customRequest={customRequest}
                        onChange={onChange}
                        fileList={fileList}
                        listType="picture"
                        maxCount="1"
                      >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                      </Upload>
                      <input type="file" {...register("image")} />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <input
                      className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                      type="submit"
                      placeholder="Register Now"
                    />
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
