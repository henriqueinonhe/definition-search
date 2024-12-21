import { Example } from "../example/Example";
import { Formula } from "../formula/Formula";
import { featureSetSatisfiesFormula } from "./featureSetSatisfiesFormula";

export const formulaHasFalseNegatives = (
  examples: Array<Example>,
  formula: Formula,
): boolean => {
  const examplesThatHaveTheProperty = examples.filter(
    (example) => example.hasProperty,
  );

  return examplesThatHaveTheProperty.some(
    (example) =>
      !featureSetSatisfiesFormula({
        featureSet: example.featureSet,
        formula,
      }),
  );
};
