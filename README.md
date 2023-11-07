# Runner Monitor
A simple CLI tool to `check` and `restart` gitlab runners on macstadium.

## Installation
This tool can be run via `npx`
  ```sh
   npx bachten <command> [subcommand]
  ```

## Configuration
These tool needs some environment variable defined

| env | description|
| -- | -- |
| RUNNER_MONITOR_GITLAB_TOKEN | Token to access Gitlab API, needs only read access |
| RUNNER_MONITOR_GITLAB_URL   | URL of the Gitlab instance |
| RUNNER_MONITOR_GITLAB_TAGS  | **[optional]** Comma-separated tags by which to filter runners, default "android,ios"|
| RUNNER_MONITOR_SLACK_URL    | **[optional]** Slack webhook url to use in sending messages |
| RUNNER_MONITOR_MS_USERNAME  | **[optional]** Username on Macstadium, only used for restart command/subcommand |
| RUNNER_MONITOR_MS_PASSWORD  | **[optional]** Password on Macstadium, only used for restart command/subcommand |


## Commands
Screenshot
| command | description| arguments/subcommand |
| -- | -- | -- |
| check | Check for offline runners | `restart` - optional, restart all offline machines on MacStadium |
| restart | Restart and offline machine | `[ip-address]` - IP of the machine to be restarted on MacStadium |


## Contributing 
PRs and issues are welcome
