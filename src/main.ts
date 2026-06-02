import { initRouter } from "./router";
import { setupLoginPage } from "./logic/login";
import { setupHomePage } from "./logic/home";
import { setupNetworkingPage } from "./logic/networking";
import { setupJobOpportunitiesPage } from "./logic/job-opportunities";
import { setupSplashPage } from "./logic/splash-page";

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
  // Always load all components
  const headerContainer = document.getElementById("header");
  if (headerContainer) {
    const response = await fetch("/src/components/header.html");
    const html = await response.text();
    headerContainer.innerHTML = html;
  }
  const bottomNavContainer = document.getElementById("bottom-nav");
  if (bottomNavContainer) {
    const response = await fetch("/src/components/bottom-nav.html");
    const html = await response.text();
    bottomNavContainer.innerHTML = html;
  }

  const footerContainer = document.getElementById("footer-pc");
  if (footerContainer) {
    const response = await fetch("/src/components/footer.html");
    const html = await response.text();
    footerContainer.innerHTML = html;
  }

  const isMobile = window.innerWidth < 768;

  if (window.location.pathname === "/") {
    window.location.replace(isMobile ? "/splash-page" : "/home");
    return;
  }

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
