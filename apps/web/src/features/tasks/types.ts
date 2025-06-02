export type Task = {
  id: string;
  text: string;
  completed: boolean;
  createdDate: number;
  completedDate?: number;
};

export type TasksFilterType = "all" | "active" | "completed";
