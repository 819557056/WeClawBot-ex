export type OpenClawConfig = Record<string, any>;

export type PluginLogger = {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  debug?(message: string): void;
};

export type OpenClawPluginApi = {
  runtime?: any;
  registerChannel(params: any): void;
  registerCli(register: any, options?: any): void;
  registerService(service: any): void;
};

export type OpenClawPluginService = {
  id: string;
  start?: (ctx: any) => Promise<void> | void;
  stop?: () => Promise<void> | void;
};

export type ReplyPayload = {
  text?: string;
  mediaUrl?: string;
  mediaUrls?: string[];
};

export type ChannelAccountSnapshot = Record<string, any>;

export type PluginRuntime = {
  channel: any;
};

export type ChannelPlugin<T = any> = {
  id: string;
  config: any;
  gateway?: any;
  auth?: any;
  reload?: any;
};

export { buildChannelConfigSchema, normalizeAccountId } from "./core.js";

export declare function stripMarkdown(input: string): string;
export declare function resolvePreferredOpenClawTmpDir(): string;
export declare function createTypingCallbacks(params?: {
  start?: () => Promise<void>;
  stop?: () => Promise<void>;
  onStartError?: (err: unknown) => void;
  onStopError?: (err: unknown) => void;
  keepaliveIntervalMs?: number;
}): {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  keepalive: () => Promise<void>;
};

export declare function resolveDirectDmAuthorizationOutcome(params: unknown): string;

export declare function resolveSenderCommandAuthorizationWithRuntime(params: unknown): Promise<{
  senderAllowedForCommands: boolean;
  commandAuthorized: boolean;
}>;
