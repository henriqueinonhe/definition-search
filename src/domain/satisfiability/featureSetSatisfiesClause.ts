import { Clause } from "../clause/Clause";
import { Feature } from "../feature/Feature";

export type FeatureSetSatisfiesClauseInput = {
  featureSet: Set<Feature>;
  clause: Clause;
};

export const featureSetSatisfiesClause = ({
  clause,
  featureSet,
}: FeatureSetSatisfiesClauseInput) => {
  // Due to DNF, to satisfy a clause
  // it must satisfy **all** its constituents (features)

  // NOTE: We may want to normalize features to
  // remove double negations before making this comparison

  return clause.every((feature) => featureSet.has(feature));
};
