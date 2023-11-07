import config from "./config";
import { RunnerSchema } from "./types";
import { fetch } from "undici";
import { invariant } from "./util";

const runnerLine = (runner: RunnerSchema) => {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `*${runner.description}*\n`,
    },
  };
};

export const buildMessage = (
  title: string,
  bodyBlocks: Record<string, unknown>[]
) => {
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "plain_text",
          emoji: true,
          text: title,
        },
      },
      {
        type: "divider",
      },
      ...bodyBlocks,
    ],
  };
};

export const buildRestartedMachineMessage = (runners: RunnerSchema[]) => {
  return buildMessage("The following runners have been restarted:", [
    ...runners.map(runnerLine),
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Please wait 2-4 minutes for a status check on Gitlab*`,
      },
    },
  ]);
};

export const buildOfflineRunnersMessage = (runners: RunnerSchema[]) => {
  return buildMessage(
    "The following runners are currently offline:",
    runners.map(runnerLine)
  );
};

export const sendSlackMessage = async (message: any) => {
  invariant(!config.SlackUrl, 'Slack webhook url is not set, please set RUNNER_MONITOR_SLACK_URL')
  const response = await fetch(
    `https://hooks.slack.com/services/${config.SlackUrl}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );
  if (response.status !== 200) {
    console.log(message);
    throw new Error("Failed to send message");
  }
};
