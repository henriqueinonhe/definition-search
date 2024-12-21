import { it, expect } from "vitest";
import { clauseIsWeakerThan } from "./clauseIsWeakerThan";
import { Clause } from "../Clause";

it("Returns true when all features on the left clause are present on the right clause", () => {
  const left: Clause = ["A", "!B"];
  const right: Clause = ["A", "C", "!B", "D"];

  expect(clauseIsWeakerThan(left, right)).toBe(true);
});

it("Returns false when at least one feature on the left clause is absent from the right clause", () => {
  const left: Clause = ["A", "!B", "!C"];
  const right: Clause = ["A", "C", "!B", "D"];

  expect(clauseIsWeakerThan(left, right)).toBe(false);
});
