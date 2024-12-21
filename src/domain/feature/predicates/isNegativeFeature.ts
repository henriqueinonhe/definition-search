import { Feature } from "../Feature";
import { isPositiveFeature } from "./isPositiveFeature";

/**
 * A positive feature equates to an affirmation, whereas
 * a negative feature equates to a negation.
 *
 * A feature can either be positive or negative (excluded middle).
 */
export const isNegativeFeature = (feature: Feature) => {
  return !isPositiveFeature(feature);
};
