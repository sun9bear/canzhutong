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

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="block text-sm">
        <span className="mb-1 block text-muted">省 / 自治区 / 直辖市</span>
        <select
          id={`${idPrefix}-prov`}
          className="h-11 w-full rounded-md border border-border bg-surface px-3"
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
      <label className="block text-sm">
        <span className="mb-1 block text-muted">地级市 / 州 / 盟</span>
        <select
          id={`${idPrefix}-city`}
          className="h-11 w-full rounded-md border border-border bg-surface px-3"
          value={cityValue}
          disabled={cities.length === 0}
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
