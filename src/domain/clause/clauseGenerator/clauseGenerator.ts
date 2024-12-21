import { Feature } from "../../feature/Feature";
import { FeatureIndicatorList } from "./featureIndicator/FeatureIndicator";
import { generateClauseFromFeatureIndicatorList } from "./featureIndicator/generateClauseFromFeatureIndicatorList";
import { generateInitialFeatureIndicatorList } from "./featureIndicator/generateInitialFeatureIndicatorList";
import { generateNextFeatureIndicatorList } from "./featureIndicator/generateNextFeatureIndicatorList";
import { isLastFeatureIndicatorList } from "./featureIndicator/isLastFeatureIndicatorList";

export function* createClauseGenerator(positiveFeatures: Array<Feature>) {
  const initialFeatureIndicatorList: FeatureIndicatorList =
    generateInitialFeatureIndicatorList(positiveFeatures);

  let currentFeatureIndicatorList = initialFeatureIndicatorList;

  yield generateClauseFromFeatureIndicatorList(
    positiveFeatures,
    currentFeatureIndicatorList,
  );

  while (!isLastFeatureIndicatorList(currentFeatureIndicatorList)) {
    const nextIndicatorList = generateNextFeatureIndicatorList(
      currentFeatureIndicatorList,
    );

    const nextClause = generateClauseFromFeatureIndicatorList(
      positiveFeatures,
      nextIndicatorList,
    );

    currentFeatureIndicatorList = nextIndicatorList;

    yield nextClause;
  }
}
