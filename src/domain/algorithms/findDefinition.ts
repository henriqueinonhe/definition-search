import { generateClausesFromFeatures } from "../clause/generateClausesFromFeatures";
import { Feature } from "../feature/Feature";
import { Formula } from "../formula/Formula";
import {
  generateFormulaFromPresenceIndicatorList,
  generateFormulasFromClauses,
  generateNextPresenceIndicatorList,
  isLastPresenceIndicatorList,
} from "../formula/generateFormulasFromClauses";
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

  // Naive algorithm doesn't work because it requires way too much
  // memory with even 3 features, so we'll use an optimized algorithm
  // where we'll only have one formula at a time, like, we generate the
  // formula and check it right away

  const clauses = generateClausesFromFeatures(positiveFeatures);

  const definitions: Array<Formula> = [];

  const initialClausePresenceIndicatorList: Array<boolean> = clauses.map(
    () => false,
  );
  let clausePresenceIndicatorList = initialClausePresenceIndicatorList;

  const formulas: Array<Formula> = [];

  while (!isLastPresenceIndicatorList(clausePresenceIndicatorList)) {
    clausePresenceIndicatorList = generateNextPresenceIndicatorList(
      clausePresenceIndicatorList,
    );

    const formula = generateFormulaFromPresenceIndicatorList(
      clauses,
      clausePresenceIndicatorList,
    );

    if (isSuitableDefinition(examples, formula)) {
      definitions.push(formula);
    }
  }

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
