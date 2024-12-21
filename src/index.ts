import { examples } from "./data/examples";
import { altFindDefinition } from "./domain/algorithms/altFindDefinition";

const main = async (): Promise<void> => {
  const definition = altFindDefinition({
    examples: examples,
    positiveFeatures: ["Cat", "Orange", "Male"],
  });

  console.log(definition);
};

main();
