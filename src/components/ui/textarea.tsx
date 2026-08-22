import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full rounded-lg border border-border bg-surface px-3 py-2 text-base text-fg placeholder:text-subtle",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
