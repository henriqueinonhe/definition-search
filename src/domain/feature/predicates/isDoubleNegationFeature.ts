import { Feature } from "../Feature";

export const isDoubleNegationFeature = (feature: Feature) => {
  return feature.startsWith("!!");
};
