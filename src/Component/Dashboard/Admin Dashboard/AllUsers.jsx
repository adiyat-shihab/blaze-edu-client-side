import { Avatar, Button, Space, Table, Tag } from "antd";
import { useQuery } from "@tanstack/react-query";
import useAxiosOpen from "../../../Hooks/UseAxiosOpen.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

export const AllUsers = () => {
  const axiosOpen = useAxiosOpen();
  const { Column } = Table;
  const { data } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      return await axiosOpen.get("/users");
    },
  });

  return (
    <>
      {" "}
      <Table dataSource={data?.data}>
        <Column
          title="Photo"
          dataIndex="photo"
          key="photo"
          render={(photo) => {
            return (
              <>
                <Avatar size={"large"} src={photo} />
              </>
            );
          }}
        />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Role"
          dataIndex="role"
          key="role"
          render={(role) => {
            return (
              <>
                {" "}
                {role === "admin" ? (
                  <Button disabled>Already Admin</Button>
                ) : (
                  <Button>Make Admin</Button>
                )}
              </>
            );
          }}
        />
      </Table>
    </>
  );
};
