import { createClauseGenerator } from "../clause/clauseGenerator/clauseGenerator";
import { Example } from "../example/Example";
import { Feature } from "../feature/Feature";
import { Formula } from "../formula/Formula";
import { clauseHasFalsePositives } from "../satisfiability/clauseHasFalsePositives";
import { formulaHasFalseNegatives } from "../satisfiability/formulaHasFalseNegatives";

export type AltFindDefinitionInput = {
  examples: Array<Example>;
  positiveFeatures: Array<Feature>;
};

export const altFindDefinition = ({
  examples,
  positiveFeatures,
}: AltFindDefinitionInput) => {
  /**
   * Algorithm Outline
   *
   * For this algorithm we'll generate
   * things one at a time
   *
   * The general idea is as follows:
   *
   * We start generating a clause
   * pretty much the same way we did with the
   * generate clause thing.
   *
   * Then, we **cycle** through clauses and because
   * each clause is a conjunciton,
   * when we add terms to a clause we're **narrowing down**
   * the definition and in doing that, we'll be reducing
   * the amount of **false positives**, that is, the amount
   * of examples that **do not have** the property that we're trying
   * to define, but that our clause say it does.
   *
   * We're guaranteed to, eventually, get to a clause
   * that has **no false positives**, and then we stop
   * and move to **the next clause**.
   *
   * Each time we finish cycling through a clause,
   * we check **all the examples agains the whole formula**,
   * to **check whether we still have any false negatives**.
   *
   * Important note, when we start the next clause, we can
   * start where we left off at the previous clause.
   **/

  const definition: Formula = [];

  const clauseGenerator = createClauseGenerator(positiveFeatures);

  let currentClauseIterator = clauseGenerator.next();

  // TODO: Deal with unsatisfiable case
  const currentClause = () => currentClauseIterator.value;

  while (formulaHasFalseNegatives(examples, definition)) {
    while (clauseHasFalsePositives(examples, currentClause()!)) {
      currentClauseIterator = clauseGenerator.next();
    }

    const clauseWithNoFalsePositives = currentClause()!;

    definition.push(clauseWithNoFalsePositives);

    currentClauseIterator = clauseGenerator.next();
  }

  return definition;
};
