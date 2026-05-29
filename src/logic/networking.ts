import { setupHeader } from "./header";
import { setupFooter } from "./footer";
import { getAlumnis } from "../apiServices/networking/getAlumnis";
import type { Alumni } from "../types/alumni";

// ───────────── RENDER FUNCTIONS (defineix com mostrar les dades) ──────────────────────

function renderAlumni(alumnis: Alumni[]): void {
  const grid = document.getElementById("alumni-grid");
  if (!grid) return;

  if (alumnis.length === 0) {
    document.getElementById("alumni-empty")?.removeAttribute("hidden");
    return;
  }

  grid.innerHTML = alumnis
    ?.map(
      (alumni) => `
    <li class="alumni-card">
      <h3>${alumni.firstName} ${alumni.lastName}</h3>
      <p class="only-mobile"> Class of ${alumni.classOf}</p>
      <p>${alumni.position} at ${alumni.company}</p>
      <p class="only-desk">${alumni.location}</p>
      <img src="${alumni.avatar}" class="only-mobile" alt="${alumni.firstName} ${alumni.lastName}" />
      <button type="button" class="btn btn-primary only-desk">Message</button>
    </li>`,
    )
    .join("");
}

export function renderError(error: Error | unknown): void {
  const errorElement = document.getElementById("alumni-error");
  if (!errorElement) return;

  errorElement.textContent = (error as Error).message;
  errorElement.removeAttribute("hidden");
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

    const alumnis = await getAlumnis(renderError);
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

// ───────────── PAGE SETUP (inicia tot el procés) ──────────────────────

export async function setupNetworkingPage(): Promise<void> {
  setupHeader("networking");
  setupFooter("networking");
  await getAllAlumnisAndRender();
}
