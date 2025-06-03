import type { Priority } from "@/types/type";

import checkHighIcon from "/icons/check-high.svg";
import checkMediumIcon from "/icons/check-medium.svg";
import checkLowIcon from "/icons/check-low.svg";
import todayTodoIcon from "/icons/today-todo.svg";
import tomorrowTodoIcon from "/icons/tomorrow-todo.svg";
import upcomingTodoIcon from "/icons/upcoming-todo.svg";

const getDateLabelAndIcon = (date: string | undefined) => {
  if (!date) return null;

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  if (date === today) {
    return { icon: todayTodoIcon, label: "Today", color: "#058527" };
  }

  if (date === tomorrow) {
    return { icon: tomorrowTodoIcon, label: "Tomorrow", color: "#AD6200" };
  }

  return { icon: upcomingTodoIcon, label: "Upcoming", color: "#692EC2" };
};

const getPriorityStyles = (priority: Priority) => {
  if (priority === "high") {
    return {
      borderColor: "#E23B37",
      bgColor: "#F8DAD8",
      checkIcon: checkHighIcon,
    };
  }

  if (priority === "low") {
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

export { getDateLabelAndIcon, getPriorityStyles };
