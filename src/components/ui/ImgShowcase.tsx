import peace from "/images/peace.jpg";

export const ImgShowcase = () => {
  return (
    <div className="m-auto flex flex-col items-center mt-30">
      <img src={peace} alt="peace image" className="h-80 w-80" />
      <p className="font-semibold mt-8">Your peace of mind is priceless</p>
      <p className="mt-2 text-[15px]">
        Well Done! Your all task completed successfully.
      </p>
    </div>
  );
};
