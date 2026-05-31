import type { Job } from "../types/job";

export interface JobFilters {
  search: string;
  industry: string;
  experienceLevel: string;
}

export function filterJobs(jobs: Job[], filters: JobFilters): Job[] {
  const searchTerm = filters.search.toLowerCase().trim();
  const industry = filters.industry.toLowerCase().trim();
  const experienceLevel = filters.experienceLevel.toLowerCase().trim();

  return jobs.filter((job) => {
    const matchesSearch =
      !searchTerm ||
      job.title.toLowerCase().includes(searchTerm) ||
      job.company.toLowerCase().includes(searchTerm) ||
      job.location.toLowerCase().includes(searchTerm) ||
      job.type.toLowerCase().includes(searchTerm);

    const matchesIndustry =
      !industry || job.industry.toLowerCase() === industry;

    const matchesExperience =
      !experienceLevel || job.experienceLevel.toLowerCase() === experienceLevel;

    return matchesSearch && matchesIndustry && matchesExperience;
  });
}
