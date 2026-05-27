export function setupFooter(page: string): void {
  // Hide footer on login and splash-page
  const footer = document.getElementById("footer-pc");
  const bottomNav = document.getElementById("bottom-nav");

  if (page === "login" || page === "splash-page") {
    if (footer) footer.style.display = "none";
    if (bottomNav) bottomNav.style.display = "none";
  } else {
    if (footer) footer.style.display = "block";
    if (bottomNav) bottomNav.style.display = "flex";
  }
}
