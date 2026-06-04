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
  // Hide components while loading
  const headerContainer = document.getElementById("header");
  const bottomNavContainer = document.getElementById("bottom-nav");
  const footerContainer = document.getElementById("footer-pc");

  if (headerContainer) headerContainer.style.visibility = "hidden";
  if (bottomNavContainer) bottomNavContainer.style.visibility = "hidden";
  if (footerContainer) footerContainer.style.visibility = "hidden";

  // Load all components in parallel
  const [headerHtml, bottomNavHtml, footerHtml] = await Promise.all([
    fetch("/src/components/header.html").then((r) => r.text()),
    fetch("/src/components/bottom-nav.html").then((r) => r.text()),
    fetch("/src/components/footer.html").then((r) => r.text()),
  ]);

  if (headerContainer) {
    headerContainer.innerHTML = headerHtml;
    headerContainer.style.visibility = "visible";
  }
  if (bottomNavContainer) {
    bottomNavContainer.innerHTML = bottomNavHtml;
    bottomNavContainer.style.visibility = "visible";
  }
  if (footerContainer) {
    footerContainer.innerHTML = footerHtml;
    footerContainer.style.visibility = "visible";
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
