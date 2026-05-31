import { setupHeader } from "./header";
import { setupFooter } from "./footer";
import { getJobs } from "../apiServices/jobs/getJobs";
import type { Job } from "../types/job";
import { renderError } from "./global";

// ───────────── RENDER FUNCTIONS (defineix com mostrar les dades) ──────────────────────
function renderJobs(jobs: Job[]): void {
  const grid = document.getElementById("jobs-grid");
  if (!grid) return;

  // Amaga l'empty state sempre que es renderitza
  document.getElementById("jobs-empty")?.setAttribute("hidden", "");

  if (jobs.length === 0) {
    document.getElementById("jobs-empty")?.removeAttribute("hidden");
    grid.innerHTML = "";
    return;
  }

  grid.innerHTML = jobs
    ?.map(
      (job) => `
     <li class="jobs-card">
     <div class="jobs-card-info">
       <h3 class="jobs-card-name">${job.title}</h3>
       <p class="job-card-type only-desk">${job.type}</p>
       <p class="jobs-card-role only-mobile">${job.title} at ${job.company}</p>
        <p class="job-card-location only-mobile">${job.location} | Apply by ${job.applyBy}</p>
       <p class="only-desk">Posted ${job.postedDaysAgo} days ago</p>
       <button type="button" class="btn btn-secondary btn-jobs">Apply Now</button>
        </div>
       <img src="/image-jobs.jpg"
         class="jobs-card-photo"/>
     </li>`,
    )
    .join("");
}

// ───────────── DATA FETCHING (obté les dades i crida les render functions) ──────────────────────
const getAllJobsAndRender = async () => {
  const loadingEl = document.getElementById("jobs-loading");
  const section = document.querySelector('[aria-labelledby="jobs-heading"]');

  loadingEl?.removeAttribute("hidden");
  section?.setAttribute("aria-busy", "true"); // loading

  try {
    // TODO: Treure aquest delay - només per provar el loading
    await new Promise((resolve) => setTimeout(resolve, 200));

    const jobs = await getJobs((error) => renderError(error, "jobs-error"));
    renderJobs(jobs);
    loadingEl?.setAttribute("hidden", "");
    section?.setAttribute("aria-busy", "false"); // success
  } catch (error) {
    loadingEl?.setAttribute("hidden", "");
    section?.setAttribute("aria-busy", "false"); // error
    console.error("Error carregant feines:", error);
    renderError(error, "jobs-error");
  }
};

// ───────────── PAGE SETUP (inicia tot el procés) ──────────────────────

export async function setupJobOpportunitiesPage(): Promise<void> {
  setupHeader("job-opportunities");
  setupFooter("job-opportunities");
  await getAllJobsAndRender();
}
