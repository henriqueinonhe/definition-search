import { generateClausesFromFeatures } from "../clause/generateClausesFromFeatures";
import { Feature } from "../feature/Feature";
import { Formula } from "../formula/Formula";
import { generateFormulasFromClauses } from "../formula/generateFormulasFromClauses";
import { Example } from "../models/Example";
import { featureSetSatisfiesFormula } from "../satisfiability/featureSetSatisfiesFormula";

export type FindDefinitionInuput = {
  positiveFeatures: Array<Feature>;
  examples: Array<Example>;
};

export const findDefinition = ({
  examples,
  positiveFeatures,
}: FindDefinitionInuput) => {
  // Let's try the naive algorithm first
  // - Generate all possible clauses from feature extractors - DONE
  // - Generate all possible formulas from clauses - DONE
  // - Try each formula one by one to find the ones that work for all examples

  const clauses = generateClausesFromFeatures(positiveFeatures);

  const formulas = generateFormulasFromClauses(clauses);

  const definitions = formulas.filter((formula) =>
    isSuitableDefinition(examples, formula),
  );

  return definitions;
};

const isSuitableDefinition = (
  examples: Array<Example>,
  formula: Formula,
): boolean => {
  const examplesThatHaveTheProperty = examples.filter(
    (example) => example.hasProperty,
  );
  const examplesThatDontHaveTheProperty = examples.filter(
    (example) => !example.hasProperty,
  );

  const examplesThatHaveThePropertySatisfyFormula =
    examplesThatHaveTheProperty.every((example) =>
      featureSetSatisfiesFormula({ featureSet: example.featureSet, formula }),
    );
  const examplesThatDontHaveThePropertyFailFormula =
    examplesThatDontHaveTheProperty.every(
      (example) =>
        !featureSetSatisfiesFormula({
          featureSet: example.featureSet,
          formula,
        }),
    );

  return (
    examplesThatHaveThePropertySatisfyFormula &&
    examplesThatDontHaveThePropertyFailFormula
  );
};
