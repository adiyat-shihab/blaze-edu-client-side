import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const ErrorElement = () => {
  return (
    <div className={"flex justify-center items-center h-screen"}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button className={"bg-blue-500"} type="primary">
              Back Home
            </Button>
          </Link>
        }
      />
    </div>
  );
};
