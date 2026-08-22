import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-md border border-border bg-surface px-3 text-base text-fg placeholder:text-subtle",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
