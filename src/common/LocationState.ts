export type LocationState = {
  authRequired?: boolean;
  toast?: {
    status: "success" | "error" | "warning" | "info";
    description: string;
  }
} | null;