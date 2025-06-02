import { useDispatch } from "react-redux";
import { removeTodo, toggleComplete } from "@/redux/todoSlice";

import type { Todo } from "@/types/type";
import { cn } from "clsx-for-tailwind";

import checkHighIcon from "/icons/check-high.svg";
import checkMediumIcon from "/icons/check-medium.svg";
import checkLowIcon from "/icons/check-low.svg";
import todayTodoIcon from "/icons/today-todo.svg";
import tomorrowTodoIcon from "/icons/tomorrow-todo.svg";
import upcomingTodoIcon from "/icons/upcoming-todo.svg";
import editIcon from "/icons/edit.svg";
import deleteIcon from "/icons/delete.svg";

const CHAR_LENGTH = 100;

export const Todos = ({ todo }: { todo: Todo }) => {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const dispatch = useDispatch();

  const getDateLabelAndIcon = () => {
    if (!todo.date) return null;

    if (todo.date === today) {
      return { icon: todayTodoIcon, label: "Today", color: "#058527" };
    }

    if (todo.date === tomorrow) {
      return { icon: tomorrowTodoIcon, label: "Tomorrow", color: "#AD6200" };
    }

    return { icon: upcomingTodoIcon, label: "Upcoming", color: "#692EC2" };
  };

  const getPriorityColor = () => {
    if (todo.priority === "high") {
      return {
        borderColor: "#E23B37",
        bgColor: "#F8DAD8",
        checkIcon: checkHighIcon,
      };
    }
    if (todo.priority === "low") {
      return {
        borderColor: "#2089E5",
        bgColor: "#E0EDF7",
        checkIcon: checkLowIcon,
      };
    }
    return {
      borderColor: "#FE6E01",
      bgColor: "#FBEDE3",
      checkIcon: checkMediumIcon,
    };
  };

  const dateInfo = getDateLabelAndIcon();
  const checkboxColor = getPriorityColor();

  return (
    <div className="border-b-1 border-b-secondaryColor py-2 cursor-pointer">
      <div className="flex justify-between items-end">
        <div className="flex items-start gap-3.5">
          <button
            className="border min-h-5 min-w-5 rounded-full mt-1 flex items-center justify-center cursor-pointer group"
            style={{
              border: `2px solid ${checkboxColor.borderColor}`,
              background: checkboxColor.bgColor,
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

          <div className="space-y-1">
            <p
              className={cn(
                "text-[14px]",
                todo.completed && "line-through opacity-65"
              )}
            >
              {todo.text.length > CHAR_LENGTH
                ? todo.text.slice(0, CHAR_LENGTH) + "..."
                : todo.text}
            </p>
            {todo.description && (
              <p className="text-[12px] text-gray-500">
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
            <button className="cursor-pointer hover:bg-secondaryColor p-0.5 rounded-sm">
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
    </div>
  );
};
