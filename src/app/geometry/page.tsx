import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Geometry",
  description: "This is Geometry Page",
  // other metadata
};

const GeometryPage = () => {
  return (
    <div className="flex items-center justify-center grow w-full text-black dark:text-white">
      We are comming soon... ✌
    </div>
  );
};

export default GeometryPage;
