import { Clause } from "../Clause";

export const clauseIsWeakerThan = (left: Clause, right: Clause): boolean => {
  // Considering that a clause is conjuntion,
  // weaker means that every feature of the weaker
  // one is present on the stronger

  return left.every((feature) => right.includes(feature));
};
