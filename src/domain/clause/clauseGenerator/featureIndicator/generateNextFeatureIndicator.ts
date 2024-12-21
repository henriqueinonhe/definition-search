import { FeatureIndicator, orderedFeatureIndicators } from "./FeatureIndicator";

export const generateNextFeatureIndicator = (
  indicator: FeatureIndicator,
): FeatureIndicator => {
  const currentIndicatorPositionInOrder = orderedFeatureIndicators.findIndex(
    (i) => i === indicator,
  );

  const nextIndicatorPosition =
    (currentIndicatorPositionInOrder + 1) % orderedFeatureIndicators.length;

  const nextIndicator = orderedFeatureIndicators[nextIndicatorPosition];

  return nextIndicator;
};
