import { initRouter } from "./router";
import { setupLoginPage } from "./services/login";
import { setupHomePage } from "./services/home";
import { setupNetworkingPage } from "./services/networking";
import { setupJobOpportunitiesPage } from "./services/job-opportunities";
import { setupEventsPage } from "./services/events";

// Register the setups for each page
// The router will automatically call them when you navigate
window.pageSetups = {
  login: setupLoginPage,
  home: setupHomePage,
  networking: setupNetworkingPage,
  "job-opportunities": setupJobOpportunitiesPage,
  events: setupEventsPage,
};

window.addEventListener("DOMContentLoaded", () => {
  console.log("App started - Router ready");
  initRouter();
});

// For development: allows the router to reload in real time
if (import.meta.hot) {
  import.meta.hot.accept();
}
