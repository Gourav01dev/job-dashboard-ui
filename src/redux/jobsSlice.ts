import  { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Job, JobResponse } from '../types/job';
import axios from 'axios';

interface JobsState {
  openJobs: Job[];
  draftJobs: Job[];
  closedJobs: Job[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: JobsState = {
  openJobs: [],
  draftJobs: [],
  closedJobs: [],
  status: 'idle',
  error: null,
};

// Async thunks
export const fetchOpenJobs = createAsyncThunk<JobResponse>('jobs/fetchOpenJobs', async () => {
  const response = await axios.get('/api/jobs/open');
  return response.data;
});

export const fetchDraftJobs = createAsyncThunk<JobResponse>('jobs/fetchDraftJobs', async () => {
  const response = await axios.get('/api/jobs/draft');
  return response.data;
});

export const fetchClosedJobs = createAsyncThunk<JobResponse>('jobs/fetchClosedJobs', async () => {
  const response = await axios.get('/api/jobs/closed');
  return response.data;
});

export const postNewJob = createAsyncThunk<Job, Partial<Job>>('jobs/postNewJob', async (jobData) => {
  const response = await axios.post('/api/jobs', jobData);
  return response.data.data;
});

export const postDraftJob = createAsyncThunk<Job, Partial<Job>>('jobs/postDraftJob', async (jobData) => {
  const response = await axios.post('/api/jobs/draft', jobData);
  return response.data.data;
});

export const closeJob = createAsyncThunk<Job, string>('jobs/closeJob', async (jobId) => {
  const response = await axios.post(`/api/jobs/close/${jobId}`);
  return response.data.data;
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpenJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOpenJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.openJobs = action.payload.data;
      })
      .addCase(fetchDraftJobs.fulfilled, (state, action) => {
        state.draftJobs = action.payload.data;
      })
      .addCase(fetchClosedJobs.fulfilled, (state, action) => {
        state.closedJobs = action.payload.data;
      })
      .addCase(postNewJob.fulfilled, (state, action) => {
        state.openJobs.push(action.payload);
      })
      .addCase(postDraftJob.fulfilled, (state, action) => {
        state.draftJobs.push(action.payload);
      })
      .addCase(closeJob.fulfilled, (state, action) => {
        const closedJob = action.payload;
        state.openJobs = state.openJobs.filter(job => job._id !== closedJob._id);
        state.closedJobs.push(closedJob);
      })
      .addMatcher(
        (action): action is { type: string; error: { message: string } } => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error?.message || 'Something went wrong';
        }
      );
  },
});

export default jobsSlice.reducer;
