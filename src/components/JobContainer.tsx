import React, { useEffect, useState } from "react";
import PageTitle from "./ui/PageTitle";
import UtilityCard from "./ui/UtilityCard";
import { utilityCards } from "../utils/constants";
import InfoButton from "./ui/InfoButton";
import { draftIcon, pluse } from "../assets";
import JobDescriptionCard from "./ui/JobDescriptionCard";
import JobFilterBar from "./ui/JobFilterBar";
import {
  useActiveJobs,
  useClosedJobs,
  useDraftJobs,
  useFilteredJobs,
  useJobStatus,
} from "../features/jobs/useJobs";
import type { Job } from "../types/job";
import LoadingSpinner from "./ui/LoadingSpinner";

const JobContainer: React.FC = () => {
  const { data: activeJobs, isLoading, error } = useActiveJobs();
  const { data: closedJobs } = useClosedJobs();
  const { data: draftJobs } = useDraftJobs();
  const { data: jobStatus } = useJobStatus();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeStateData, setActiveStateData] = useState(utilityCards)
  const [selectedCategory, setSelectedCategory] = useState<"active" | "closed" | "draft">("active");
  const [filters, setFilters] = useState({
    experience: "",
    jobProfile: "",
    jobType: "",
  });

  useEffect(() => {
  const updatedCards = utilityCards.map((card) => {
    if (card.label === 'Total Jobs Posted') {
      return { ...card, count: jobStatus?.activeJobs ?? 0 };
    }
    if (card.label === 'Application received') {
      return { ...card, count: jobStatus?.applicationRecieved ?? 0 };
    }
    if (card.label === 'Hired') {
      return { ...card, count: jobStatus?.hired ?? 0 };
    }
    return card;
  });

  setActiveStateData(updatedCards);
}, [jobStatus]);

  const { data: filteredJobs } = useFilteredJobs({...filters, status: selectedCategory});

  const handleToggleJobs = (category: "active" | "closed" | "draft") => {
  if (selectedCategory === category) {
    setSelectedCategory("active");
    setJobs(activeJobs ?? []);
  } else {
    setSelectedCategory(category);
    if (category === "closed") setJobs(closedJobs ?? []);
    else if (category === "draft") setJobs(draftJobs ?? []);
    else setJobs(activeJobs ?? []);
  }
};

  useEffect(() => {
  if (activeJobs && selectedCategory === "active") {
    setJobs(activeJobs);
  }
}, [activeJobs, selectedCategory]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading jobs</div>;
  return (
    <div className="px-8 py-5 w-full">
      <PageTitle title="JOBS" />
      <div className="w-full flex flex-wrap items-end justify-between gap-4 lg:gap-8">
        <div className="flex flex-wrap gap-4 lg:gap-6 flex-grow">
          {activeStateData.map((item, index) => (
            <UtilityCard
              key={index}
              label={item.label}
              count={item.count}
              backgroundColor={item.backgroundColor}
              image={item.image}
              backgroundImage={item.backgroundImage}
            />
          ))}
        </div>

        <div className="flex gap-3 sm:gap-4 flex-wrap">
          <InfoButton
            icon={draftIcon}
            label="Draft"
            bgColor="#000B37"
            count={draftJobs?.length}
            setJobs={() => handleToggleJobs("draft")}
            isActive={selectedCategory === "draft"}
          />
          <InfoButton icon={pluse} label="Post New Job" bgColor="#0032FB" />
        </div>
      </div>

      <div className="py-4">
        <JobFilterBar
          closedJobsCount={closedJobs?.length}
          setJobs={() => handleToggleJobs("closed")}
          jobs={jobs ?? []}
          filters={filters}
          setFilters={setFilters}
          isActive={selectedCategory === "closed"}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {filters.experience || filters.jobProfile || filters.jobType ? (
          filteredJobs && filteredJobs.length > 0 ? (
            filteredJobs.map((item: Job) => (
              <JobDescriptionCard
                key={item._id}
                id={item._id}
                title={item.jobProfile || ""}
                postedTime="56 minutes ago"
                type={item.jobType || ""}
                rate={item.salary || ""}
                experience={item.experience || ""}
                description={item.jobDescription || ""}
                applied={16}
                clicked={41}
                inProcess={6}
                selectedCategory={selectedCategory}
              />
            ))
          ) : (
            <div>No filtered jobs found</div>
          )
        ) : jobs.length > 0 ? (
          jobs.map((item: Job) => (
            <JobDescriptionCard
              key={item._id}
              id={item._id}
              title={item.jobProfile || ""}
              postedTime="56 minutes ago"
              type={item.jobType || ""}
              rate={item.salary || ""}
              experience={item.experience || ""}
              description={item.jobDescription || ""}
              applied={16}
              clicked={41}
              inProcess={6}
              selectedCategory={selectedCategory}
            />
          ))
        ) : (
          <div>No jobs found</div>
        )}
      </div>
    </div>
  );
};

export default JobContainer;
