import axios from 'axios';
import type { CreateJobPayload, Job } from '../types/job';
const API_BASE = 'http://localhost:5000/api/job';

export const fetchActiveJobs = async (): Promise<Job[]> => {
  const res = await axios.get(`${API_BASE}/active-jobs`);
  return res.data.data || res.data; 
};

export const fetchClosedJobs = async (): Promise<Job[]> => {
  const res = await axios.get(`${API_BASE}/closed-jobs`);
  return res.data.data || res.data;
};

export const fetchDraftJobs = async (): Promise<Job[]> => {
  const res = await axios.get(`${API_BASE}/draft-jobs`);
  return res.data.data || res.data;
};

export const postJob = async (jobData: CreateJobPayload): Promise<Job> => {
  const res = await axios.post(API_BASE + '/', jobData);
  return res.data.data || res.data;
};

export const postDraftJob = async (jobData: CreateJobPayload): Promise<Job> => {
  const res = await axios.post(`${API_BASE}/add-draft`, jobData);
  return res.data.data || res.data;
};

export const closeJob = async (jobId: string): Promise<Job> => {
  const res = await axios.patch(`${API_BASE}/${jobId}`);
  return res.data.data || res.data;
};

export const fetchFilteredJobs = async (filters: { experience?: string; jobType?: string; jobProfile?: string }): Promise<Job[]> => {
  const params = new URLSearchParams();

  if (filters.experience) params.append('experience', filters.experience);
  if (filters.jobType) params.append('jobType', filters.jobType);
  if (filters.jobProfile) params.append('jobProfile', filters.jobProfile);

  const res = await axios.get(`${API_BASE}?${params.toString()}`);
  return res.data.data || res.data;
};
