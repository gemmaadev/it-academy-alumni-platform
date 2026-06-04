/*Updates the active state of bottom nav items based on the current page*/
export function setupBottomNav(page: string): void {
  const navItems = document.querySelectorAll(".bottom-nav .item");

  navItems.forEach((item) => {
    const link = item.querySelector("a");
    if (!link) return;

    const href = link.getAttribute("href");
    const isActive = href === `/${page}`;

    item.classList.toggle("active", isActive);
  });
}
