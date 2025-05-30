import { AddTodo } from "@/components/AddTodo";
import { ImgShowcase } from "@/components/ui/ImgShowcase";

const Upcoming = () => {
  return (
    <div className="w-full">
      <div className="w-full md:w-[50%] mx-auto pt-18">
        <p className="text-2xl font-bold" role="heading">
          Upcoming
        </p>

        <div className="mt-6">
          <AddTodo />
        </div>

        <ImgShowcase />
      </div>
    </div>
  );
};

export default Upcoming;
