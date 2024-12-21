import { it, expect } from "vitest";
import { Feature } from "../feature/Feature";
import { Clause } from "../clause/Clause";
import { featureSetSatisfiesClause } from "./featureSetSatisfiesClause";

it("Returns false when some feature in the clause does not exist in the feature set", () => {
  const featureSet = new Set<Feature>(["A", "!B", "!C"]);

  const clause: Clause = ["A", "B", "!C"];

  expect(featureSetSatisfiesClause({ featureSet, clause })).toBe(false);
});

it("Returns true when all features in the clause exist in the feature set", () => {
  const featureSet = new Set<Feature>(["A", "!B", "!C", "D"]);

  const clause: Clause = ["A", "!B", "!C"];

  expect(featureSetSatisfiesClause({ featureSet, clause })).toBe(true);
});

it("Returns true even when the set has more features than the clause", () => {
  const featureSet = new Set<Feature>(["A", "!B", "!C"]);

  const clause: Clause = ["A", "!B", "!C"];

  expect(featureSetSatisfiesClause({ featureSet, clause })).toBe(true);
});
