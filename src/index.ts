#! /usr/bin/env node

import { run } from "./run";

run()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log("Program error");
    console.error(err.message);
    process.exit(1);
  });

process.on("unhandledRejection", (err) => {
  console.error((err as Error).message);
});

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => {
    process.exit(0);
  });
});
