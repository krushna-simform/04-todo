import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

import { AddTodo } from "@/components/AddTodo";
import { ImgShowcase } from "@/components/ui/ImgShowcase";
import { Todos } from "@/components/Todos";

const Inbox = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  return (
    <div className="w-full h-full">
      <div className="w-[90%] md:w-[50%] mx-auto pt-18 flex flex-col h-full">
        <div>
          <p className="text-2xl font-bold" role="heading">
            Inbox
          </p>

          <div className="mt-6">
            <AddTodo />
          </div>
        </div>

        <div
          className="mt-4 h-full flex-1 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {todos.map((todos) => (
            <Todos key={todos.id} todo={todos} />
          ))}
        </div>

        {!todos.length && <ImgShowcase />}
      </div>
    </div>
  );
};

export default Inbox;
