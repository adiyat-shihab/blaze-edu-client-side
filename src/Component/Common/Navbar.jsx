import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, NavLink } from "react-router-dom";
import { UseAuth } from "../../Hooks/UseAuth.jsx";
import { ProfileCard } from "./ProfileCard.jsx";
import { Avatar, Button, message } from "antd";

export const Navbar = () => {
  const [toggleButton, setToggleButton] = useState(false);
  const [profile, setProfile] = useState(false);
  const { userDetails, data, SignOut } = UseAuth();

  return (
    <>
      <nav className="relative bg-[#FDF8EE]  py-4 flex justify-between items-center  px-8">
        <Link
          to={"/"}
          className="text-3xl flex gap-4 items-center font-bold leading-none"
        >
          <LazyLoadImage
            src={"https://i.ibb.co/48ZN6dN/Group.png"}
            effect={"blur"}
          />
          <p className={" "}>Blaze Edu</p>
        </Link>
        <div className="lg:hidden">
          <button
            onClick={() => setToggleButton(true)}
            className="navbar-burger flex items-center text-blue-600 p-3"
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto  lg:items-center lg:w-auto lg:space-x-6">
          <NavLink
            to={"/"}
            className={"text-gray-300 "}
            style={({ isActive }) => {
              return {
                color: isActive ? "#FF7426" : "#afafaf",
                fontWeight: isActive && "bold",
              };
            }}
          >
            Home
          </NavLink>

          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <NavLink
              to={"/all/class"}
              className={"text-gray-300 "}
              style={({ isActive }) => {
                return {
                  color: isActive ? "#FF7426" : "#afafaf",
                  fontWeight: isActive && "bold",
                };
              }}
            >
              All Class
            </NavLink>
          </li>

          {data?.data?.role === "admin" || (
            <div className={"flex items-center gap-4"}>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 current-fill"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </li>
              <li>
                <NavLink
                  to={"/teacher/apply"}
                  className="text-sm text-gray-400 hover:text-gray-500"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#FF7426" : "#afafaf",
                      fontWeight: isActive && "bold",
                    };
                  }}
                >
                  Tech On Blaze edu
                </NavLink>
              </li>
            </div>
          )}
        </ul>

        {userDetails ? (
          <div
            className={
              "p-1 cursor-pointer hidden lg:block bg-white rounded-full"
            }
          >
            <Avatar
              size={"large"}
              src={userDetails?.photoURL}
              onClick={() => setProfile(!profile)}
            />
          </div>
        ) : (
          <button className="hidden lg:inline-block py-2 px-6 bg-[#FF7426] hover:bg-[#ff5e00] text-sm text-white font-bold rounded-xl transition duration-200">
            <Link to={"/Register"}>Sign Up</Link>
          </button>
        )}
      </nav>
      {toggleButton && (
        <div className="navbar-menu relative z-50 ">
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <div className="mr-auto text-3xl font-bold leading-none">
                <LazyLoadImage
                  src={"https://i.ibb.co/48ZN6dN/Group.png"}
                  effect={"blur"}
                ></LazyLoadImage>
                <h1>Blaze Edu</h1>
              </div>
              <button
                onClick={() => setToggleButton(false)}
                className="navbar-close"
              >
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div>
              <ul>
                <li className="mb-1">
                  <NavLink
                    to={"/"}
                    className={"text-gray-300 "}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#FF7426" : "#afafaf",
                        fontWeight: isActive && "bold",
                      };
                    }}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="mb-1">
                  <NavLink
                    to={"/all/class"}
                    className={"text-gray-300 "}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "#FF7426" : "#afafaf",
                        fontWeight: isActive && "bold",
                      };
                    }}
                  >
                    All Class
                  </NavLink>
                </li>
                {data?.data?.role === "admin" || (
                  <div className={"flex items-center gap-4"}>
                    <li>
                      <NavLink
                        to={"/teacher/apply"}
                        className="text-sm text-gray-400 hover:text-gray-500"
                        style={({ isActive }) => {
                          return {
                            color: isActive ? "#FF7426" : "#afafaf",
                            fontWeight: isActive && "bold",
                          };
                        }}
                      >
                        Tech On Blaze edu
                      </NavLink>
                    </li>
                  </div>
                )}
              </ul>
            </div>
            <div className="mt-auto">
              {userDetails ? (
                <Button
                  onClick={() =>
                    SignOut().then((res) => {
                      setProfile(false);
                      message.success("Sign out ");
                    })
                  }
                  className=" w-full py-2 lg:inline-block px-6 bg-[#FF7426] hover:bg-[#ff5e00] text-sm text-white font-bold rounded-xl transition duration-200"
                >
                  Sign Out
                </Button>
              ) : (
                <button className=" w-full py-2 lg:inline-block px-6 bg-[#FF7426] hover:bg-[#ff5e00] text-sm text-white font-bold rounded-xl transition duration-200">
                  <Link to={"/Register"}>Sign Up</Link>
                </button>
              )}
              <p className="my-4 text-xs text-center text-gray-400">
                <span>Copyright © 2021</span>
              </p>
            </div>
          </nav>
        </div>
      )}
      {profile && (
        <ProfileCard
          name={userDetails.displayName}
          image={userDetails.photoURL}
          phone={data?.data?.phone}
          role={data?.data?.role}
          email={userDetails.email}
          setProfile={setProfile}
        />
      )}
    </>
  );
};
