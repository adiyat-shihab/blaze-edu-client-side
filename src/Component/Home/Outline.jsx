export const Outline = ({ image, heading, body }) => {
  return (
    <>
      <div className={"flex gap-[1.56rem] items-center"}>
        <div className={" p-[1.25rem] rounded-[1.4375rem] bg-[#ffffff33]"}>
          <img className={"w-[4.75rem] "} src={image} alt="" />
        </div>
        <div>
          <h2 className={"text-[1.75rem] font-bold text-white"}>{heading}</h2>
          <p className={"text-[0.9375rem] mt-2 text-[#ffffff99] font-medium "}>
            {body}
          </p>
        </div>
      </div>
    </>
  );
};
