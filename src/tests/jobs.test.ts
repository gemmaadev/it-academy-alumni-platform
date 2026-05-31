import { describe, it, expect } from "vitest";
import { filterJobs } from "../logic/filterJobs";
import { mockJobs } from "./mocks/jobs.mock";

describe("filterJobs", () => {
  // Scenario: Search by title
  it("should return only jobs with 'engineer' in the title", () => {
    const result = filterJobs(mockJobs, {
      search: "engineer",
      industry: "",
      experienceLevel: "",
    });
    expect(
      result.every((job) => job.title.toLowerCase().includes("engineer")),
    ).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  // Scenario: Search by company
  it("should return only jobs from company 'ABC'", () => {
    const result = filterJobs(mockJobs, {
      search: "ABC",
      industry: "",
      experienceLevel: "",
    });
    expect(result.every((job) => job.company === "ABC")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  // Scenario: Search by location
  it("should return only jobs located in 'New York'", () => {
    const result = filterJobs(mockJobs, {
      search: "New York",
      industry: "",
      experienceLevel: "",
    });
    expect(result.every((job) => job.location === "New York")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  // Scenario: Search by contract type
  it("should return only jobs of type 'part-time'", () => {
    const result = filterJobs(mockJobs, {
      search: "part-time",
      industry: "",
      experienceLevel: "",
    });
    expect(
      result.every((job) => job.type.toLowerCase().includes("part-time")),
    ).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  // Scenario: Filter by industry
  it("should return only jobs from 'Human Resources' industry", () => {
    const result = filterJobs(mockJobs, {
      search: "",
      industry: "human resources",
      experienceLevel: "",
    });
    expect(result.every((job) => job.industry === "Human Resources")).toBe(
      true,
    );
    expect(result.length).toBeGreaterThan(0);
  });

  // Scenario: Filter by experience level
  it("should return only jobs with 'Junior' experience level", () => {
    const result = filterJobs(mockJobs, {
      search: "",
      industry: "",
      experienceLevel: "junior",
    });
    expect(result.every((job) => job.experienceLevel === "Junior")).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  // Scenario: Combine industry and experience filters
  it("should return only Technology Senior jobs when both filters are applied", () => {
    const result = filterJobs(mockJobs, {
      search: "",
      industry: "technology",
      experienceLevel: "senior",
    });
    expect(
      result.every(
        (job) =>
          job.industry === "Technology" && job.experienceLevel === "Senior",
      ),
    ).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  // Scenario: Search with multiple active filters
  it("should return only jobs matching 'engineer' search and 'Technology' industry", () => {
    const result = filterJobs(mockJobs, {
      search: "engineer",
      industry: "technology",
      experienceLevel: "",
    });
    expect(
      result.every(
        (job) =>
          job.title.toLowerCase().includes("engineer") &&
          job.industry === "Technology",
      ),
    ).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  // Scenario: No results found
  it("should return empty array when no jobs match the search", () => {
    const result = filterJobs(mockJobs, {
      search: "xyzxyzxyz",
      industry: "",
      experienceLevel: "",
    });
    expect(result).toHaveLength(0);
  });

  // Scenario: Reset filters
  it("should return all jobs when all filters are cleared", () => {
    const result = filterJobs(mockJobs, {
      search: "",
      industry: "",
      experienceLevel: "",
    });
    expect(result).toHaveLength(mockJobs.length);
  });
});
