import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchActiveJobs,
  fetchClosedJobs,
  fetchDraftJobs,
  postJob,
  postDraftJob,
  closeJob,
  fetchFilteredJobs,
} from "../../api/jobsApi";
import type { CreateJobPayload, Job } from "../../types/job";

export const useActiveJobs = () => {
  return useQuery<Job[]>({
    queryKey: ["activeJobs"],
    queryFn: fetchActiveJobs,
  });
};

export const useClosedJobs = () => {
  return useQuery<Job[]>({
    queryKey: ["closedJobs"],
    queryFn: fetchClosedJobs,
  });
};

export const useDraftJobs = () => {
  return useQuery<Job[]>({
    queryKey: ["draftJobs"],
    queryFn: fetchDraftJobs,
  });
};

export const usePostJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newJob: CreateJobPayload) => postJob(newJob),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeJobs"] });
    },
  });
};

export const usePostDraftJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newJob: CreateJobPayload) => postDraftJob(newJob),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["draftJobs"] });
    },
  });
};

export const useCloseJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId: string) => closeJob(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeJobs"] });
      queryClient.invalidateQueries({ queryKey: ["closedJobs"] });
    },
    onError: (err) => {
      console.error("Failed to close job", err);
    },
  });
};

export const useFilteredJobs = (filters: {
  experience?: string;
  jobType?: string;
  jobProfile?: string;
}) => {
  const enabled =
    !!filters.experience || !!filters.jobType || !!filters.jobProfile;

  return useQuery<Job[]>({
    queryKey: ["filteredJobs", filters],
    queryFn: () => fetchFilteredJobs(filters),
    enabled,
  });
};
