import { useDispatch } from "react-redux";
import { cn } from "clsx-for-tailwind";
import { Flag } from "lucide-react";

import type { Todo } from "@/types/type";
import { useTodoContext } from "@/hooks/useTodoContext";
import { getDateLabelAndIcon, getPriorityStyles } from "@/utils/todoUtils";
import { toggleComplete } from "@/redux/todoSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const TodoDetails = ({ todo }: { todo: Todo }) => {
  const dispatch = useDispatch();
  const { setDetailTodoId } = useTodoContext();

  const checkboxColor = getPriorityStyles(todo.priority);
  const dateInfo = getDateLabelAndIcon(todo.date);

  return (
    <Dialog
      open={!!todo}
      onOpenChange={(open) => !open && setDetailTodoId(null)}
    >
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-sm font-medium uppercase tracking-wider">
            {dateInfo?.label || "Inbox"}
          </DialogTitle>
          <DialogDescription className="hidden">
            {todo.text} Details
          </DialogDescription>
        </DialogHeader>

        <div className="w-full overflow-x-hidden space-y-5">
          <div className="flex gap-3 items-center w-full">
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
            <p
              className={cn(
                "text-2xl font-bold break-words whitespace-pre-wrap w-full",
                todo.completed && "line-through opacity-65"
              )}
            >
              {todo.text}
            </p>
          </div>

          {todo.description && (
            <div
              className={cn(
                "w-full bg-gray-100/70 py-2 px-3 rounded-sm overflow-y-auto max-h-40",
                todo.completed && "opacity-65"
              )}
              style={{ scrollbarWidth: "none" }}
            >
              <p className="text-[15px] text-slate-700">{todo.description}</p>
            </div>
          )}

          <div className="flex gap-3">
            <div className="bg-gray-100/80 py-2 px-3 rounded-full">
              <p
                className={cn(
                  "text-slate-700 text-[15px]",
                  todo.completed && "text-green-700"
                )}
              >
                {todo.completed ? "Completed" : "Pending"}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-gray-100/80 py-2 px-3 rounded-full">
              <Flag className="h-4 text-slate-700" />
              <span className="text-[15px] text-slate-700 capitalize">
                {todo.priority} priority
              </span>
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  border: `1px solid ${checkboxColor.borderColor}`,
                  backgroundColor: checkboxColor.bgColor,
                }}
              />
            </div>

            {todo.date && dateInfo && (
              <div
                className="flex gap-2 items-center py-1 px-3 rounded-full"
                style={{ backgroundColor: `${dateInfo.color}20` }}
              >
                <img
                  src={dateInfo.icon}
                  alt={`${dateInfo.label} todo`}
                  className="h-5"
                />
                <p className="text-[15px]" style={{ color: dateInfo.color }}>
                  {dateInfo.label}
                </p>
                <span style={{ color: dateInfo.color }} className="text-[15px]">
                  {new Date(todo.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-3">
            <Button
              variant="outline"
              onClick={() => setDetailTodoId(null)}
              className="px-6 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
