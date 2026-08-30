import assert from "node:assert/strict";
import { test } from "node:test";
import { checkPolicyAndOrgIds } from "./check-policy-ids.mjs";

test("unique policy ids", () => {
  const errors = checkPolicyAndOrgIds(
    [
      { id: "a", relatedIds: [] },
      { id: "a", relatedIds: [] },
    ],
    [],
  );
  assert.ok(errors.some((e) => e.includes("duplicate policy id: a")));
});

test("unique org ids", () => {
  const errors = checkPolicyAndOrgIds(
    [],
    [{ id: "org-1" }, { id: "org-1" }],
  );
  assert.ok(errors.some((e) => e.includes("duplicate org id: org-1")));
});

test("relatedIds must exist", () => {
  const errors = checkPolicyAndOrgIds(
    [
      { id: "keep", relatedIds: ["missing"] },
      { id: "ok", relatedIds: ["keep"] },
    ],
    [],
  );
  assert.ok(errors.some((e) => e.includes('dangling relatedId "missing"')));
  assert.equal(
    errors.filter((e) => e.includes("dangling")).length,
    1,
  );
});

test("empty catalog is ok", () => {
  assert.deepEqual(checkPolicyAndOrgIds([], []), []);
});
