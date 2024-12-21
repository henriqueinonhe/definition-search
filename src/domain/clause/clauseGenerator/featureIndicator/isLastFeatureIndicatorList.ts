import {
  FeatureIndicatorList,
  highestFeatureIndicator,
} from "./FeatureIndicator";

export const isLastFeatureIndicatorList = (
  indicatorList: FeatureIndicatorList,
): boolean => {
  return indicatorList.every(
    (indicator) => indicator === highestFeatureIndicator,
  );
};
