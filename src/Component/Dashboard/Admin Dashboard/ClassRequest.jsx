import useAxiosOpen from "../../../Hooks/UseAxiosOpen.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Button, ConfigProvider, Table, Tooltip } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const ClassRequest = () => {
  const axiosOpen = useAxiosOpen();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["adminClassList"],
    queryFn: async () => {
      return await axiosOpen.get("/admin/all/class");
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }) => {
      console.log(id, status);
      return axiosOpen.put(`/admin/approve/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });

  const columns = [
    {
      title: "Donar Name",
      dataIndex: "photo",
      key: "photo",
      render: (link) => {
        return (
          <>
            <LazyLoadImage src={link} className={"rounded-lg w-24 "} />
          </>
        );
      },
    },
    {
      title: "Course Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Teacher Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Course Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Progressing",
      render: () => {
        return (
          <>
            <Button>See Progress</Button>
          </>
        );
      },
    },
    {
      render: (record) => {
        return (
          <>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "white",
                  colorBgContainer: "green",
                },
              }}
            >
              <Tooltip title={"Approve"}>
                {" "}
                {record?.status === "pending" ? (
                  <Button
                    className={"bg-green-500 hover:text-white text-white"}
                    icon={<CheckCircleOutlined />}
                    onClick={() => {
                      mutation.mutate({ id: record._id, status: "approve" });
                    }}
                  ></Button>
                ) : (
                  <Button icon={<CheckCircleOutlined />} disabled></Button>
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
                    className={"bg-red-500 hover:text-white text-white"}
                    icon={<CloseCircleOutlined />}
                  ></Button>
                ) : (
                  <Button icon={<CloseCircleOutlined />} disabled></Button>
                )}
              </Tooltip>
            </ConfigProvider>
          </>
        );
      },
    },
  ];
  return (
    <>
      <div>
        <Helmet>
          <title>Class Request</title>
        </Helmet>
        <div className={"  "}>
          <Table
            dataSource={data?.data}
            className={"cursor-pointer font-medium "}
            columns={columns}
            scroll={{ x: true }}
            responsive={["sm"]}
          />
        </div>
      </div>
    </>
  );
};
