import { Clause } from "../clause/Clause";
import { Formula } from "./Formula";

export const generateFormulasFromClauses = (
  clauses: Array<Clause>,
): Array<Formula> => {
  // TODO parallelize this shit!

  // Use "binary system" but with presence and abscence
  // of each clause based on their indexes

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

    formulas.push(formula);
  }

  return formulas;
};

export const generateFormulaFromPresenceIndicatorList = (
  clauses: Array<Clause>,
  presenceIndicatorList: Array<boolean>,
): Formula => {
  return clauses.filter((_, index) => presenceIndicatorList[index]);
};

export const isLastPresenceIndicatorList = (
  presenceIndicatorList: Array<boolean>,
) => {
  return presenceIndicatorList.every((indicator) => indicator === true);
};

export const generateNextPresenceIndicatorList = (
  presenceIndicatorList: Array<boolean>,
): Array<boolean> => {
  const toBeNextPresenceIndicatorList = presenceIndicatorList.slice();

  let presenceIndicatorIterateeIndex = 0;

  const lastPresenceIndicatorIndex = toBeNextPresenceIndicatorList.length - 1;

  while (presenceIndicatorIterateeIndex <= lastPresenceIndicatorIndex) {
    const presenceIndicator =
      toBeNextPresenceIndicatorList[presenceIndicatorIterateeIndex];

    toBeNextPresenceIndicatorList[presenceIndicatorIterateeIndex] =
      generateNextPresenceIndicator(presenceIndicator);

    if (!nextPresenceIndicatorWillCarryOver(presenceIndicator)) {
      break;
    }

    presenceIndicatorIterateeIndex++;
  }

  return toBeNextPresenceIndicatorList;
};

const generateNextPresenceIndicator = (presenceIndicator: boolean): boolean => {
  return !presenceIndicator;
};

const nextPresenceIndicatorWillCarryOver = (
  presenceIndicator: boolean,
): boolean => {
  return presenceIndicator === true;
};
