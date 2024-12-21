import { it, expect } from "vitest";
import { generateNextFeatureIndicatorList } from "./generateNextFeatureIndicatorList";
import { FeatureIndicatorList } from "./FeatureIndicator";

it("Works for first indicator list", () => {
  const initialIndicatorList: FeatureIndicatorList = [
    "Positive",
    "Absent",
    "Absent",
  ];

  const expected: FeatureIndicatorList = ["Negative", "Absent", "Absent"];

  const actual = generateNextFeatureIndicatorList(initialIndicatorList);

  expect(actual).toStrictEqual(expected);
});

it("Works for some indicator list that requires a lot of carry overs", () => {
  const indicatorList: FeatureIndicatorList = [
    "Negative",
    "Negative",
    "Negative",
    "Negative",
    "Absent",
  ];

  const expected: FeatureIndicatorList = [
    "Absent",
    "Absent",
    "Absent",
    "Absent",
    "Positive",
  ];

  const actual = generateNextFeatureIndicatorList(indicatorList);

  expect(actual).toStrictEqual(expected);
});
