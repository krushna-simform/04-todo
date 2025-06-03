import type { Priority } from "@/types/type";

import checkHighIcon from "/icons/check-high.svg";
import checkMediumIcon from "/icons/check-medium.svg";
import checkLowIcon from "/icons/check-low.svg";
import todayTodoIcon from "/icons/today-todo.svg";
import tomorrowTodoIcon from "/icons/tomorrow-todo.svg";
import upcomingTodoIcon from "/icons/upcoming-todo.svg";

/**
 * Returns (icon, label, and color) based on the provided date.
 *
 * @param {string | undefined} date - A date string in `yyyy-MM-dd` format or undefined.
 * @returns {{ icon: string; label: string; color: string } | null}
 *  - An object containing the icon path, label, and label color for the date category.
 *  - Returns `null` if the input date is undefined.
 */
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

/**
 * Returns styling and check icon based on the priority level.
 *
 * @param {Priority} priority - The priority level (`low`, `medium`, or `high`).
 * @returns {{
 *   borderColor: string;
 *   bgColor: string;
 *   checkIcon: string;
 * }}
 *  - An object containing styles for checkbox border, background color, and associated checkmark icon.
 */
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
