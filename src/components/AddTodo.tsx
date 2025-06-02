import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { useTodoContext } from "@/hooks/useTodoContext";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { AddTaskButton } from "@/components/ui/AddTaskButton";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AddTodo = () => {
  const { isAddTodoOpen, handleAddTodoClick } = useTodoContext();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);

  return (
    <div>
      {!isAddTodoOpen && <AddTaskButton />}

      {isAddTodoOpen && (
        <div className="w-full border border-secondaryColor min-h-35 rounded-lg mt-10 flex flex-col">
          <div className="flex flex-col gap-2 py-2 px-2">
            <Input
              type="text"
              placeholder="Morning DSU"
              className="!text-[16px] placeholder:text-[16px] border-none outline-none shadow-none focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:outline-none"
            />
            <Input
              type="text"
              placeholder="Description"
              className="!text-[14px] placeholder:text-[14px] border-none outline-none shadow-none focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:outline-none"
            />
          </div>

          <div className="mt-auto flex gap-3 justify-between border-t-1 py-2 px-2 border-t-primaryColor">
            <div className="flex gap-1">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[150px] justify-start text-left font-normal"
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      setDate(date || undefined);
                      setOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hight">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-1">
              <Button
                className="bg-gray-500 text-[14px] py-1 px-3 font-semibold rounded-sm cursor-pointer hover:bg-gray-400"
                onClick={handleAddTodoClick}
              >
                Cancel
              </Button>

              <Button className="bg-primaryColor text-white text-[14px] py-1 px-3 font-semibold rounded-sm cursor-pointer hover:bg-[#a81f00bd]">
                Add task
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
