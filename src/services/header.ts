interface PageHeaderConfig {
  title: string;
  isHomePage: boolean;
}

const PAGE_CONFIGS: { [key: string]: PageHeaderConfig } = {
  home: { title: "Home", isHomePage: true },
  networking: { title: "Networking", isHomePage: false },
  "job-opportunities": { title: "Job Portal", isHomePage: false },
  events: { title: "Eventos", isHomePage: false },
  login: { title: "Login", isHomePage: false },
};

export function setupHeader(page: string): void {
  const config = PAGE_CONFIGS[page];
  if (!config) return;

  // Hide header on login
  const header = document.getElementById("header");
  if (header) {
    header.style.display = page === "login" ? "none" : "block";
  }

  // Show/hide logo text (Alumni Connect) - only on non-home pages
  const logoText = document.querySelector(".logo-text") as HTMLElement;
  if (logoText) {
    logoText.classList.toggle("hidden", config.isHomePage);
  }

  // Show/hide logo size class - bigger on home
  const logo = document.querySelector(".logo-img") as HTMLImageElement;
  if (logo) {
    logo.classList.toggle("logo-home", config.isHomePage);
    // Change logo src based on page
    if (config.isHomePage) {
      logo.src = "/logo-xlumni.svg";
      logo.alt = "XLumni";
    } else {
      logo.src = "/logo-alumni-connect.svg";
      logo.alt = "Alumni Connect";
    }
  }

  // Show/hide desktop actions (buttons on home vs icons on other pages)
  const headerActions = document.querySelector(".header-actions") as HTMLElement;
  const headerIcons = document.querySelector(".header-icons") as HTMLElement;

  if (headerActions && headerIcons) {
    headerActions.classList.toggle("hidden", !config.isHomePage);
    headerIcons.classList.toggle("hidden", config.isHomePage);
  }

  // Show/hide mobile back button
  const backBtn = document.querySelector(".header-back") as HTMLElement;
  if (backBtn) {
    backBtn.style.display = config.isHomePage ? "none" : "flex";
  }

  // Update mobile page title
  const pageTitle = document.getElementById("page-title");
  if (pageTitle) {
    pageTitle.textContent = config.title;
  }

  // Mark active menu link
  document.querySelectorAll(".header-menu-link").forEach((link) => {
    const isActive = link.getAttribute("href") === `/${page}`;
    link.classList.toggle("active", isActive);
  });
}
