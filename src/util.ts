export const invariant = (condition: boolean, message: string) => {
  if (condition) {
    global.progress.stop()
    console.error('⛔️ ' + message);
    process.exit(1);
  }
};

export const log = (message: string) => {
  if (process.env.SILENT !== "1") {
    process.stdout.write(`\n ${message} \n`);
  }
};
