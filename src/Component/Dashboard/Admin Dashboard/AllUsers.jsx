import { Avatar, Button, Table } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";
import Search from "antd/es/input/Search.js";
import { useState } from "react";
import { Helmet } from "react-helmet";
import useAxiosOpen from "../../../Hooks/UseAxiosOpen.jsx";

export const AllUsers = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { Column } = Table;
  const query = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      return await axiosSecure.get("/users").then((res) => setData(res));
    },
  });
  const mutation = useMutation({
    mutationFn: ({ email }) => {
      return axiosSecure.put(`/admin/make/${email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      Swal.fire({
        title: "Success!",
        text: "This person is now admin",
        icon: "success",
      });
    },
  });
  const axiosOpen = useAxiosOpen();
  const [data, setData] = useState();
  const onSearch = (value, _e, info) => {
    axiosOpen.get(`/admin/search/user?query=${value}`).then((res) => {
      setData(res);
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | All User</title>
      </Helmet>{" "}
      <div>
        <div className={"flex max-w-sm ml-auto mt-10 pr-6 justify-end"}>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton={<Button>Search</Button>}
          />
        </div>
      </div>
      <Table className={"mb-24"} dataSource={data?.data}>
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
          render={(value, record, index) => {
            return (
              <>
                {" "}
                {record.role === "admin" ? (
                  <Button disabled>Already Admin</Button>
                ) : (
                  <Button
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          mutation.mutate({ email: record.email });
                        }
                      });
                    }}
                  >
                    Make Admin
                  </Button>
                )}
              </>
            );
          }}
        />
      </Table>
    </>
  );
};
