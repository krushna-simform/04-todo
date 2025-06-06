import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

import { AddTodo } from "@/components/AddTodo";
import { ImgShowcase } from "@/components/ui/ImgShowcase";
import { Todos } from "@/components/Todos";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const Today = () => {
  const today = new Date().toISOString().split("T")[0];

  const todo = useSelector((state: RootState) => state.todo.todos);
  const todos = todo.filter((todo) => todo.date === today);

  return (
    <div className="w-full h-full">
      <div className="flex justify-end m-4">
        <ThemeToggle />
      </div>

      <div className="w-[90%] md:w-[50%] mx-auto pt-18 flex flex-col h-full">
        <div>
          <p className="text-2xl font-bold" role="heading">
            Today
          </p>

          <div className="mt-6">
            <AddTodo />
          </div>
        </div>

        {todos.length !== 0 && (
          <div
            className="mt-4 h-full flex-1 overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {todos.map((todos) => (
              <Todos key={todos.id} todo={todos} />
            ))}
          </div>
        )}

        {!todos.length && <ImgShowcase />}
      </div>
    </div>
  );
};

export default Today;
