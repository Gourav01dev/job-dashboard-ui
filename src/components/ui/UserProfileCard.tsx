import React from "react";
import { ArrowDown, userProfile, verifiedIcon } from "../../assets";

const UserProfileCard: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-1 py-2 bg-[#232324] rounded-xl">
      <div className="flex items-center">
        <img src={userProfile} alt="user image" width={41} />
        <div className="ml-2">
          <h5>User name</h5>
          <div className="flex gap-1">
            <img src={verifiedIcon} alt="verifiedLogo" />
            <span className="text-[11px]">Hiring manager</span>
          </div>
        </div>
      </div>
      <img src={ArrowDown} alt="Arrow down" />
    </div>
  );
};

export default UserProfileCard;
