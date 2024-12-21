import { Feature } from "../Feature";
import { isDoubleNegationFeature } from "../predicates/isDoubleNegationFeature";

export const featureDoubleNegationAbsorption = (feature: Feature) => {
  if (!isDoubleNegationFeature(feature)) {
    throw new Error("Expected double negation feature!");
  }

  return feature.slice(2);
};
