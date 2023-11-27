import { Avatar, Button, Table } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosOpen from "../../../Hooks/UseAxiosOpen.jsx";
import { useAxiosPrivate } from "../../../Hooks/useAxiosPrivate.jsx";

export const AllUsers = () => {
  const axiosOpen = useAxiosOpen();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosPrivate();
  const { Column } = Table;
  const { data } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      return await axiosSecure.get("/users");
    },
  });
  const mutation = useMutation({
    mutationFn: ({ email }) => {
      return axiosOpen.put(`/admin/make/${email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });

  return (
    <>
      {" "}
      <Table className={"h-[80vh]"} dataSource={data?.data}>
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
                    onClick={() => mutation.mutate({ email: record.email })}
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
