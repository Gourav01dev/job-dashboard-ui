import React from "react";
import { ArrowDown, closed, redu, searchIcon } from "../../assets";
import InfoButton from "./InfoButton";

interface JobFilterBarProps {
  closedJobsCount?: number;
  setJobs?: () => void;
  jobs?: any[];
  isActive?:boolean,
  filters: {
    experience: string;
    jobType: string;
    jobProfile: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      experience: string;
      jobType: string;
      jobProfile: string;
    }>
  >;
}

const dropdownWrapper = "relative";
const dropdownStyle =
  "bg-darkGray text-white text-sm px-6 py-4 pr-10 rounded-md appearance-none min-w-[160px]";

const JobFilterBar: React.FC<JobFilterBarProps> = ({
  closedJobsCount,
  setJobs,
  jobs,
  filters,
  setFilters,
  isActive,
}) => {

  return (
    <div className="flex items-center justify-between py-2 bg-black text-white">
      <div className="flex items-center gap-3 py-2 bg-black text-white">
        <div className="flex gap-2 items-center bg-[#101111] px-6 py-4 rounded-md w-64 min-h-[44px]">
          <img src={searchIcon} alt="Search" />
          <input
            type="text"
            placeholder="Enter a job title"
            className="bg-transparent text-sm outline-none w-full placeholder-gray-400"
          />
        </div>

        <div className={dropdownWrapper}>
          <select
            className={dropdownStyle}
            value={filters.jobProfile}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, jobProfile: e.target.value,  }))
            }
          >
            <option value="">Job Profile</option>
            {[...new Set(jobs?.map((item) => item.jobProfile))].map(
              (profile) => (
                <option key={profile} value={profile}>
                  {profile}
                </option>
              )
            )}
          </select>
          <img
            src={ArrowDown}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none"
          />
        </div>

        <div className={dropdownWrapper}>
          <select
            className={dropdownStyle}
            value={filters.experience}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, experience: e.target.value }))
            }
          >
            <option value="">Experience</option>
            {[...new Set(jobs?.map((item) => item.experience))].map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
          <img
            src={ArrowDown}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none"
          />
        </div>

        <div className={dropdownWrapper}>
          <select
            className={dropdownStyle}
            value={filters.jobType}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, jobType: e.target.value }))
            }
          >
            <option value="">Employment type</option>
            {[...new Set(jobs?.map((item) => item.jobType))].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <img
            src={ArrowDown}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none"
          />
        </div>

        <button
          className="bg-darkGray p-4 rounded-md"
          onClick={() =>
            setFilters({ experience: "", jobProfile: "", jobType: "" })
          }
        >
          <img src={redu} alt="Reset" />
        </button>
      </div>
      <InfoButton
        icon={closed}
        label="Closed"
        count={closedJobsCount}
        setJobs={setJobs}
        isActive={isActive}
      />
    </div>
  );
};

export default JobFilterBar;
