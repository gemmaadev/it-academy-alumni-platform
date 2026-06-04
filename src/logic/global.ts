export function renderError(error: Error | unknown, elementId: string): void {
  const errorElement = document.getElementById(elementId);
  if (!errorElement) return;

  errorElement.textContent = (error as Error).message;
  errorElement.removeAttribute("hidden");
}
