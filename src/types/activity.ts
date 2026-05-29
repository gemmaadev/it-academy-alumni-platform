export interface Activity {
  id: number;
  type: "follow" | "connection" | "share";
  actor: string;
  target?: string;
  content?: string;
  timestamp: string;
}
