export type Task = {
  id: string;
  title: string;
  description: string;
  status: "open" | "done";
  createdAt: number;
  updatedAt: number;
  syncStatus: "synced" | "pending" | "error";
};
