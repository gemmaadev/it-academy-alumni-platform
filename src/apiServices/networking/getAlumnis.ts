import type { Alumni } from "../../types/alumni";

const API_URL =
  "https://my-json-server.typicode.com/gemmaadev/it-academy-alumni-api/alumni";

export const getAlumnis = async (
  onError: (error: Error | unknown) => void,
): Promise<Alumni[]> => {
  try {
    const response = await fetch(API_URL);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Error al carregar els alumnes`);
    }

    const alumni: Alumni[] = await response.json();
    return alumni;
  } catch (error: Error | unknown) {
    console.error("Error fetching alumni:", error);
    onError(error);
    throw error;
  }
};
