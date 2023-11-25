export const ProfileDetails = ({ header, details }) => {
  return (
    <>
      <div className={"space-y-2"}>
        <h6 className={"text-xs font-medium"}>{header}</h6>
        <p>{details}</p>
      </div>
    </>
  );
};
