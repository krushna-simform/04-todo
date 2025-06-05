import { createContext, useState, type ReactNode } from "react";

interface TodoContextType {
  isAddTodoOpen: boolean;
  editingTodoId: string | null;
  selectedTodoId: string | null;
  handleAddTodoClick: () => void;
  setEditingTodoId: (id: string | null) => void;
  setSelectedTodoId: (id: string | null) => void;
}

interface TodoContextProp {
  children: ReactNode;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: TodoContextProp) => {
  const [isAddTodoOpen, setIsTodoOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

  const handleAddTodoClick = () => setIsTodoOpen((prev) => !prev);

  return (
    <TodoContext.Provider
      value={{
        isAddTodoOpen,
        editingTodoId,
        selectedTodoId,
        handleAddTodoClick,
        setEditingTodoId,
        setSelectedTodoId,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { type TodoContextType, TodoContext, TodoProvider };
