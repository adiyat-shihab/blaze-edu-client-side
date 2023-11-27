import { LazyLoadImage } from "react-lazy-load-image-component";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const ClassAllCard = ({ item }) => {
  return (
    <>
      <div>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <LazyLoadImage
            className="p-8 w-[380px] rounded-lg h-[230px] overflow-hidden "
            src={item.photo}
            alt="product image"
          />

          <div className="px-5 pb-5 space-y-4">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {item.title}
            </h5>
            <p>{item.description}</p>
            <div className="flex items-center justify-between">
              <div className={"flex items-center gap-1"}>
                <UserOutlined className={"font-extrabold"} />
                <p>{item.name}</p>
              </div>
              <span className="text-1xl font-bold text-gray-900 dark:text-white">
                Total Enroll
              </span>
            </div>{" "}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ${item.price}
              </span>
              <div className={"flex items-center gap-1"}>
                <Link to={`/single/class/${item._id}`}>
                  <Button>Enroll</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
