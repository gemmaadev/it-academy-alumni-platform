export function setupFooter(page: string): void {
  // Hide footer on login and splash-page
  const footer = document.getElementById("footer-pc");
  const bottomNav = document.getElementById("bottom-nav");

  if (page === "login" || page === "splash-page") {
    if (footer) footer.classList.add("hidden");
    if (bottomNav) bottomNav.classList.add("hidden");
  } else {
    if (footer) footer.classList.remove("hidden");
    if (bottomNav) bottomNav.classList.remove("hidden");
  }
}
