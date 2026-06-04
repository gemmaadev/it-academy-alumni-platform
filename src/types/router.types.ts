export interface Route {
  path: string;
  file?: string;
  css?: string[];
  script?: string;
  redirect?: string;
}

export interface PageSetups {
  [key: string]: () => void;
}

declare global {
  interface Window {
    pageSetups?: PageSetups;
  }
}

export {};
