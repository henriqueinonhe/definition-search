import { FeatureIndicatorList } from "./FeatureIndicator";
import { generateNextFeatureIndicator } from "./generateNextFeatureIndicator";
import { nextFeatureIndicatorWillCarryOver } from "./nextFeatureIndicatorWillCarryOver";

export const generateNextFeatureIndicatorList = (
  indicatorList: FeatureIndicatorList,
): FeatureIndicatorList => {
  const toBeNextIndicatorList = indicatorList.slice();

  const firstIndicatorIndex = 0;
  let indicatorIterateeIndex = firstIndicatorIndex;

  const lastIndicatorIndex = toBeNextIndicatorList.length - 1;

  while (indicatorIterateeIndex <= lastIndicatorIndex) {
    const indicatorIteratee = indicatorList[indicatorIterateeIndex];

    toBeNextIndicatorList[indicatorIterateeIndex] =
      generateNextFeatureIndicator(indicatorIteratee);

    if (!nextFeatureIndicatorWillCarryOver(indicatorIteratee)) {
      break;
    }

    indicatorIterateeIndex++;
  }

  return toBeNextIndicatorList;
};
