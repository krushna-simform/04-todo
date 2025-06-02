import { useContext } from "react";
import { type TodoContextType, TodoContext } from "@/context/TodoContext";

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
