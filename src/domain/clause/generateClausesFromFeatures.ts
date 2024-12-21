import { Clause } from "./Clause";
import { Feature } from "../feature/Feature";
import { featureNegation } from "../feature/logicalConnectors/featureNegation";
import { isDoubleNegationFeature } from "../feature/predicates/isDoubleNegationFeature";
import { featureDoubleNegationAbsorption } from "../feature/logicalConnectors/featureDoubleNegationAbsorption";

export const generateClausesFromFeatures = (
  positiveFeatures: Array<Feature>,
): Array<Clause> => {
  // Algorithm works by "iterating" through clauses
  // just like we would when counting in a ternary system
  // given each feature can only be positive, negative or absent.
  // NOTE We could validate whether all features
  // are positive

  const initialFeatureIndicatorList: FeatureIndicatorList =
    generateInitialFeatureIndicatorList(positiveFeatures);

  let currentFeatureIndicatorList = initialFeatureIndicatorList;

  const clauses: Array<Clause> = [
    generateClauseFromFeatureIndicatorList(
      positiveFeatures,
      currentFeatureIndicatorList,
    ),
  ];

  while (!isLastFeatureIndicatorList(currentFeatureIndicatorList)) {
    const nextIndicatorList = generateNextFeatureIndicatorList(
      currentFeatureIndicatorList,
    );

    const nextClause = generateClauseFromFeatureIndicatorList(
      positiveFeatures,
      nextIndicatorList,
    );
    clauses.push(nextClause);

    currentFeatureIndicatorList = nextIndicatorList;
  }

  return clauses;
};

const generateClauseFromFeatureIndicatorList = (
  features: Array<Feature>,
  indicatorList: FeatureIndicatorList,
): Clause => {
  const clause: Clause = [];

  features.forEach((feature, index) => {
    const indicator = indicatorList[index];

    if (indicator === "Absent") {
      return;
    }

    if (indicator === "Positive") {
      clause.push(feature);
      return;
    }

    if (indicator === "Negative") {
      const negativeFeature = featureNegation(feature);
      clause.push(negativeFeature);
      return;
    }

    throw new Error("WE SHOULD NOT BE HERE!");
  });

  return clause;
};

const generateInitialFeatureIndicatorList = (
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

const isLastFeatureIndicatorList = (
  indicatorList: FeatureIndicatorList,
): boolean => {
  return indicatorList.every((indicator) => indicator === "Negative");
};

const generateNextFeatureIndicatorList = (
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

const generateNextFeatureIndicator = (
  indicator: FeatureIndicator,
): FeatureIndicator => {
  const matrix: Record<FeatureIndicator, FeatureIndicator> = {
    Absent: "Positive",
    Positive: "Negative",
    Negative: "Absent",
  };

  return matrix[indicator];
};

// Like ternary addition, when some digits require carry over
const nextFeatureIndicatorWillCarryOver = (indicator: FeatureIndicator) => {
  return indicator === "Negative";
};

const generateNextFeature = (feature: Feature) => {
  const nextFeature = featureNegation(feature);

  const normalizedNextFeature = isDoubleNegationFeature(nextFeature)
    ? featureDoubleNegationAbsorption(nextFeature)
    : nextFeature;

  return normalizedNextFeature;
};

type FeatureIndicatorList = Array<FeatureIndicator>;

type FeatureIndicator = "Absent" | "Positive" | "Negative";
