export { buildChannelConfigSchema, normalizeAccountId } from "./core.js";

export function stripMarkdown(input) {
  return String(input ?? "")
    .replace(/`{1,3}/g, "")
    .replace(/[*_~>#-]/g, "");
}

export function resolvePreferredOpenClawTmpDir() {
  return "/tmp/openclaw";
}

export function createTypingCallbacks(params = {}) {
  return {
    start: params.start ?? (async () => {}),
    stop: params.stop ?? (async () => {}),
    keepalive: async () => {},
    ...params,
  };
}

export function resolveDirectDmAuthorizationOutcome(params) {
  const senderAllowed = Boolean(params?.senderAllowedForCommands);
  return senderAllowed ? "allowed" : "unauthorized";
}

export async function resolveSenderCommandAuthorizationWithRuntime() {
  return {
    senderAllowedForCommands: true,
    commandAuthorized: true,
  };
}
