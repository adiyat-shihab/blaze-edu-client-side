export const Outline = ({ image, heading, body }) => {
  return (
    <>
      <div className={"flex gap-[1.56rem] items-center"}>
        <div className={" p-[1.25rem] rounded-[1.4375rem] bg-[#ffffff33]"}>
          <img className={"w-[4.75rem] "} src={image} alt="" />
        </div>
        <div>
          <h2 className={"lg:text-[1.75rem] text-xl font-bold text-white"}>
            {heading}
          </h2>
          <p
            className={
              " text-xs lg:text-[0.9375rem] mt-2 leading-5 text-[#ffffff99] font-medium "
            }
          >
            {body}
          </p>
        </div>
      </div>
    </>
  );
};
