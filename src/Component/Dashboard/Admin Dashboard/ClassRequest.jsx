import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Button, ConfigProvider, Table, Tooltip } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useAxiosSecure } from "../../../Hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export const ClassRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["adminClassList"],
    queryFn: async () => {
      return await axiosSecure.get("/admin/all/class");
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }) => {
      return axiosSecure.put(`/admin/approve/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminClassList"] });
      Swal.fire({
        title: "Success!",
        icon: "success",
      });
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
      render: (description) => {
        return (
          <>
            <Tooltip title={description}>
              <p
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "400px",
                }}
              >
                {description}
              </p>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Progressing",
      render: (record) => {
        return (
          <>
            {record?.status === "approve" ? (
              <Link to={`/dashboard/class/request/${record._id}`}>
                {" "}
                <Button>See Progress</Button>
              </Link>
            ) : (
              <Button disabled>See Progress</Button>
            )}
          </>
        );
      },
    },
    {
      render: (record) => {
        return (
          <div>
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
                      Swal.fire({
                        title: "Are you sure?",

                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          mutation.mutate({
                            id: record._id,
                            status: "approve",
                          });
                        }
                      });
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
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",

                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          mutation.mutate({
                            id: record._id,
                            status: "reject",
                          });
                        }
                      });
                    }}
                    className={"bg-red-500 hover:text-white text-white"}
                    icon={<CloseCircleOutlined />}
                  ></Button>
                ) : (
                  <Button icon={<CloseCircleOutlined />} disabled></Button>
                )}
              </Tooltip>
            </ConfigProvider>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className={"pb-32"}>
        <Helmet>
          <title>Class Request</title>
        </Helmet>
        <div className={" "}>
          <Table
            dataSource={data?.data}
            className={"cursor-pointer overflow-x-auto  font-medium "}
            columns={columns}
            scroll={{ x: true }}
            responsive={["sm"]}
          />
        </div>
      </div>
    </>
  );
};
