import { Clause } from "../Clause";
import { clauseIsWeakerThan } from "./clauseIsWeakerThan";

export const clauseIsStrongerThan = (left: Clause, right: Clause): boolean => {
  return clauseIsWeakerThan(right, left);
};
