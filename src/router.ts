import type { Route } from "./types/router.types";
import { setupHeader } from "./services/header";

const ROUTES: Route[] = [
  {
    path: "/splash-page",
    file: "/src/pages/splash-page.html",
    css: ["/src/styles/splash-page.css"],
    script: "splash-page",
  },
  {
    path: "/login",
    file: "/src/pages/login.html",
    css: ["/src/styles/login.css"],
    script: "login",
  },
  {
    path: "/home",
    file: "/src/pages/home.html",
    css: ["/src/styles/home.css"],
    script: "home",
  },
  {
    path: "/networking",
    file: "/src/pages/networking.html",
    css: ["/src/styles/networking.css"],
    script: "networking",
  },
  {
    path: "/job-opportunities",
    file: "/src/pages/job-opportunities.html",
    css: ["/src/styles/job-opportunities.css"],
    script: "job-opportunities",
  },
];

// Get the current URL path
function getCurrentPath(): string {
  let path = window.location.pathname;

  if (!path) {
    path = "/";
  }

  // Remove trailing slash (/) (except for root)
  if (path !== "/" && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  return path;
}

// Find a route in the routes list
function findRoute(path: string): Route | undefined {
  return ROUTES.find((route) => route.path === path);
}

// Clean up previous page-specific CSS
function cleanupPreviousStyles(): void {
  const pageStyles = document.querySelectorAll("link[data-page-style]");
  pageStyles.forEach((link) => link.remove());
}

// Load page-specific CSS
function loadPageStyles(cssFiles?: string[]): void {
  if (!cssFiles || cssFiles.length === 0) return;

  cssFiles.forEach((cssFile) => {
    // Do not load if it already exists
    const exists = document.querySelector(`link[href="${cssFile}"]`);
    if (exists) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssFile;
    link.setAttribute("data-page-style", "true"); // Mark for cleanup
    document.head.appendChild(link);
  });
}

// Load HTML file and display it in the app
async function loadPage(filePath: string, route: Route): Promise<void> {
  const appContainer = document.getElementById("app");

  // Check if the container exists
  if (!appContainer) {
    console.error("Error: Element #app not found");
    return;
  }

  try {
    // Clean up previous page-specific styles
    cleanupPreviousStyles();

    // Load new styles
    loadPageStyles(route.css);

    const response = await fetch(filePath);

    if (!response.ok) {
      appContainer.innerHTML = `
        <main>
          <h2>Error 404</h2>
          <p>Could not load page: ${filePath}</p>
        </main>
      `;
      return;
    }

    const html = await response.text();

    // If the file contains <body> tags, extract only the content inside
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const content = bodyMatch ? bodyMatch[1] : html;

    appContainer.innerHTML = content;

    // Execute the page setup if it exists
    if (route.script && window.pageSetups && window.pageSetups[route.script]) {
      window.pageSetups[route.script]();
      console.log(`Setup of ${route.script} executed`);

      // Update header based on current page
      setupHeader(route.script || "");
    }
  } catch (error) {
    console.error("Error loading the page:", error);
    appContainer.innerHTML = `
      <main>
        <h2>Error loading</h2>
        <p>There was a problem loading the page.</p>
      </main>
    `;
  }
}

/**
 * Navigate to a specific route
 * @param path - The target path to navigate to
 * @param replace - If true, replaces the current history entry (useful for first load)
 */
export async function navigate(
  path: string,
  replace: boolean = false,
): Promise<void> {
  const route = findRoute(path);

  if (!route) {
    console.warn(`Route not found: ${path}`);
    const appContainer = document.getElementById("app");
    if (appContainer) {
      appContainer.innerHTML = `
        <main>
          <h2>404 - Page not found</h2>
          <p>The route ${path} does not exist in the application.</p>
          <a href="/home">Go back to home</a>
        </main>
      `;
    }
    return;
  }

  // Handle redirects
  if (route.redirect) {
    navigate(route.redirect, replace);
    return;
  }

  // If no file, don't load anything
  if (!route.file) {
    return;
  }

  // Update the URL without reloading the page
  if (replace) {
    window.history.replaceState({}, "", path);
  } else {
    window.history.pushState({}, "", path);
  }

  // Load the HTML file for the route
  await loadPage(route.file, route);
}

//Initialize the router
export function initRouter(): void {
  // Event 1: Browser navigation (back/forward)
  window.addEventListener("popstate", () => {
    const path = getCurrentPath();
    navigate(path, true);
  });

  // Event 2: Clicks on links inside the page
  document.addEventListener("click", (event) => {
    // Check if an element was clicked
    const target = event.target as HTMLElement;
    if (!target) return;

    // Find the closest link
    const link = target.closest("a") as HTMLAnchorElement | null;
    if (!link) return;

    // Get the href of the link
    const href = link.getAttribute("href");
    if (!href) return;

    // Don't intercept if:
    const isExternal = href.startsWith("http");
    const isHash = href.startsWith("#");
    const hasTarget = link.hasAttribute("target");
    const isDownload = link.hasAttribute("download");

    if (isExternal || isHash || hasTarget || isDownload) {
      return; // Let it behave normally
    }

    // Prevent default behavior
    event.preventDefault();

    // Navigate as SPA
    navigate(href);
  });

  // Event 3: Load the initial page
  const initialPath = getCurrentPath();
  navigate(initialPath, true);
}
