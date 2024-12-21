import { Example } from "./Example";
import { Feature } from "../feature/Feature";

export type FeatureExtractor = {
  feature: Feature;
  extractor: (example: Example) => boolean;
};
