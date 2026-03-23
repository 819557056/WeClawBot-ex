import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import * as openclawPluginSdk from "openclaw/plugin-sdk";

import { weixinPlugin } from "./src/channel.js";
import { WeixinDemoPluginConfigSchema } from "./src/config/config-schema.js";
import { registerWeixinCli } from "./src/log-upload.js";
import { setWeixinRuntime } from "./src/runtime.js";
import { createWeixinDemoService } from "./src/service/index.js";

function resolveChannelConfigSchema(schema: unknown): unknown {
  const buildChannelConfigSchema = (openclawPluginSdk as { buildChannelConfigSchema?: (s: unknown) => unknown })
    .buildChannelConfigSchema;
  if (typeof buildChannelConfigSchema === "function") {
    return buildChannelConfigSchema(schema);
  }
  const zodLike = schema as { toJSONSchema?: (opts?: unknown) => unknown };
  if (typeof zodLike.toJSONSchema === "function") {
    return {
      schema: zodLike.toJSONSchema({
        target: "draft-07",
        unrepresentable: "any",
      }),
    };
  }
  return {
    schema: {
      type: "object",
      additionalProperties: true,
    },
  };
}

const plugin = {
  id: "molthuman-oc-plugin-wx",
  name: "WeClawBot-ex",
  description: "WeClawBot-ex multi-account Weixin plugin with local control console",
  configSchema: resolveChannelConfigSchema(WeixinDemoPluginConfigSchema),
  register(api: OpenClawPluginApi) {
    if (!api?.runtime) {
      throw new Error("[weixin] api.runtime is not available in register()");
    }
    setWeixinRuntime(api.runtime);

    api.registerChannel({ plugin: weixinPlugin });
    api.registerCli(({ program, config }) => registerWeixinCli({ program, config }), {
      commands: ["openclaw-weixin"],
    });
    api.registerService(createWeixinDemoService(api));
  },
};

export default plugin;
