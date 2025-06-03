interface SidebarLinks {
  id: number;
  label: string;
  to: string;
  src: string;
}

type Priority = "low" | "medium" | "high";
interface Todo {
  id: string;
  text: string;
  description?: string;
  date?: string;
  completed: boolean;
  priority: Priority;
}

export type { SidebarLinks, Todo, Priority };
