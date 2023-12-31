import { UseAuth } from "../../Hooks/UseAuth.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ProfileDetails } from "../../Utils/ProfileDetails.jsx";
import { Helmet } from "react-helmet";

export const UserProfile = () => {
  const { data } = UseAuth();

  return (
    <>
      <Helmet>
        <title>Dashboard | Profile</title>
      </Helmet>
      <div>
        <h1 className={"font-bold text-3xl"}>My Profile</h1>
        <div className={"flex py-24 gap-[61px] mt-16"}>
          <LazyLoadImage
            effect={"blur"}
            className={"w-[150px] rounded-full "}
            src={data?.data?.photo}
            alt=""
          />
          <div className={"space-y-10"}>
            <ProfileDetails header={"Full Name"} details={data?.data?.name} />
            <ProfileDetails header={"Role"} details={data?.data?.role} />
            <ProfileDetails header={"Email"} details={data?.data?.email} />
            <div className={"space-y-2"}>
              <h1 className={"text-xs font-medium"}>Phone</h1>
              <p>+{data?.data?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
