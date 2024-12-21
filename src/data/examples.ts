import { Example } from "../domain/example/Example";

export const examples: Array<Example> = [
  {
    featureSet: new Set(["Cat", "Orange", "Male"]),
    hasProperty: false,
  },
  {
    featureSet: new Set(["Cat", "Orange", "!Male"]),
    hasProperty: true,
  },
  {
    featureSet: new Set(["Cat", "!Orange", "Male"]),
    hasProperty: true,
  },
  {
    featureSet: new Set(["Cat", "!Orange", "!Male"]),
    hasProperty: true,
  },
  {
    featureSet: new Set(["!Cat", "Orange", "Male"]),
    hasProperty: true,
  },
  {
    featureSet: new Set(["!Cat", "Orange", "!Male"]),
    hasProperty: true,
  },
  {
    featureSet: new Set(["!Cat", "!Orange", "Male"]),
    hasProperty: true,
  },
  {
    featureSet: new Set(["!Cat", "!Orange", "!Male"]),
    hasProperty: true,
  },
];
