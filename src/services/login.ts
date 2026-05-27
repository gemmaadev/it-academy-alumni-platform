import { setupHeader } from "./header";

export function setupLoginPage() {
  setupHeader("login");
  
  const form = document.querySelector(".login-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Login form submitted");
    });
  }
}
