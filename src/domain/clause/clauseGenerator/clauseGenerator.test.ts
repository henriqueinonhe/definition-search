import { it, expect } from "vitest";
import { Clause } from "../Clause";
import { createClauseGenerator } from "./clauseGenerator";

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

  const clauseGenerator = createClauseGenerator(["A", "B", "C"]);

  const actual = [...clauseGenerator];

  expect(actual).toStrictEqual(expected);
});

it("It yields correctly", () => {
  const clauseGenerator = createClauseGenerator(["A", "B", "C"]);

  expect(clauseGenerator.next().value).toStrictEqual(["A"]);
  expect(clauseGenerator.next().value).toStrictEqual(["!A"]);
});
