export interface RunnerSchema extends Record<string, unknown> {
  active: boolean;
  id: number;
  description: string;
  paused: boolean;
  ip_address: string;
  is_shared: boolean;
  runner_type: "instance_type" | "group_type" | "project_type";
  name: string;
  online: boolean;
  status: "online" | "offline";
}
