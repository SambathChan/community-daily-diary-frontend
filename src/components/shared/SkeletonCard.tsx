import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SkeletonCard() {
  return (
    <Card className="p-2 sm:w-[600px] lg:w-[750px]">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="mt-2 h-4 w-32" />
        </CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="flex-1">
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="basis-10">
          <Skeleton className="h-24 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}