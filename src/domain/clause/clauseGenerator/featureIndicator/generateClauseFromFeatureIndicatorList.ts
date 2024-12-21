import { Feature } from "../../../feature/Feature";
import { featureNegation } from "../../../feature/logicalConnectors/featureNegation";
import { Clause } from "../../Clause";
import { FeatureIndicator, FeatureIndicatorList } from "./FeatureIndicator";

export const generateClauseFromFeatureIndicatorList = (
  features: Array<Feature>,
  indicatorList: FeatureIndicatorList,
): Clause => {
  const clause: Clause = [];

  const handlerMatrix: Record<FeatureIndicator, (feature: Feature) => void> = {
    Absent: () => {
      /* No Op */
    },
    Positive: (feature) => {
      clause.push(feature);
    },
    Negative: (feature) => {
      const negativeFeature = featureNegation(feature);
      clause.push(negativeFeature);
    },
  };

  features.forEach((feature, index) => {
    const indicator = indicatorList[index];

    const handler = handlerMatrix[indicator];

    handler(feature);
  });

  return clause;
};
