import { Avatar, Button, ConfigProvider, Table, Tooltip } from "antd";
import useAxiosOpen from "../../../Hooks/UseAxiosOpen.jsx";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const TeacherRequest = () => {
  const axiosOpen = useAxiosOpen();

  const queryClient = useQueryClient();
  const { Column } = Table;
  const { data } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      return await axiosOpen.get("/teacher/request");
    },
  });

  const handleAccept = (email) => {
    console.log(email);
    mutation.mutate(email);
  };

  const mutation = useMutation({
    mutationFn: (put) => {
      return axiosOpen.put(`/teacher/accept/${put}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });

  return (
    <>
      <div>
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
                  <Tooltip title={"Accept"}>
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "white",
                          colorBgContainer: "green",
                        },
                      }}
                    >
                      <Button
                        className={"bg-green-500 hover:text-white text-white"}
                        onClick={() => handleAccept(record?.teacherEmail)}
                        icon={<CheckCircleOutlined />}
                      ></Button>
                    </ConfigProvider>
                  </Tooltip>

                  <Tooltip title={"Reject"}>
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "white",
                          colorBgContainer: "green",
                        },
                      }}
                    >
                      {record?.status === "approve" ? (
                        <Button
                          icon={<CloseCircleOutlined />}
                          disabled
                        ></Button>
                      ) : (
                        <Button
                          className={"bg-red-500 hover:text-white text-white"}
                          icon={<CloseCircleOutlined />}
                        ></Button>
                      )}
                    </ConfigProvider>
                  </Tooltip>
                </div>
              );
            }}
          />
        </Table>
      </div>
    </>
  );
};
