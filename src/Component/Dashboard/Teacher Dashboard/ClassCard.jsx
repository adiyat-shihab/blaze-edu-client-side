import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  DeleteFilled,
  EditFilled,
  MailOutlined,
  SwapRightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

export const ClassCard = ({ item }) => {
  console.log(item);
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
                      <p className="flex hover:bg-gray-100 items-center p-1 rounded ">
                        <EditFilled className={"text-green-500"} />
                      </p>
                    </Tooltip>

                    <Tooltip title={"Delete"}>
                      {" "}
                      <p className="flex items-center hover:bg-gray-100 p-1 rounded ">
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
                  <button className={"text-blue-500"}>See Details</button>
                  <SwapRightOutlined className={"text-blue-500"} />
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
      </div>
    </>
  );
};
