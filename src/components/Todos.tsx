import { useDispatch } from "react-redux";
import { cn } from "clsx-for-tailwind";

import { removeTodo, toggleComplete } from "@/redux/todoSlice";
import type { Todo } from "@/types/type";
import { getDateLabelAndIcon, getPriorityStyles } from "@/utils/todoUtils";
import { useTodoContext } from "@/hooks/useTodoContext";
import { EditTodo } from "@/components/EditTodo";
import { TodoDetails } from "@/components/TodoDetails";
import { useTheme } from "@/hooks/useTheme";

import editIcon from "/icons/edit.svg";
import deleteIcon from "/icons/delete.svg";

const CHAR_LENGTH = 100;

export const Todos = ({ todo }: { todo: Todo }) => {
  const dispatch = useDispatch();
  const { editingTodoId, setEditingTodoId, selectedTodoId, setSelectedTodoId } =
    useTodoContext();
  const { theme } = useTheme();

  const dateInfo = getDateLabelAndIcon(todo.date);
  const checkboxColor = getPriorityStyles(todo.priority);

  const isEditing = editingTodoId === todo.id;
  const isDetailsId = selectedTodoId === todo.id;

  return (
    <div className="border-b-1 border-b-secondaryColor dark:border-b-secondaryColor/20 py-2 cursor-pointer">
      {isEditing ? (
        <EditTodo todo={todo} />
      ) : (
        <div className="flex justify-between items-end">
          <div className="flex items-start gap-3.5 flex-1">
            <button
              className="border min-h-5 min-w-5 rounded-full mt-1 flex items-center justify-center cursor-pointer group dark:bg-none"
              style={{
                border: `2px solid ${checkboxColor.borderColor}`,
                background: theme === "light" ? checkboxColor.bgColor : "",
              }}
              onClick={() => dispatch(toggleComplete(todo.id))}
            >
              <img
                src={checkboxColor.checkIcon}
                alt="Check mark"
                className={cn(
                  "h-3 mt-0.5 transition-opacity ease-in-out duration-200",
                  todo.completed ? "opacity-100" : "opacity-0 hover:opacity-100"
                )}
              />
            </button>

            <div
              className="space-y-1 flex-1"
              onClick={() => setSelectedTodoId(todo.id)}
            >
              <p
                className={cn(
                  "text-[14px] mt-[3.5px]",
                  todo.completed && "line-through opacity-65"
                )}
              >
                {todo.text.length > CHAR_LENGTH
                  ? todo.text.slice(0, CHAR_LENGTH) + "..."
                  : todo.text}
              </p>
              {todo.description && (
                <p className="text-[12px] text-gray-500 dark:text-gray-300">
                  {todo.description.length > CHAR_LENGTH
                    ? todo.description.slice(0, CHAR_LENGTH) + "..."
                    : todo.description}
                </p>
              )}

              {dateInfo && (
                <div className="flex gap-1 items-center">
                  <img
                    src={dateInfo.icon}
                    alt={`${dateInfo.label} todo`}
                    className="h-4"
                  />
                  <p className="text-[12px]" style={{ color: dateInfo.color }}>
                    {dateInfo.label}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end gap-1 min-w-12">
            {!todo.completed && (
              <button
                className="cursor-pointer hover:bg-secondaryColor p-0.5 rounded-sm"
                onClick={() => setEditingTodoId(todo.id)}
              >
                <img src={editIcon} alt="Edit" className="h-4" />
              </button>
            )}
            <button
              className="cursor-pointer hover:bg-secondaryColor p-0.5 rounded-sm"
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              <img src={deleteIcon} alt="Edit" className="h-4.5" />
            </button>
          </div>
        </div>
      )}
      {isDetailsId && <TodoDetails todo={todo} />}
    </div>
  );
};
