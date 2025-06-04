import { createContext, useState, type ReactNode } from "react";

interface TodoContextType {
  isAddTodoOpen: boolean;
  editingTodoId: string | null;
  detailTodoId: string | null;
  handleAddTodoClick: () => void;
  setEditingTodoId: (id: string | null) => void;
  setDetailTodoId: (id: string | null) => void;
}

interface TodoContextProp {
  children: ReactNode;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: TodoContextProp) => {
  const [isAddTodoOpen, setIsTodoOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [detailTodoId, setDetailTodoId] = useState<string | null>(null);

  const handleAddTodoClick = () => setIsTodoOpen((prev) => !prev);

  return (
    <TodoContext.Provider
      value={{
        isAddTodoOpen,
        editingTodoId,
        detailTodoId,
        handleAddTodoClick,
        setEditingTodoId,
        setDetailTodoId,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { type TodoContextType, TodoContext, TodoProvider };
