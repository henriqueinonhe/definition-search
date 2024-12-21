import { Feature } from "../feature/Feature";

export type Example = {
  featureSet: Set<Feature>;
  hasProperty: boolean;
};
