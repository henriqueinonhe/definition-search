import { Feature } from "../feature/Feature";
import { Formula } from "../formula/Formula";
import { featureSetSatisfiesClause } from "./featureSetSatisfiesClause";

export type FeatureSetSatisfiesFormulaInput = {
  featureSet: Set<Feature>;
  formula: Formula;
};

export const featureSetSatisfiesFormula = ({
  featureSet,
  formula,
}: FeatureSetSatisfiesFormulaInput) => {
  // Due to **D(isjunctive)**NF, to satisfy a formula
  // it must satisfy AT LEAST one clause

  return formula.some((clause) =>
    featureSetSatisfiesClause({ featureSet, clause }),
  );
};
