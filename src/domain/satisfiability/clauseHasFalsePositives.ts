import { Clause } from "../clause/Clause";
import { Example } from "../example/Example";
import { featureSetSatisfiesClause } from "./featureSetSatisfiesClause";

export const clauseHasFalsePositives = (
  examples: Array<Example>,
  clause: Clause,
): boolean => {
  const examplesThatDontHaveTheProperty = examples.filter(
    (example) => !example.hasProperty,
  );

  return examplesThatDontHaveTheProperty.some((example) =>
    featureSetSatisfiesClause({
      featureSet: example.featureSet,
      clause,
    }),
  );
};
