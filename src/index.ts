import { examples } from "./data/examples";
import { findDefinition } from "./domain/algorithms/findDefinition";

const main = async (): Promise<void> => {
  console.log(
    findDefinition({
      examples: examples,
      positiveFeatures: ["Cat", "Orange", "Male"],
    }),
  );
};

main();
