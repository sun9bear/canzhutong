import { ExternalLink, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ORG_KIND_LABEL, ORG_LEVEL_LABEL, type OrgKind, type OrgRecord } from "@/data/orgs";
import { isOfficialOpenableUrl } from "@/lib/official-url";

export function OrgCard({ org }: { org: OrgRecord }) {
  const website = isOfficialOpenableUrl(org.website) ? org.website : "";
  return (
    <article className="flex h-full flex-col rounded-xl bg-surface p-4 shadow-card">
      <div className="flex flex-wrap gap-1.5">
        <Badge>{ORG_LEVEL_LABEL[org.level]}</Badge>
        <Badge className="bg-surface-2 text-muted">{ORG_KIND_LABEL[org.kind as OrgKind]}</Badge>
        <Badge className="bg-surface-2 text-muted">{org.regionName}</Badge>
      </div>
      <h2 className="mt-2 font-display text-base font-semibold leading-snug">{org.shortName}</h2>
      <p className="mt-1 text-sm text-muted">{org.name}</p>
      {org.address ? (
        <p className="mt-2 flex items-start gap-1.5 text-sm">
          <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          <span>
            {org.address}
            {org.postcode ? `（${org.postcode}）` : ""}
          </span>
        </p>
      ) : (
        <p className="mt-2 text-sm text-subtle">办公地址暂未收录，请拨热线或打开官网。</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {(org.phones.length ? org.phones : [org.hotline].filter(Boolean)).map((p) => (
          <a
            key={p}
            href={`tel:${p}`}
            className="inline-flex h-11 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-fg"
          >
            <Phone className="size-4" aria-hidden />
            {p}
          </a>
        ))}
        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-1.5 rounded-md border border-border px-3 text-sm font-medium"
          >
            <ExternalLink className="size-4" aria-hidden />
            官网
            <span className="sr-only">（新窗口）</span>
          </a>
        ) : null}
      </div>
      {org.notes ? <p className="mt-2 text-sm leading-relaxed text-muted">{org.notes}</p> : null}
      <p className="mt-2 text-xs text-subtle">
        来源：{org.sourceName} · 核验 {org.verifiedAt}
      </p>
    </article>
  );
}
