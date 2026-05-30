export enum ActivityType {
  FOLLOW = "follow",
  CONNECTION = "connection",
  SHARE = "share",
}

export interface Activity {
  id: number;
  type: ActivityType;
  actor: string;
  target?: string;
  content?: string;
  timestamp: string;
}
