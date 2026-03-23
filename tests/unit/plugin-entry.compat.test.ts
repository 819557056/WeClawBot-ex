import { describe, expect, it, vi } from "vitest";

describe("plugin entry sdk compatibility", () => {
  it("falls back when buildChannelConfigSchema is unavailable", async () => {
    vi.resetModules();
    vi.doMock("openclaw/plugin-sdk", async () => {
      const actual = await vi.importActual<Record<string, unknown>>("openclaw/plugin-sdk");
      return {
        ...actual,
        buildChannelConfigSchema: undefined,
      };
    });

    const mod = await import("../../index.ts");
    const plugin = mod.default as {
      configSchema?: unknown;
      register?: (api: Record<string, unknown>) => void;
    };

    expect(plugin.configSchema).toEqual(
      expect.objectContaining({
        schema: expect.any(Object),
      }),
    );

    const api = {
      runtime: { channel: {} },
      registerChannel: vi.fn(),
      registerCli: vi.fn(),
      registerService: vi.fn(),
    };
    plugin.register?.(api);
    expect(api.registerChannel).toHaveBeenCalled();
    expect(api.registerCli).toHaveBeenCalled();
    expect(api.registerService).toHaveBeenCalled();

    vi.doUnmock("openclaw/plugin-sdk");
  });
});
