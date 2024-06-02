import type { getEndpoints } from "@/app/forms/prefetched-conditional-data-form/actions";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ServerIcon } from "lucide-react";
import { TypographyMuted } from "../ui/typography";

export function EndpointPicker({
  endpoints,
  onSelect,
}: {
  endpoints: Awaited<ReturnType<typeof getEndpoints>>;
  onSelect: (endpoint: Awaited<ReturnType<typeof getEndpoints>>[number]) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger className="px-4 py-2 border rounded-md text-sm ">
        Select endpoint
      </PopoverTrigger>
      <PopoverContent className="p-2">
        {endpoints.map((endpoint) => (
          <button
            key={endpoint.id}
            type="button"
            className="w-full flex items-center space-x-2 hover:bg-muted px-2 py-1 rounded-md"
            onClick={() => onSelect(endpoint)}
          >
            <span>
              <ServerIcon className="h-4 w-4 text-muted-foreground" />
            </span>
            <TypographyMuted>{endpoint.name}</TypographyMuted>
          </button>
        ))}
        {endpoints.length === 0 && (
          <div className="w-full flex items-center space-x-2 cursor-not-allowed px-2 py-1.5 rounded-md">
            <TypographyMuted>No endpoints remaining</TypographyMuted>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
