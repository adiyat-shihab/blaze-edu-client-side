import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { ConfigProvider, Select } from "antd";

export const ApplyTeacher = () => {
  const containerStyle = {
    backgroundImage: 'url("https://i.ibb.co/rMLnD8B/Group-327.png")',
  };
  const handleChange = (value) => {
    console.log(value);
  };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <Helmet>
        <title>Apply Teacher</title>
      </Helmet>
      <div>
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
                            onChange={handleChange}
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
                        <label>State / province</label>
                        <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                          <input
                            name="state"
                            id="state"
                            placeholder="State"
                            className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                            value=""
                          />
                          <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                            <svg
                              className="w-4 h-4 mx-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                          <button className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                            <svg
                              className="w-4 h-4 mx-2 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-1">
                        <label>Zipcode</label>
                        <input
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                          value=""
                        />
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit
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
      </div>
    </>
  );
};
