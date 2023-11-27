import { Avatar, Button, ConfigProvider, Table, Tooltip } from "antd";
import useAxiosOpen from "../../../Hooks/UseAxiosOpen.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useAxiosPrivate } from "../../../Hooks/useAxiosPrivate.jsx";

export const TeacherRequest = () => {
  const axiosSecure = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { Column } = Table;
  const { data } = useQuery({
    queryKey: ["teacherRequest"],
    queryFn: async () => {
      return await axiosSecure.get("/teacher/request");
    },
  });

  const mutation = useMutation({
    mutationFn: ({ email, status }) => {
      return axiosSecure.put(`/teacher/accept/${email}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacherRequest"] });
    },
  });

  return (
    <>
      <div className={"h-[80vh]"}>
        <Table dataSource={data?.data}>
          <Column
            title="Photo"
            dataIndex="teacherPhoto"
            key="teacherPhoto"
            responsive={["md"]}
            render={(photo) => {
              return (
                <>
                  <Avatar size={"large"} src={photo} />
                </>
              );
            }}
          />
          <Column title="Name" dataIndex="teacherName" key="teacherName" />
          <Column
            title="Experience"
            dataIndex="teacherExperience"
            key="teacherExperience"
          />
          <Column title="Title" dataIndex="teacherTitle" key="teacherTitle" />
          <Column
            title="Category"
            dataIndex="teacherCategory"
            key="teacherCategory"
          />
          <Column title="Status" dataIndex="status" key="status" />
          <Column
            dataIndex="teacher info"
            key="teacherEmail"
            render={(value, record, index) => {
              return (
                <div className={" flex gap-4"}>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "white",
                        colorBgContainer: "green",
                      },
                    }}
                  >
                    <Tooltip title={"Accept"}>
                      {record?.status === "pending" ? (
                        <Button
                          className={"bg-green-500 hover:text-white text-white"}
                          onClick={() =>
                            mutation.mutate({
                              email: record?.teacherEmail,
                              status: "approve",
                            })
                          }
                          icon={<CheckCircleOutlined />}
                        ></Button>
                      ) : (
                        <Button
                          icon={<CheckCircleOutlined />}
                          disabled
                        ></Button>
                      )}
                    </Tooltip>
                  </ConfigProvider>

                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "white",
                        colorBgContainer: "green",
                      },
                    }}
                  >
                    <Tooltip title={"Reject"}>
                      {record?.status === "pending" ? (
                        <Button
                          onClick={() =>
                            mutation.mutate({
                              email: record?.teacherEmail,
                              status: "reject",
                            })
                          }
                          className={"bg-red-500 hover:text-white text-white"}
                          icon={<CloseCircleOutlined />}
                        ></Button>
                      ) : (
                        <Button
                          icon={<CloseCircleOutlined />}
                          disabled
                        ></Button>
                      )}
                    </Tooltip>
                  </ConfigProvider>
                </div>
              );
            }}
          />
        </Table>
      </div>
    </>
  );
};
