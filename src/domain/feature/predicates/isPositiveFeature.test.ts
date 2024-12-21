import { it, expect } from "vitest";
import { isPositiveFeature } from "./isPositiveFeature";

it("Returns true when feature is an affirmation", () => {
  expect(isPositiveFeature("IsAPotato")).toBe(true);
});

it("Returns false when feature is a negation", () => {
  expect(isPositiveFeature("!AFriend")).toBe(false);
});
