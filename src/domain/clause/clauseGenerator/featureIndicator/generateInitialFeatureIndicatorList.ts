import { Feature } from "../../../feature/Feature";
import { FeatureIndicatorList } from "./FeatureIndicator";

export const generateInitialFeatureIndicatorList = (
  positiveFeatures: Array<Feature>,
): FeatureIndicatorList => {
  return positiveFeatures.map((_, index) => {
    const firstIndex = 0;

    if (index === firstIndex) {
      return "Positive";
    }

    return "Absent";
  });
};
