import config from "./config";
import { invariant } from "./util";

export const restart = async (ip: string) => {
  invariant(!config.MSUsername || !config.MSPassword, 'Mac Stadium password or username not set, please set RUNNER_MONITOR_MS_USERNAME and RUNNER_MONITOR_MS_PASSWORD')
  const response = await fetch(
    `https://api.macstadium.com/core/api/servers/${ip}/reboot`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(config.MSUsername + ":" + config.MSPassword).toString(
            "base64"
          ),
      },
    }
  );

  const data = await response.json();
  global.progress.increment(1,{
    note: `Restart ${data.name} `, 
  });
};
