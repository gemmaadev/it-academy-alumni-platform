import { initRouter } from "./router";
import { setupLoginPage } from "./services/login";
import { setupHomePage } from "./services/home";
import { setupNetworkingPage } from "./services/networking";
import { setupJobOpportunitiesPage } from "./services/job-opportunities";
import { setupSplashPage } from "./services/splash-page";

// Register the setups for each page
// The router will automatically call them when you navigate
window.pageSetups = {
  login: setupLoginPage,
  home: setupHomePage,
  networking: setupNetworkingPage,
  "job-opportunities": setupJobOpportunitiesPage,
  "splash-page": setupSplashPage,
};

window.addEventListener("DOMContentLoaded", async () => {
  console.log("App started - Router ready");

  const currentPath = window.location.pathname;

  // Load header (not on login or splash-page)
  if (currentPath !== "/login" && currentPath !== "/splash-page") {
    const headerContainer = document.getElementById("header");
    if (headerContainer) {
      const response = await fetch("/src/components/header.html");
      const html = await response.text();
      headerContainer.innerHTML = html;
    }
  }

  // Load bottom nav mobile and footer (not on login or splash-page)
  if (currentPath !== "/login" && currentPath !== "/splash-page") {
    const bottomNavContainer = document.getElementById("bottom-nav");
    if (bottomNavContainer) {
      const response = await fetch("/src/components/bottom-nav.html");
      const html = await response.text();
      bottomNavContainer.innerHTML = html;
    }

    // Load footer pc
    const footerContainer = document.getElementById("footer-pc");
    if (footerContainer) {
      const response = await fetch("/src/components/footer.html");
      const html = await response.text();
      footerContainer.innerHTML = html;
    }
  }

  const isMobile = window.innerWidth < 768;

  // Redirect based on device type
  if (window.location.pathname === "/") {
    window.location.replace(isMobile ? "/splash-page" : "/home");
    return;
  }

  // Redirect desktop users away from splash page
  if (!isMobile && window.location.pathname === "/splash-page") {
    window.location.replace("/home");
    return;
  }

  initRouter();
});

// For development: allows the router to reload in real time
if (import.meta.hot) {
  import.meta.hot.accept();
}
