import { childRegions, PROVINCE_REGIONS, regionParent } from "@/data/catalog";

export function RegionPicker({
  value,
  onChange,
  allowAll = true,
  idPrefix = "region",
}: {
  value: string;
  onChange: (code: string) => void;
  allowAll?: boolean;
  idPrefix?: string;
}) {
  const selected = value || (allowAll ? "ALL" : "CN");
  const parent = regionParent(selected);
  const province =
    selected === "ALL" || selected === "CN" || parent === "CN" || parent === null
      ? selected
      : (parent ?? selected);
  const cities = province && province !== "ALL" && province !== "CN" ? childRegions(province) : [];
  const cityValue = parent && parent !== "CN" ? selected : "";
  const provId = `${idPrefix}-prov`;
  const cityId = `${idPrefix}-city`;

  return (
    <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="地区筛选">
      <label className="block text-sm" htmlFor={provId}>
        <span className="mb-1 block text-muted">省 / 自治区 / 直辖市</span>
        <select
          id={provId}
          className="h-11 w-full rounded-md border border-border bg-surface px-3 text-fg"
          value={province}
          onChange={(e) => onChange(e.target.value)}
        >
          {allowAll ? <option value="ALL">全部地区</option> : null}
          {PROVINCE_REGIONS.map((r) => (
            <option key={r.code} value={r.code}>
              {r.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm" htmlFor={cityId}>
        <span className="mb-1 block text-muted">地级市 / 州 / 盟</span>
        <select
          id={cityId}
          className="h-11 w-full rounded-md border border-border bg-surface px-3 text-fg disabled:opacity-60"
          value={cityValue}
          disabled={cities.length === 0}
          aria-disabled={cities.length === 0}
          onChange={(e) => onChange(e.target.value || province)}
        >
          <option value="">{cities.length ? "全省（含各地市）" : "无下设地级（或请先选省）"}</option>
          {cities.map((r) => (
            <option key={r.code} value={r.code}>
              {r.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
