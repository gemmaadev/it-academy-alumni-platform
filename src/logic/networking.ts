import { setupHeader } from "./header";
import { setupFooter } from "./footer";
import { getAlumnis } from "../apiServices/networking/getAlumnis";
import type { Alumni } from "../types/alumni";
import type { Activity } from "../types/activity";
import { getActivity } from "../apiServices/networking/getActivity";

let allAlumnis: Alumni[] = [];

// ───────────── RENDER FUNCTIONS (defineix com mostrar les dades) ──────────────────────
function filterAlumnis(query: string): Alumni[] {
  return allAlumnis.filter((alumni) =>
    `${alumni.firstName} ${alumni.lastName} ${alumni.position} ${alumni.location}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
}

function renderAlumni(alumnis: Alumni[]): void {
  const grid = document.getElementById("alumni-grid");
  if (!grid) return;

  // Amaga l'empty state sempre que es renderitza
  document.getElementById("alumni-empty")?.setAttribute("hidden", "");

  if (alumnis.length === 0) {
    document.getElementById("alumni-empty")?.removeAttribute("hidden");
    grid.innerHTML = "";
    return;
  }

  grid.innerHTML = alumnis
    ?.map(
      (alumni) => `
    <li class="alumni-card">
    <div class="alumni-card-info">
      <h3 class="alumni-card-name">${alumni.firstName} ${alumni.lastName}</h3>
      <p class="only-mobile"> Class of ${alumni.classOf}</p>
       <p class="alumni-card-role">${alumni.position} at ${alumni.company}</p>
      <p class="alumni-card-location only-desk">${alumni.location}</p>
      </div>
      <img src="https://ui-avatars.com/api/?name=${alumni.firstName}+${alumni.lastName}&background=ce0a86&color=fff&size=128&bold=true"
  alt="${alumni.firstName} ${alumni.lastName}"
  class="alumni-card-photo only-mobile"/>
      <button type="button" class="btn btn-primary btn-networking only-desk">Message</button>
    </li>`,
    )
    .join("");
}

function renderActivity(activities: Activity[]): void {
  const list = document.getElementById("recent-activity-list");
  if (!list) return;

  if (activities.length === 0) {
    document.getElementById("activity-empty")?.removeAttribute("hidden");
    return;
  }

  list.innerHTML = activities
    .map((activity) => {
      // TODO: En producció el backend retornaria el text ja formatat
      // Aquí ho construïm al frontend segons el type
      let text = "";
      if (activity.type === "follow") {
        text = `${activity.actor} started following ${activity.target}`;
      } else if (activity.type === "connection") {
        text = `${activity.actor} and ${activity.target} connected`;
      } else if (activity.type === "share") {
        text = `${activity.actor} shared "${activity.content}"`;
      }
      return `<li class="activity-item">${text}</li>`;
    })
    .join("");
}

function renderSuggestions(alumnis: Alumni[]): void {
  const list = document.getElementById("suggestions-list");
  if (!list) return;

  if (alumnis.length === 0) {
    document.getElementById("suggestions-empty")?.removeAttribute("hidden");
    return;
  }

  list.innerHTML = alumnis
    ?.map(
      (alumni) => `
    <li class="alumni-card alumni-card-info">
      <h3 class="alumni-card-name">${alumni.firstName} ${alumni.lastName}</h3>
       <p class="alumni-card-role">${alumni.position} at ${alumni.company}</p>
      <p class="alumni-card-location only-desk">${alumni.location}</p>
       <button type="button" class="btn btn-primary btn-networking">Connect</button>
    </li>`,
    )
    .join("");
}

export function renderError(
  error: Error | unknown,
  elementId: string = "alumni-error",
): void {
  const errorElement = document.getElementById(elementId);
  if (!errorElement) return;

  errorElement.textContent = (error as Error).message;
  errorElement.removeAttribute("hidden");
}

function setupSearch(): void {
  const input = document.getElementById("alumni-search") as HTMLInputElement;
  if (!input) return;

  input.addEventListener("input", () => {
    const query = input.value;
    const filteredAlumnis = filterAlumnis(query);
    renderAlumni(filteredAlumnis);
  });
}

// ───────────── DATA FETCHING (obté les dades i crida les render functions) ──────────────────────

const getAllAlumnisAndRender = async () => {
  const loadingEl = document.getElementById("alumni-loading");
  const section = document.querySelector('[aria-labelledby="alumni-heading"]');

  loadingEl?.removeAttribute("hidden");
  section?.setAttribute("aria-busy", "true"); // loading

  try {
    // TODO: Treure aquest delay - només per provar el loading
    await new Promise((resolve) => setTimeout(resolve, 200));

    const alumnis = await getAlumnis((error) =>
      renderError(error, "alumni-error"),
    );
    allAlumnis = alumnis;
    loadingEl?.setAttribute("hidden", "");
    section?.setAttribute("aria-busy", "false"); // success
    renderAlumni(alumnis);
  } catch (error) {
    loadingEl?.setAttribute("hidden", "");
    section?.setAttribute("aria-busy", "false"); // error
    console.error("Error carregant alumnes:", error);
    renderError(error);
  }
};

const getAllActivityAndRender = async () => {
  const loadingEl = document.getElementById("activity-loading");
  const section = document.querySelector(
    '[aria-labelledby="recent-activity-heading"]',
  );

  loadingEl?.removeAttribute("hidden");
  section?.setAttribute("aria-busy", "true"); // loading

  try {
    // TODO: Treure aquest delay - només per provar el loading
    await new Promise((resolve) => setTimeout(resolve, 200));

    const activities = await getActivity((error) =>
      renderError(error, "activity-error"),
    );
    loadingEl?.setAttribute("hidden", "");
    section?.setAttribute("aria-busy", "false"); // success
    renderActivity(activities);
  } catch (error) {
    loadingEl?.setAttribute("hidden", "");
    section?.setAttribute("aria-busy", "false"); // error
    console.error("Error carregant activitats:", error);
    renderError(error, "activity-error");
  }
};

const getAllSuggestionsAndRender = async () => {
  const loadingEl = document.getElementById("suggestions-loading");
  const section = document.querySelector(
    '[aria-labelledby="suggestions-heading"]',
  );

  loadingEl?.removeAttribute("hidden");
  section?.setAttribute("aria-busy", "true"); // loading

  try {
    // TODO: Treure aquest delay - només per provar el loading
    await new Promise((resolve) => setTimeout(resolve, 200));

    const suggestions = await getAlumnis((error) =>
      renderError(error, "suggestions-error"),
    );
    loadingEl?.setAttribute("hidden", "");
    section?.setAttribute("aria-busy", "false"); // success
    renderSuggestions(suggestions);
  } catch (error) {
    loadingEl?.setAttribute("hidden", "");
    section?.setAttribute("aria-busy", "false"); // error
    console.error("Error carregant suggerències:", error);
    renderError(error, "suggestions-error");
  }
};

// ───────────── PAGE SETUP (inicia tot el procés) ──────────────────────

export async function setupNetworkingPage(): Promise<void> {
  setupHeader("networking");
  setupFooter("networking");
  await getAllAlumnisAndRender();
  await getAllActivityAndRender();
  await getAllSuggestionsAndRender();
  setupSearch();
}
