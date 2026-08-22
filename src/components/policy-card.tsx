import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { categoryLabel, levelLabel } from "@/data/catalog";
import type { PolicyListItem } from "@/lib/server/policies";
import { cn } from "@/lib/utils";

export function PolicyCard({
  policy,
  className,
}: {
  policy: PolicyListItem;
  className?: string;
}) {
  return (
    <Link
      to="/library/$policyId"
      params={{ policyId: policy.id }}
      aria-label={`${policy.shortTitle}，${policy.regionName}，${levelLabel(policy.level)}`}
      className={cn(
        "block rounded-xl bg-surface p-4 shadow-card transition-[transform,box-shadow] duration-150",
        "hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="flex flex-wrap gap-1.5">
        <Badge>{levelLabel(policy.level)}</Badge>
        <Badge className="bg-surface-2 text-muted">{policy.regionName}</Badge>
        <Badge className="bg-surface-2 text-muted">{categoryLabel(policy.category)}</Badge>
      </div>
      <h3 className="mt-2 font-display text-base font-semibold leading-snug text-fg">
        {policy.shortTitle}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{policy.summary}</p>
      {policy.docNo ? (
        <p className="mt-2 text-xs text-subtle">{policy.docNo}</p>
      ) : null}
    </Link>
  );
}
