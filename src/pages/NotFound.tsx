import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export const PageNotFound = () => {
  return (
    <div className="m-auto h-full flex flex-col items-center pt-90">
      <p className="text-9xl">404</p>
      <p className="text-2xl">Page not found</p>
      <Link to="/" className="mt-6">
        <Button className="bg-primaryColor cursor-pointer hover:bg-primaryColor/80 text-lg py-5 px-6">
          Go to Home
        </Button>
      </Link>
    </div>
  );
};
