import axiosInstance from './api';

// Auth services
export const authApi = {
  registerWorker: (data) => axiosInstance.post('/auth/register-worker', data),
  registerContractor: (data) => axiosInstance.post('/auth/register-contractor', data),
  loginWorker: (data) => axiosInstance.post('/auth/login-worker', data),
  loginContractor: (data) => axiosInstance.post('/auth/login-contractor', data)
};

// Worker services
export const workerApi = {
  getProfile: () => axiosInstance.get('/workers/profile'),
  updateProfile: (data) => axiosInstance.put('/workers/profile', data),
  getWorkerById: (id) => axiosInstance.get(`/workers/${id}`),
  searchWorkers: (location, skills) => axiosInstance.get('/workers/search', { params: { location, skills } }),
  addSkillEndorsement: (data) => axiosInstance.post('/workers/endorse', data)
};

// Job services
export const jobApi = {
  getAllJobs: (status = 'open') => axiosInstance.get('/jobs', { params: { status } }),
  getJobById: (id) => axiosInstance.get(`/jobs/${id}`),
  createJob: (data) => axiosInstance.post('/jobs', data),
  applyForJob: (jobId) => axiosInstance.post('/jobs/apply', { jobId }),
  acceptApplication: (jobId, workerId) => axiosInstance.put('/jobs/accept-application', { jobId, workerId }),
  completeJob: (jobId) => axiosInstance.put(`/jobs/complete/${jobId}`),
  searchJobs: (location, skills, radius) => axiosInstance.get('/jobs/search', { params: { location, skills, radius } })
};

// Rating services
export const ratingApi = {
  addRating: (data) => axiosInstance.post('/ratings', data),
  getWorkerRatings: (workerId) => axiosInstance.get(`/ratings/worker/${workerId}`),
  getContractorRatings: (contractorId) => axiosInstance.get(`/ratings/contractor/${contractorId}`)
};

// Contractor services
export const contractorApi = {
  getProfile: () => axiosInstance.get('/contractors/profile'),
  updateProfile: (data) => axiosInstance.put('/contractors/profile', data),
  getDashboard: () => axiosInstance.get('/contractors/dashboard'),
  addFavoriteWorker: (workerId) => axiosInstance.post('/contractors/favorite-worker', { workerId }),
  getFavoriteWorkers: () => axiosInstance.get('/contractors/favorite-workers')
};

// Skill services
export const skillApi = {
  getAllSkills: (category) => axiosInstance.get('/skills', { params: { category } }),
  getSkillById: (id) => axiosInstance.get(`/skills/${id}`),
  getSkillsByCategory: (category) => axiosInstance.get(`/skills/category/${category}`)
};
