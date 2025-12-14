import { Skeleton } from "@heroui/react";

export default function TicketsLoading() {
  return (
    <div className="grid min-h-fit grid-cols-1 gap-4 text-white">
      {[0, 1, 2, 3].map((index) => {
        return <Skeleton key={index} className="w-full h-36 rounded-3xl" />;
      })}
    </div>
  );
}
