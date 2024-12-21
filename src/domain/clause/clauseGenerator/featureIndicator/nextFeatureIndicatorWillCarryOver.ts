import { FeatureIndicator, highestFeatureIndicator } from "./FeatureIndicator";

// Like ternary addition, when some digits require carry over
export const nextFeatureIndicatorWillCarryOver = (
  indicator: FeatureIndicator,
) => {
  return indicator === highestFeatureIndicator;
};
