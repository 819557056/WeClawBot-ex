import fs from "node:fs";

import type { OpenClawConfig } from "openclaw/plugin-sdk";

export type WeixinDemoServiceConfig = {
  enabled: boolean;
  bind: string;
  port: number;
  restartCommand: string;
};

export type OfficialWeixinPluginConflict = {
  conflict: boolean;
  officialPluginEnabled: boolean;
  officialPluginInstalled: boolean;
  installPath?: string;
  message?: string;
};

const DEFAULT_CONFIG: WeixinDemoServiceConfig = {
  enabled: true,
  bind: "127.0.0.1",
  port: 19120,
  restartCommand: "openclaw gateway restart",
};

export function resolveWeixinDemoServiceConfig(config: OpenClawConfig): WeixinDemoServiceConfig {
  const channels = (config as Record<string, unknown>).channels as Record<string, unknown> | undefined;
  const section = channels?.["openclaw-weixin"] as Record<string, unknown> | undefined;
  const demoService = section?.demoService as Record<string, unknown> | undefined;

  return {
    enabled: typeof demoService?.enabled === "boolean" ? demoService.enabled : DEFAULT_CONFIG.enabled,
    bind: typeof demoService?.bind === "string" && demoService.bind.trim()
      ? demoService.bind.trim()
      : DEFAULT_CONFIG.bind,
    port:
      typeof demoService?.port === "number" &&
      Number.isInteger(demoService.port) &&
      demoService.port > 0 &&
      demoService.port <= 65535
        ? demoService.port
        : DEFAULT_CONFIG.port,
    restartCommand:
      typeof demoService?.restartCommand === "string" && demoService.restartCommand.trim()
        ? demoService.restartCommand.trim()
        : DEFAULT_CONFIG.restartCommand,
  };
}

export function detectOfficialWeixinPluginConflict(config: OpenClawConfig): OfficialWeixinPluginConflict {
  const root = config as Record<string, unknown>;
  const plugins = root.plugins as Record<string, unknown> | undefined;
  const entries = plugins?.entries as Record<string, Record<string, unknown>> | undefined;
  const installs = plugins?.installs as Record<string, Record<string, unknown>> | undefined;

  const officialEntry = entries?.["openclaw-weixin"];
  const officialInstall = installs?.["openclaw-weixin"];
  const installPath =
    typeof officialInstall?.installPath === "string" && officialInstall.installPath.trim()
      ? officialInstall.installPath.trim()
      : undefined;

  const officialPluginEnabled = officialEntry?.enabled !== false;
  const officialPluginInstalled = Boolean(installPath && fs.existsSync(installPath));
  const conflict = officialPluginEnabled && officialPluginInstalled;

  return {
    conflict,
    officialPluginEnabled,
    officialPluginInstalled,
    installPath,
    message: conflict
      ? "Official openclaw-weixin is still enabled in this OpenClaw profile. Disable it before using WeClawBot-ex in the same profile."
      : undefined,
  };
}
