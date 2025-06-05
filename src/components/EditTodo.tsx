import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";

import { editTodo } from "@/redux/todoSlice";
import { useTodoContext } from "@/hooks/useTodoContext";
import type { Todo, Priority } from "@/types/type";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useKeyPress } from "@/hooks/useKeyPress";

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

const UpdateTodoSchema = Yup.object({
  text: Yup.string().required(),
  description: Yup.string().nullable(),
  date: Yup.date().nullable(),
  priority: Yup.mixed<Priority>().oneOf(["low", "medium", "high"]),
});

export const EditTodo = ({ todo }: { todo: Todo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { editingTodoId, setEditingTodoId } = useTodoContext();

  const today = new Date().toISOString().split("T")[0];

  const isEscPressed = useKeyPress("Escape");
  const isEnterPressed = useKeyPress("Enter");

  const formik = useFormik<Omit<Todo, "id" | "completed">>({
    initialValues: {
      text: todo.text,
      description: todo.description ? todo.description : "",
      date: todo.date ? todo.date : undefined,
      priority: todo.priority,
    },
    validationSchema: UpdateTodoSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      const formatDate = values.date
        ? format(new Date(values.date), "yyyy-MM-dd")
        : undefined;
      const newTodo: Todo = {
        id: todo.id,
        completed: false,
        ...values,
        text: values.text.trim(),
        date: formatDate,
        description:
          values.description?.trim() === ""
            ? undefined
            : values.description?.trim(),
      };

      dispatch(editTodo(newTodo));
      formik.resetForm();
      setEditingTodoId(null);

      if (formatDate === today) {
        navigate("/today");
      } else if (formatDate) {
        navigate("/upcoming");
      } else {
        navigate("/");
      }
    },
  });

  useEffect(() => {
    if (isEscPressed && editingTodoId !== null) {
      setEditingTodoId(null);
    }

    if (isEnterPressed && editingTodoId !== null) {
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "TEXTAREA" ||
          activeElement.getAttribute("name") === "description")
      ) {
        return;
      }

      if (formik.values.text.trim() && !formik.isSubmitting) {
        formik.handleSubmit();
      }
    }
  }, [isEscPressed, isEnterPressed, formik, editingTodoId, setEditingTodoId]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full border border-secondaryColor min-h-35 rounded-lg flex flex-col"
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
                className="w-[200px] justify-center text-left font-normal"
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
                  formik.values.date ? new Date(formik.values.date) : undefined
                }
                onSelect={(date) => {
                  formik.setFieldValue("date", date || undefined);
                  setOpen(false);
                }}
                initialFocus
                fromDate={new Date()}
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
              <SelectItem value="high">
                <div className="h-3 w-3 bg-[#F8DAD8] border-1 border-[#E23B37] rounded-full"></div>
                High
              </SelectItem>
              <SelectItem value="medium">
                <div className="h-3 w-3 bg-[#FBEDE3] border-1 border-[#FE6E01] rounded-full"></div>
                Medium
              </SelectItem>
              <SelectItem value="low">
                <div className="h-3 w-3 bg-[#E0EDF7] border-1 border-[#2089E5] rounded-full"></div>
                Low
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-1 justify-end py-2 px-2">
        <Button
          type="button"
          onClick={() => {
            formik.resetForm();
            setEditingTodoId(null);
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
          Save
        </Button>
      </div>
    </form>
  );
};
