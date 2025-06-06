import { cn } from "clsx-for-tailwind";
import { Link, useLocation } from "react-router";
import type { SidebarLinks } from "@/types/type";

import addTaskIcon from "/icons/add-task-1.svg";
import inboxIcon from "/icons/inbox.svg";
import todayIcon from "/icons/today.svg";
import upcomingIcon from "/icons/upcoming.svg";
import { useTodoContext } from "@/hooks/useTodoContext";

const sidebarLinks: Array<SidebarLinks> = [
  {
    id: 1,
    label: "Inbox",
    to: "/",
    src: inboxIcon,
  },
  {
    id: 2,
    label: "Today",
    to: "/today",
    src: todayIcon,
  },
  {
    id: 3,
    label: "Upcoming",
    to: "/upcoming",
    src: upcomingIcon,
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { handleAddTodoClick } = useTodoContext();

  return (
    <div className="h-[100vh] min-w-[300px] pl-6 py-4 bg-sidebarBackground dark:bg-[#272627]">
      <button
        className="flex items-center gap-2 py-2 px-3 rounded-l-lg cursor-pointer hover:bg-secondaryColor dark:hover:bg-primaryColor/25 transition-colors ease-in-out w-full"
        onClick={handleAddTodoClick}
      >
        <img src={addTaskIcon} alt="Add task" className="h-7" />
        <span className="text-primaryColor dark:text-white text-lg font-semibold">
          Add task
        </span>
      </button>
      <nav className="mt-3 flex flex-col gap-2">
        <ul className="space-y-2">
          {sidebarLinks.map((item) => (
            <li key={item.id}>
              <Link
                to={item.to}
                className={cn(
                  "flex gap-2 px-3 py-2 cursor-pointer rounded-l-lg hover:bg-secondaryColor hover:text-primaryColor dark:hover:bg-primaryColor/25 dark:hover:text-white",
                  currentPath === `${item.to}` &&
                    "bg-secondaryColor text-primaryColor dark:bg-primaryColor/25 dark:text-white"
                )}
              >
                <img src={item.src} alt="Inbox" className="h-7" />
                <p className="text-lg">{item.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
