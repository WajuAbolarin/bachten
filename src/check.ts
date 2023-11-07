import * as Gitlab from "./gitlab";
import { restart } from "./restart";
import * as Slack from "./slack";
import { RunnerSchema } from "./types";
export const check = async (subcommands: string[]) => {
  try {
    const runners = await Gitlab.getOfflineRunners();

    global.progress.increment(1);
    if (runners.length === 0) {
      return;
    }
    
    global.progress.setTotal(2);
    const message = Slack.buildOfflineRunnersMessage(runners);
    await Slack.sendSlackMessage(message);
    global.progress.increment(1);
    
    if (subcommands.includes("restart")) {
      await restartOffline(runners);
    }
  } catch (err) {
    console.error(err);
  }
};

const restartOffline = async (runners: RunnerSchema[]) => {
  try {
    global.progress.setTotal(runners.length + 1);
    for (const runner of runners) {
      const ip = runner.description.split("-")[0];
      console.log(`======= Restarting ${ip} =========`);
      await restart(ip);
    }
    await Slack.sendSlackMessage(Slack.buildRestartedMachineMessage(runners));
    global.progress.increment(1);
  } catch (err) {
    console.error("Error restarting runners");
    throw err;
  }
};
