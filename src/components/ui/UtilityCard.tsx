import React from "react";

interface UtilityCardProps {
  backgroundColor: string;
  label:string;
  count:number;
  image:string;
  backgroundImage:string,
}


const UtilityCard: React.FC<UtilityCardProps> = ({
  backgroundColor = "#293369",label,count,image,backgroundImage
}) => {
  return (
    <div
      className="relative min-w-[296px]  max-w-[360px] p-6 max-h-[104px] text-white flex items-start rounded-xl"
      style={{ backgroundColor, boxShadow: "0px 4px 11.9px 0px #00000005"}}
    >
      <div className="min-w-[211px] flex flex-col">
        <span className="text-sm">{label}</span>
        <span className="text-[32px]">{count}</span>
      </div>
      <button className="z-20">
        <img src={image} alt={label}></img>
      </button>
      <img src={backgroundImage} alt="backgroundImage" className="absolute right-0 -bottom-0"/>
    </div>
  );
};

export default UtilityCard;
