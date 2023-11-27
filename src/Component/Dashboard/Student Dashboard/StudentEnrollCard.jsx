import { LazyLoadImage } from "react-lazy-load-image-component";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "antd";

export const StudentEnrollCard = ({ item }) => {
  return (
    <>
      {" "}
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
            <div className="flex items-center justify-between">
              <div className={"flex items-center gap-1"}>
                <UserOutlined className={"font-extrabold"} />
                <p>{item.teacher}</p>
              </div>
              <div className={"flex items-center gap-1"}>
                <Link to={`/dashboard/enroll/class/details/${item.class_id}`}>
                  <Button>Continue</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
