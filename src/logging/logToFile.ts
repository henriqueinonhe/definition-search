import { writeFileSync } from "node:fs";

export const logToFile = (jsonSerializable: unknown) => {
  const json = JSON.stringify(jsonSerializable, null, 2);

  writeFileSync("./logs/log.json", json);
};
