import { useForm } from "react-hook-form";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { UseAuth } from "../../../Hooks/UseAuth.jsx";
import useAxiosOpen from "../../../Hooks/UseAxiosOpen.jsx";

export const AddClasses = () => {
  const [fileList, setFileList] = useState([]);
  const axiosOpen = useAxiosOpen();
  const { data } = UseAuth();
  const [image, setImage] = useState("");
  const { register, handleSubmit } = useForm();

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

  const onSubmit = (form) => {
    const classes = {
      email: data?.data?.email,
      name: data?.data?.name,
      photo: image,
      title: form.title,
      price: form.price,
      description: form.description,
      status: "pending",
    };
    console.log(classes);
    axiosOpen.post("/class/add", classes).then((res) => console.log(res));
  };
  return (
    <>
      <div className=" py-16 p-6  flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">Add Class</h2>
            <p className="text-gray-500 mb-6">
              Need help go to{" "}
              <span className={" text-blue-500 cursor-pointer"}>FAQ</span>
            </p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Class Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                  >
                    <div className="md:col-span-3">
                      <label>Title</label>
                      <input
                        type="text"
                        name="title"
                        className="h-10 border outline-none mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                        required
                        {...register("title", { required: true })}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label>Price</label>
                      <input
                        type="number"
                        name="price"
                        className="h-10 border outline-none mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="$ "
                        required
                        {...register("price", { required: true })}
                      />
                    </div>
                    <div className="md:col-span-5 ">
                      <label>Description</label>
                      <textarea
                        name="description"
                        className="h-20 border mt-1 pt-3 outline-none  rounded px-4 w-full bg-gray-50"
                        {...register("description", { required: true })}
                        required
                      />
                    </div>
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
                          <Button icon={<UploadOutlined />}>
                            Upload Image
                          </Button>
                        </Upload>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        {image ? (
                          <input
                            className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                            value={"Add Class"}
                          />
                        ) : (
                          <div className={"flex justify-center"}>
                            <Button
                              disabled
                              className=" h-10 -mt-5  w-full max-w-xs mx-auto  focus:bg-indigo-700  rounded-lg font-semibold"
                            >
                              Add Class
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
