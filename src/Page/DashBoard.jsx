import { NavLink, Outlet } from "react-router-dom";
import {
  BookOutlined,
  ContactsOutlined,
  FolderAddOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../Hooks/UseAxiosOpen.jsx";
import { UseAuth } from "../Hooks/UseAuth.jsx";
import { Button, Drawer } from "antd";
import { useState } from "react";

export const DashBoard = () => {
  const axiosOpen = useAxiosOpen();
  const { userDetails } = UseAuth();
  const { data } = useQuery({
    queryKey: ["Role", userDetails?.email],
    queryFn: async ({ queryKey }) => {
      return await axiosOpen.get(`/user/${queryKey[1]}`);
    },
  });

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-1 bg-gray-50">
          <div className="hidden md:flex md:w-64 md:flex-col">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
              <div className="px-4 mt-8">
                <div className="relative">
                  <p className={"font-bold text-xl text-gray-800 "}>
                    Dash<span className={"text-[#FF7426]"}>b</span>oard
                  </p>
                </div>
              </div>

              <div className="px-4 mt-6">
                <hr className="border-gray-200" />
              </div>

              <div className="flex flex-col flex-1 px-3 mt-6">
                <div className="space-y-4 h-80">
                  <nav className="flex-1 space-y-2">
                    <NavLink
                      title=""
                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                      to={"/dashboard"}
                    >
                      <UserOutlined className={"mr-2"} />
                      Profile
                    </NavLink>
                    {/* Admin Route */}
                    {data?.data?.role === "admin" && (
                      <div>
                        <NavLink
                          to={"/dashboard/users"}
                          className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                        >
                          <TeamOutlined className={"mr-2"} />
                          Users
                        </NavLink>

                        <NavLink
                          className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                          to={"/dashboard/teacher/request"}
                        >
                          <LazyLoadImage
                            src="https://i.ibb.co/k1ncV96/teacher-1.png"
                            alt=""
                            className={"h-5 -ml-[2.5px]  w-5"}
                          />
                          <p className={"ml-[2px]"}>Teacher Request</p>
                        </NavLink>

                        <NavLink
                          className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                          to={"/dashboard/all/classes"}
                        >
                          <BookOutlined className={"mr-2"} />
                          All Classes
                        </NavLink>
                      </div>
                    )}
                    {/* Student Route */}
                    {data?.data?.role === "student" && (
                      <div>
                        <NavLink
                          to={"/dashboard/student/class"}
                          className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                        >
                          <ContactsOutlined className={"mr-2"} />
                          My Enroll Class
                        </NavLink>
                      </div>
                    )}
                    {/* Teacher Route */}
                    {data?.data?.role === "teacher" && (
                      <div>
                        <NavLink
                          to={"/dashboard/teacher/class/add"}
                          className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                        >
                          <FolderAddOutlined className={"mr-1"} />
                          Add Class
                        </NavLink>

                        <NavLink
                          className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                          to={"/dashboard/teacher/my/classes"}
                        >
                          <LazyLoadImage
                            src="https://i.ibb.co/5MzcFBv/webinar.png"
                            alt=""
                            className={"h-4 -ml-[2.5px]  w-4"}
                          />
                          <p className={"ml-[5px]"}>My Class</p>
                        </NavLink>
                      </div>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <main>
              <div className="py-6">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                  <div>
                    {" "}
                    <Button className={"md:hidden"} onClick={showDrawer}>
                      Open
                    </Button>
                    <Drawer
                      title="Basic Drawer"
                      placement="right"
                      onClose={onClose}
                      open={open}
                    >
                      <div className="  md:flex md:w-64 md:flex-col">
                        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
                          <div className="px-4 mt-8">
                            <div className="relative">
                              <p className={"font-bold text-xl text-gray-800 "}>
                                Dash<span className={"text-[#FF7426]"}>b</span>
                                oard
                              </p>
                            </div>
                          </div>

                          <div className="px-4 mt-6">
                            <hr className="border-gray-200" />
                          </div>

                          <div className="flex flex-col flex-1 px-3 mt-6">
                            <div className="space-y-4 h-80">
                              <nav className="flex-1 space-y-2">
                                <NavLink
                                  title=""
                                  className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                                  to={"/dashboard"}
                                >
                                  <UserOutlined className={"mr-2"} />
                                  Profile
                                </NavLink>
                                {/* Admin Route */}
                                {data?.data?.role === "admin" && (
                                  <div>
                                    <NavLink
                                      to={"/dashboard/users"}
                                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                                    >
                                      <TeamOutlined className={"mr-2"} />
                                      Users
                                    </NavLink>

                                    <NavLink
                                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                                      to={"/dashboard/teacher/request"}
                                    >
                                      <LazyLoadImage
                                        src="https://i.ibb.co/k1ncV96/teacher-1.png"
                                        alt=""
                                        className={"h-5 -ml-[2.5px]  w-5"}
                                      />
                                      <p className={"ml-[2px]"}>
                                        Teacher Request
                                      </p>
                                    </NavLink>

                                    <NavLink
                                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                                      to={"/dashboard/all/classes"}
                                    >
                                      <BookOutlined className={"mr-2"} />
                                      All Classes
                                    </NavLink>
                                  </div>
                                )}
                                {/* Student Route */}
                                {data?.data?.role === "student" && (
                                  <div>
                                    <NavLink
                                      to={"/dashboard/student/class"}
                                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                                    >
                                      <ContactsOutlined className={"mr-2"} />
                                      My Enroll Class
                                    </NavLink>
                                  </div>
                                )}
                                {/* Teacher Route */}
                                {data?.data?.role === "teacher" && (
                                  <div>
                                    <NavLink
                                      to={"/dashboard/teacher/class/add"}
                                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                                    >
                                      <FolderAddOutlined className={"mr-1"} />
                                      Add Class
                                    </NavLink>

                                    <NavLink
                                      className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-[#FF7426] group"
                                      to={"/dashboard/teacher/my/classes"}
                                    >
                                      <LazyLoadImage
                                        src="https://i.ibb.co/5MzcFBv/webinar.png"
                                        alt=""
                                        className={"h-4 -ml-[2.5px]  w-4"}
                                      />
                                      <p className={"ml-[5px]"}>My Class</p>
                                    </NavLink>
                                  </div>
                                )}
                              </nav>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Drawer>
                  </div>
                  <Outlet />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
