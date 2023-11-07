import { log } from "./util";
import { check } from "./check";
import { restart } from "./restart";
import { invariant } from "./util";
import {SingleBar, Presets}  from 'cli-progress'

const commands = [
  {
    command: "check",
    description: "Check for offline runners",
    args: "restart: optional, restart all offline machines on MacStadium",
  },
  {
    command: "restart",
    description: "Restart an offline machine",
    args: "[ip address]: required, ip of the machine to restart on MacStadium",
  },
];

export const run = async () => {
  const tuple = process.argv.slice(2);
  const [command, ...args] = tuple;
  const progress = new SingleBar({}, Presets.shades_classic); 
  global.progress = progress
  
  try {
    
    log(`⏳ Running command "${tuple.join(" ")}"`);
    progress.start(1, 0)

    switch (command) {
      case "check": {
        invariant(
          !!args[0] && args[0] !== "restart",
          `${tuple.join(" ")} is not a valid command`
        );

        await check(args);
        break;
      }
      case "restart": {
        invariant(!args[0], "No IP address provided");

        await restart(args[0]);
        console.log(
          "Restart Successful, please wait 2-4 minutes for a status check"
        );
        break;
      }

      case "help": {
        console.table(commands);
        break;
      }

      default: {
        console.error(`${tuple.join(" ")} is not a valid command`);
      }
    }
    log("✅ Operation successful");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }finally{
    progress.stop()
  }
};
