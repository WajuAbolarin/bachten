import { fetch } from "undici";
import config from "./config";
import { invariant } from "./util";
import { RunnerSchema } from "./types";

export const getOfflineRunners = async (): Promise<RunnerSchema[]> => {
  try {
    invariant(!config.GitlabUrl, 'Gitlab url is not provided, please set RUNNER_MONITOR_GITLAB_URL')
    
    invariant(!config.GitlabToken, 'Gitlab token is not provided, please set RUNNER_MONITOR_GITLAB_TOKEN')
    
    const response = await fetch(
      `${config.GitlabUrl}/api/v4/projects/186/runners?tag_list=${config.GitlabTags}`,
      {
        headers: {
          "PRIVATE-TOKEN": config.GitlabToken,
        },
      }
    );
    if (response.status === 200) {
      const allRunners = (await response.json()) as RunnerSchema[];
      return allRunners.filter((r) => !r.online);
    }
    throw new Error("Failed to fetch runners");
  } catch (err) {
    console.error("Error fetching runners");
    throw err;
  }
};
