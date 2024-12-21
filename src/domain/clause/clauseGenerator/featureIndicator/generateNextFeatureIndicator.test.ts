import { it, expect } from "vitest";
import { generateNextFeatureIndicator } from "./generateNextFeatureIndicator";

it("Absent -> Positive", () => {
  expect(generateNextFeatureIndicator("Absent")).toBe("Positive");
});

it("Positive -> Negative", () => {
  expect(generateNextFeatureIndicator("Positive")).toBe("Negative");
});

it("Negative -> Absent", () => {
  expect(generateNextFeatureIndicator("Negative")).toBe("Absent");
});
