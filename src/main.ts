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

window.addEventListener("DOMContentLoaded", async () => {
  console.log("App started - Router ready");

  // Load bottom nav
  if (window.location.pathname !== "/login") {
    const bottomNavContainer = document.getElementById("bottom-nav");
    if (bottomNavContainer) {
      const response = await fetch("/src/components/bottom-nav.html");
      const html = await response.text();
      bottomNavContainer.innerHTML = html;
    }

    const headerContainer = document.getElementById("header");
    if (headerContainer) {
      const response = await fetch("/src/components/header.html");
      const html = await response.text();
      headerContainer.innerHTML = html;
    }

    const footerContainer = document.getElementById("footer-pc");
    if (footerContainer) {
      const response = await fetch("/src/components/footer.html");
      const html = await response.text();
      footerContainer.innerHTML = html;
    }
  }

  initRouter();
});

// For development: allows the router to reload in real time
if (import.meta.hot) {
  import.meta.hot.accept();
}
