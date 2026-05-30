import type { Job } from "../../types/job";

const API_URL =
  "https://my-json-server.typicode.com/gemmaadev/it-academy-alumni-api/jobs";

export const getJobs = async (
  onError: (error: Error | unknown) => void,
): Promise<Job[]> => {
  try {
    const response = await fetch(API_URL);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Error al carregar les ofertes de feina`);
    }

    const job: Job[] = await response.json();
    return job;
  } catch (error: Error | unknown) {
    console.error("Error fetching job:", error);
    onError(error);
    throw error;
  }
};
