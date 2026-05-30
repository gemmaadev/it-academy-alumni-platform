import { describe, it, expect } from "vitest";
import { filterAlumnis } from "../logic/networking";
import { mockAlumni } from "./mocks/alumni.mock";

describe("filterAlumnis - Alumni Search", () => {
  // Scenario: Search by first name
  it("should return alumni whose first name contains the query", () => {
    const result = filterAlumnis("John", mockAlumni);
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((a) =>
        `${a.firstName} ${a.lastName}`.toLowerCase().includes("john"),
      ),
    ).toBe(true);
  });

  // Scenario: Search by last name
  it("should return alumni whose last name contains the query", () => {
    const result = filterAlumnis("Doe", mockAlumni);
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((a) =>
        `${a.firstName} ${a.lastName}`.toLowerCase().includes("doe"),
      ),
    ).toBe(true);
  });

  // Scenario: Search by position
  it("should return alumni with matching position", () => {
    const result = filterAlumnis("CEO", mockAlumni);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((a) => a.position.toLowerCase().includes("ceo"))).toBe(
      true,
    );
  });

  // Scenario: Search by location
  it("should return alumni located in New York", () => {
    const result = filterAlumnis("New York", mockAlumni);
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((a) => a.location.toLowerCase().includes("new york")),
    ).toBe(true);
  });

  // Scenario: No results found
  it("should return empty array when no alumni match the query", () => {
    const result = filterAlumnis("zzzzz", mockAlumni);
    expect(result).toHaveLength(0);
  });

  // Scenario: Clear search
  it("should return all alumni when query is empty", () => {
    const result = filterAlumnis("", mockAlumni);
    expect(result).toHaveLength(mockAlumni.length);
  });
});
