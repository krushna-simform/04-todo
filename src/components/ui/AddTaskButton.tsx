import { Button } from "@/components/ui/button";
import addTaskIcon from "/icons/add-task-2.svg";
import { useTodoContext } from "@/hooks/useTodoContext";

export const AddTaskButton = () => {
  const { handleAddTodoClick } = useTodoContext();

  return (
    <Button
      variant="default"
      className="w-full text-black bg-sidebarBackground cursor-pointer text-[15px] hover:bg-secondaryColor"
      onClick={handleAddTodoClick}
    >
      <img src={addTaskIcon} alt="Add task" />
      <span>Add Task</span>
    </Button>
  );
};
