import { setupHeader } from "./header";
import { setupFooter } from "./footer";
import { navigate } from "../router";

export function setupLoginPage() {
  setupHeader("login");
  setupFooter("login");

  const form = document.querySelector(".login-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const isMobile = window.innerWidth < 768;
      navigate(isMobile ? "/home" : "/networking");
    });
  }

  const logInLink = document.querySelector(".footer-link");
  logInLink?.addEventListener("click", (e) => {
    e.preventDefault();
    const isMobile = window.innerWidth < 768;
    navigate(isMobile ? "/home" : "/networking");
  });
}