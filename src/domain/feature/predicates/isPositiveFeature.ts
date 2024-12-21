import { Feature } from "../Feature";

/**
 * A positive feature equates to an affirmation, whereas
 * a negative feature equates to a negation.
 *
 * A feature can either be positive or negative (excluded middle).
 */
export const isPositiveFeature = (feature: Feature) => {
  return !feature.startsWith("!");
};
