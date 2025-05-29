export interface Job {
  _id: string;
  jobProfile: string;
  salary: string;
  experience: string;
  jobType: 'contract' | 'fulltime';
  status: 'open' | 'closed' | 'draft';
  jobDescription: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface JobResponse {
  message: string;
  data: Job[];
}

export interface JobStatus {
  activeJobs: number;
  applicationRecieved:number;
  hired:number
}

// export interface JobStatus {
//   activeJobs: number;
//   applicationRecieved: number;
//   hired: number;
// }

export interface CreateJobPayload {
  jobProfile: string;
  createdAt: string;  // e.g. "21-5-2025"
  salary: string;
  experience: string;
  jobType: string;
  jobDescription: string;
}