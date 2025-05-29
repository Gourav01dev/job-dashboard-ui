import React, { useState, useRef, useEffect } from "react";
import { clock, money, stats } from "../../assets";
import { useCloseJob } from "../../features/jobs/useJobs";

interface JobCardProps {
  id:string,
  title: string;
  postedTime: string;
  type: string;
  rate: string;
  experience: string;
  description: string;
  applied: number;
  clicked: number;
  inProcess: number;
}
const JobDescriptionCard: React.FC<JobCardProps> = ({
  id,
  title,
  postedTime,
  type,
  rate,
  experience,
  description,
  applied,
  clicked,
  inProcess,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mutate: closeJob, error } = useCloseJob();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClosePosition = () => {
    console.log("Close Position clicked");
    setDropdownOpen(false);
    closeJob(id)
  };

  if(error){
    return <div>Unable to close this position</div>
  }
  return (
    <div className="bg-darkGray rounded-[10px] w-[414px] min-h-[217px] text-white relative">
      <div className="p-[12px]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-[18px] font-normal text-white">{title}</h3>
            <p className="text-xs text-textGray mt-2 italic">
              Posted: {postedTime}
            </p>
          </div>
          <button
            className="text-textGray text-xl"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            ⋮
          </button>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-medium mb-4">
          <div className="flex gap-1 items-center bg-zincDark px-[8px] py-[6px] rounded min-w-[80px]">
            <img src={clock} alt="Clock" className="shrink-0" />
            <span className="font-normal text-xs text-Primary">{type}</span>
          </div>
          <div className="flex gap-1 items-center bg-zincDark px-2 py-1 rounded">
            <img src={money} alt="Money" className="shrink-0" />
            <span className="font-normal text-xs text-Primary">{rate}</span>
          </div>
          <div className="flex gap-1 items-center bg-zincDark px-2 py-1 rounded">
            <img src={stats} alt="Stats" className="shrink-0" />
            <span className="font-normal text-xs text-Primary">
              {experience}
            </span>
          </div>
        </div>

        <p className="text-sm line-clamp-2 text-Secondary font-normal mb-[2px]">
          {description}
        </p>
      </div>

      <div
        className="flex justify-between text-center text-xs px-5 py-4 border-[4px] border-darkGray pt-3 rounded-t-[4px] rounded-b-[8px]"
        style={{
          background:
            "linear-gradient(90deg, #080808 0%, #090909 62.02%, #0F0F0F 100%)",
        }}
      >
        <div>
          <p className="text-base font-semibold">{applied}</p>
          <p className="text-textGray">Applied</p>
        </div>
        <div>
          <p className="text-base font-semibold">{clicked}</p>
          <p className="text-textGray">Clicked</p>
        </div>
        <div>
          <p className="text-base font-semibold">{inProcess}</p>
          <p className="text-textGray">Under process</p>
        </div>
      </div>

      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-12 right-4 bg-zincDark text-Primary rounded shadow-md z-50"
        >
          <button
            onClick={handleClosePosition}
            className="px-4 py-2 text-sm hover:opacity-75 w-full text-left"
          >
            Close Position
          </button>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionCard;
