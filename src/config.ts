const config = {
  GitlabToken: process.env.RUNNER_MONITOR_GITLAB_TOKEN,
  GitlabUrl: process.env.RUNNER_MONITOR_GITLAB_URL,
  GitlabTags: process.env.RUNNER_MONITOR_GITLAB_TAGS ?? "android,ios",
  SlackUrl: process.env.RUNNER_MONITOR_SLACK_URL,
  MSUsername: process.env.RUNNER_MONITOR_MS_USERNAME,
  MSPassword: process.env.RUNNER_MONITOR_MS_PASSWORD,
};

export default config;
