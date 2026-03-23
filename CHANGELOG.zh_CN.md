# 变更日志

本项目遵循 [Keep a Changelog](https://keepachangelog.com/) 格式。

## [2026.3.24]

### 变更

- 针对 OpenClaw `2026.3.14` 进一步补强运行时兼容，移除了微信消息链路里残留的 root `plugin-sdk` 运行时 helper 依赖
- 将 account-id 和 channel-config helper 切到明确子路径，并新增本地 typing、command-auth、markdown strip 兼容层

## [2026.3.23]

### 新增

- 本地自动化质量门：`test:unit`、`test:smoke`、`test:gate`
- mock 二维码流程 smoke 测试和配置触发式 reload 测试
- 用于解释官方插件关系和隔离边界的架构文档与 FAQ
- 默认的一微信一 agent 绑定能力：`userId -> agentId` 映射与独立 agent 注册
- 针对 `agents.list` + `bindings` 写入的 dedicated binding 单测与 smoke 测试
- 首次绑定时自动完成安全的聊天隔离设置

### 变更

- README 文案修正为：上游官方插件底层已经具备多账号运行骨架
- 对外文档现在明确说明：默认就是一微信一 agent，共享 agent 只作为兜底
- 本次版本不迁移旧共享模式测试数据；如有需要请重新扫码接入
- 安装文档改成“零配置即可启动 + 完整配置参考表”
- 增加了对 OpenClaw `2026.3.12+` 插件运行时差异的兼容兜底
- 补齐了旧 OpenClaw runtime 下 root `plugin-sdk` 不暴露 command-auth、typing、account-id、markdown helper 时的运行时热修
- 旧运行时下如果 PNG 二维码辅助不可用，二维码渲染会自动回退
- 路线图新增“更强的隔离能力”和“商业化分发”两条主线
