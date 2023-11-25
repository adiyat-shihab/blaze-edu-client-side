import { Avatar, Button, message } from "antd";
import { UseAuth } from "../../Hooks/UseAuth.jsx";
import { Link } from "react-router-dom";

export const ProfileCard = ({ name, image, setProfile }) => {
  const { SignOut } = UseAuth();
  return (
    <>
      <div className="relative  ">
        <div className="max-w-xs absolute right-4 z-50 ">
          <div className="bg-white shadow-xl rounded-lg py-3">
            <div className="photo-wrapper flex justify-center p-2">
              <Avatar src={image} size={100}></Avatar>
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                {name}
              </h3>
              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>Web Developer</p>
              </div>
              <table className="text-xs my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Address
                    </td>
                    <td className="px-2 py-2">
                      Chatakpur-3, Dhangadhi Kailali
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Phone
                    </td>
                    <td className="px-2 py-2">+977 9955221114</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Email
                    </td>
                    <td className="px-2 py-2">john@exmaple.com</td>
                  </tr>
                </tbody>
              </table>
              <div className={"flex items-center justify-between px-3"}>
                <div className={"flex justify-center"}>
                  <button className="hidden lg:inline-block py-[5px] px-4 bg-[#FF7426] hover:bg-[#ff5e00] text-sm text-white font-medium rounded transition duration-200">
                    <Link to={"/dashboard"}>Dashboard</Link>
                  </button>
                </div>

                <div className="text-center my-3">
                  <Button
                    onClick={() =>
                      SignOut().then((res) => {
                        setProfile(false);
                        message.success("Sign out ");
                      })
                    }
                    className={"bg-[#FDF8EE]"}
                    type="text"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
