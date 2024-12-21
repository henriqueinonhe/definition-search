import { it, expect } from "vitest";
import { Clause } from "./Clause";
import { generateClausesFromFeatures } from "./generateClausesFromFeatures";

it("Generates clauses correctly", () => {
  const expected: Array<Clause> = [
    ["A"],
    ["!A"],
    ["B"],
    ["A", "B"],
    ["!A", "B"],
    ["!B"],
    ["A", "!B"],
    ["!A", "!B"],
    ["C"],
    ["A", "C"],
    ["!A", "C"],
    ["B", "C"],
    ["A", "B", "C"],
    ["!A", "B", "C"],
    ["!B", "C"],
    ["A", "!B", "C"],
    ["!A", "!B", "C"],
    ["!C"],
    ["A", "!C"],
    ["!A", "!C"],
    ["B", "!C"],
    ["A", "B", "!C"],
    ["!A", "B", "!C"],
    ["!B", "!C"],
    ["A", "!B", "!C"],
    ["!A", "!B", "!C"],
  ];

  const actual = generateClausesFromFeatures(["A", "B", "C"]);

  expect(actual).toStrictEqual(expected);
});
