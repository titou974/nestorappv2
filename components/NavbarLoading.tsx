import { Skeleton } from "@heroui/react";

export default function NavbarLoading({
  withBottomContent,
  endContent,
}: {
  withBottomContent?: boolean;
  endContent?: React.ReactNode;
}) {
  if (withBottomContent && endContent) {
    return (
      <div className="static bg-gradient-to-b from-background from-60% to-transparent min-h-40 left-0 right-0 top-0 z-50 w-full pb-10 pt-10 flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="rounded-sm h-8 w-30" />
            <Skeleton className="rounded-sm h-10 w-40" />
          </div>
          {endContent}
        </div>
        <Skeleton className="rounded-full h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="static bg-gradient-to-b from-background from-60% to-transparent min-h-40 left-0 right-0 top-0 z-50 w-full pb-4 pt-10 flex-col space-y-2">
      <Skeleton className="rounded-sm h-8 w-30" />
      <Skeleton className="rounded-sm h-10 w-40" />
    </div>
  );
}
