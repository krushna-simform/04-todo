import { useState } from "react";
import { useDispatch } from "react-redux";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

import { useFormik } from "formik";
import * as Yup from "yup";

import { addTodo } from "@/redux/todoSlice";
import { useTodoContext } from "@/hooks/useTodoContext";

import type { Todo, Priority } from "@/types/type";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { AddTaskButton } from "@/components/ui/AddTaskButton";
import { Textarea } from "@/components/ui/textarea";

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

const AddTodoSchema = Yup.object({
  text: Yup.string(),
  description: Yup.string().nullable(),
  date: Yup.date().nullable(),
  priority: Yup.mixed<Priority>().oneOf(["low", "medium", "high"]),
});

export const AddTodo = () => {
  const dispatch = useDispatch();
  const { isAddTodoOpen, handleAddTodoClick } = useTodoContext();
  const [open, setOpen] = useState(false);

  const formik = useFormik<Omit<Todo, "id" | "completed">>({
    initialValues: {
      text: "",
      description: "",
      date: undefined,
      priority: "medium",
    },
    validationSchema: AddTodoSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      const newTodo: Todo = {
        id: uuid(),
        completed: false,
        ...values,
        date: values.date
          ? format(new Date(values.date), "yyyy-MM-dd")
          : undefined,
        description:
          values.description?.trim() === "" ? undefined : values.description,
      };

      dispatch(addTodo(newTodo));
      formik.resetForm();
      handleAddTodoClick();
    },
  });

  return (
    <div>
      {!isAddTodoOpen && <AddTaskButton />}

      {isAddTodoOpen && (
        <form
          onSubmit={formik.handleSubmit}
          className="w-full border border-secondaryColor min-h-35 rounded-lg mt-10 flex flex-col"
        >
          <div className="flex flex-col gap-2 py-2 px-2">
            <Input
              name="text"
              placeholder="Task Title"
              value={formik.values.text}
              onChange={formik.handleChange}
              className="!text-[16px] placeholder:text-[16px] border-none outline-none shadow-none"
            />

            <Textarea
              name="description"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="!text-[14px] placeholder:text-[14px] border-none outline-none shadow-none"
            />
          </div>

          <div className="flex gap-3 justify-between border-t-1 py-2 px-2 border-t-primaryColor">
            <div className="flex gap-1 items-center">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-[150px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formik.values.date
                      ? format(new Date(formik.values.date), "PPP")
                      : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formik.values.date
                        ? new Date(formik.values.date)
                        : undefined
                    }
                    onSelect={(date) => {
                      formik.setFieldValue("date", date || undefined);
                      setOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Select
                value={formik.values.priority}
                onValueChange={(value) =>
                  formik.setFieldValue("priority", value as Priority)
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-1 justify-end py-2 px-2">
            <Button
              type="button"
              onClick={() => {
                formik.resetForm();
                handleAddTodoClick();
              }}
              className="bg-gray-500 text-[14px] py-1 px-3 font-semibold rounded-sm cursor-pointer hover:bg-gray-400"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-primaryColor text-white text-[14px] py-1 px-3 font-semibold rounded-sm cursor-pointer hover:bg-[#a81f00bd]"
              disabled={!formik.values.text.trim() || formik.isSubmitting}
            >
              Add task
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
