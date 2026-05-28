import { setupHeader } from "./header";
import { setupFooter } from "./footer";

export function setupLoginPage() {
  setupHeader("login");
  setupFooter("login");
  
  const form = document.querySelector(".login-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Login form submitted");
    });
  }
}
