export type FeatureIndicatorList = Array<FeatureIndicator>;

export type FeatureIndicator = (typeof orderedFeatureIndicators)[number];

export const orderedFeatureIndicators = [
  "Absent",
  "Positive",
  "Negative",
] as const;

export const lowestFeatureIndicator = orderedFeatureIndicators[0];

export const highestFeatureIndicator = orderedFeatureIndicators.at(-1);
