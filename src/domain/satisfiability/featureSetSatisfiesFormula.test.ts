import { expect, it } from "vitest";

import { featureSetSatisfiesFormula } from "./featureSetSatisfiesFormula";
import { Formula } from "../formula/Formula";
import { Feature } from "../feature/Feature";

it("Returns true when it satisfies a single clause", () => {
  const formula: Formula = [
    ["A", "B", "C"],
    ["A", "!B", "C"],
    ["!A", "B", "!C"],
  ];

  const featureSet = new Set<Feature>(["A", "!B", "C"]);

  expect(featureSetSatisfiesFormula({ featureSet, formula })).toBe(true);
});

it("Returns false when it doesn't satisfy any clauses", () => {
  const formula: Formula = [
    ["A", "B", "C"],
    ["A", "!B", "C"],
    ["!A", "B", "!C"],
  ];

  const featureSet = new Set<Feature>(["A", "!B", "!C"]);

  expect(featureSetSatisfiesFormula({ featureSet, formula })).toBe(false);
});
