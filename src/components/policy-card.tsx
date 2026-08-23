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
  const titleId = `policy-card-title-${policy.id}`;
  const descId = `policy-card-desc-${policy.id}`;
  return (
    <Link
      to="/library/$policyId"
      params={{ policyId: policy.id }}
      aria-labelledby={titleId}
      aria-describedby={descId}
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
      <h3 id={titleId} className="mt-2 font-display text-base font-semibold leading-snug text-fg">
        {policy.shortTitle}
      </h3>
      <p id={descId} className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
        <span className="sr-only">
          {policy.regionName}，{levelLabel(policy.level)}。
        </span>
        {policy.summary}
      </p>
      {policy.docNo ? (
        <p className="mt-2 text-xs text-subtle">{policy.docNo}</p>
      ) : null}
    </Link>
  );
}
