/**
 * Lightweight placeholders for MP shell.
 * Do not invent subsidy amounts or official URLs here.
 * Wire to the main app API / static JSON later.
 */
export type PolicyListItem = {
  id: string;
  title: string;
  summary: string;
  level: string;
};

/** Empty list by default — UI shows empty state. */
export const POLICY_PLACEHOLDERS: PolicyListItem[] = [];

export function getPolicyById(id: string): PolicyListItem | undefined {
  return POLICY_PLACEHOLDERS.find((p) => p.id === id);
}
