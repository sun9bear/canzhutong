import type { CategoryId, DisabilityTypeId, LevelId } from "./catalog";

export type PolicyRecord = {
  id: string;
  title: string;
  shortTitle: string;
  level: LevelId;
  regionCode: string;
  regionName: string;
  category: CategoryId;
  disabilityTypes: DisabilityTypeId[];
  summary: string;
  keyPoints: string[];
  eligibility: string;
  howToApply: string;
  body: string;
  sourceName: string;
  sourceUrl: string;
  docNo: string;
  issuedAt: string;
  effectiveAt: string;
  status: string;
  keywords: string;
  relatedIds: string[];
};
