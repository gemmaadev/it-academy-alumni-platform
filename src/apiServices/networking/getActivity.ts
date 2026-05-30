// TODO: En producció, aquest endpoint retornaria dades dinàmiques
// generades pel backend cada vegada que un usuari fa una acció
// (follow, connection, share, etc.)

import type { Activity } from "../../types/activity";

const API_URL =
  "https://my-json-server.typicode.com/gemmaadev/it-academy-alumni-api/activity";

export const getActivity = async (
  onError: (error: Error | unknown) => void,
): Promise<Activity[]> => {
  try {
    const response = await fetch(API_URL);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Error al carregar l'activitat recent`);
    }

    const activity: Activity[] = await response.json();
    return activity;
  } catch (error: Error | unknown) {
    console.error("Error fetching activity:", error);
    onError(error);
    throw error;
  }
};
