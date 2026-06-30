export type CodingRiskLevel = "高" | "中" | "低";
export type TagType = "primary" | "success" | "warning" | "danger" | "info";

export interface DevelopmentTaskRecord {
  id: number;
  taskName: string;
  requirement: string;
  repository: string;
  branch: string;
  devStatus: "待开发" | "开发中" | "联调中" | "待评审" | "已完成";
  aiParticipation: "未接入" | "Codex 生成中" | "AI 已参与" | "人工确认中";
  buildStatus: "未触发" | "构建中" | "已通过" | "失败待修复";
  owner: string;
  progress: number;
  iteration: string;
  latestUpdate: string;
}

export interface AiCodingTaskRecord {
  id: number;
  aiTask: string;
  relatedDevTask: string;
  aiTool: "Codex" | "AI Review Bot" | "Copilot" | "PromptFlow";
  generationType:
    | "代码初稿"
    | "单元测试"
    | "重构建议"
    | "接口适配"
    | "缺陷修复";
  changedFiles: number;
  executionStatus: "生成中" | "构建验证已通过" | "执行失败" | "待人工评审";
  manualConfirmation: "待确认" | "已确认" | "退回调整";
  updatedAt: string;
  summary: string;
  files: string[];
  result: string;
}

export interface CodeReviewRecord {
  id: number;
  reviewTask: string;
  repository: string;
  commitRecord: string;
  aiReviewStatus: "未开始" | "分析中" | "已完成" | "需复核";
  manualReviewStatus: "待评审" | "评审中" | "已通过" | "退回修订";
  issueCount: number;
  riskLevel: CodingRiskLevel;
  conclusion: "可合入" | "补充测试" | "暂缓合入" | "退回修改";
  aiSuggestions: string[];
  humanOpinions: string[];
  riskHints: string[];
}

export interface RefactorProgressRecord {
  id: number;
  moduleName: string;
  legacyPageCount: number;
  migratedCount: number;
  aiParticipation: string;
  completionRate: number;
  buildStatus: "已通过" | "构建中" | "失败待修复" | "待验证";
  riskNote: string;
  migrationStatus: string;
  achievements: string[];
  legacyIssues: string[];
}

export const developmentTasks: DevelopmentTaskRecord[] = [
  {
    id: 1,
    taskName: "统一门户权限矩阵拆分",
    requirement: "统一门户角色权限精细化",
    repository: "portal-web",
    branch: "feature/permission-matrix",
    devStatus: "待评审",
    aiParticipation: "AI 已参与",
    buildStatus: "已通过",
    owner: "周明",
    progress: 86,
    iteration: "2026.06-R2",
    latestUpdate: "Codex 已生成权限矩阵映射代码，构建验证已通过，等待人工评审。"
  },
  {
    id: 2,
    taskName: "支付异常补偿任务编排",
    requirement: "支付异常分流与补偿提醒",
    repository: "payment-service",
    branch: "feature/compensation-flow",
    devStatus: "开发中",
    aiParticipation: "Codex 生成中",
    buildStatus: "构建中",
    owner: "陈思",
    progress: 58,
    iteration: "2026.06-R2",
    latestUpdate: "AI 正在生成补偿任务状态机初稿，账务回写幂等逻辑待确认。"
  },
  {
    id: 3,
    taskName: "画像规则灰度发布前端",
    requirement: "客户画像引擎标签规则升级",
    repository: "profile-console",
    branch: "feature/rule-gray-release",
    devStatus: "联调中",
    aiParticipation: "人工确认中",
    buildStatus: "失败待修复",
    owner: "李佳",
    progress: 72,
    iteration: "2026.06-R2",
    latestUpdate:
      "AI 生成的灰度回滚交互已进入联调，当前构建失败源于旧组件类型冲突。"
  },
  {
    id: 4,
    taskName: "运营批量审批交互改造",
    requirement: "运营后台批量配置审批",
    repository: "ops-admin",
    branch: "feature/batch-approval",
    devStatus: "已完成",
    aiParticipation: "AI 已参与",
    buildStatus: "已通过",
    owner: "王悦",
    progress: 100,
    iteration: "2026.06-R2",
    latestUpdate: "页面迁移、单元测试和构建验证均已通过，等待合入主干。"
  },
  {
    id: 5,
    taskName: "内部测试反馈归类接口",
    requirement: "内部测试反馈自动归类",
    repository: "quality-collab-api",
    branch: "feature/feedback-classifier",
    devStatus: "待开发",
    aiParticipation: "未接入",
    buildStatus: "未触发",
    owner: "赵宁",
    progress: 18,
    iteration: "2026.07-R1",
    latestUpdate: "需求已确认，待完成接口设计后接入 AI 代码生成任务。"
  }
];

export const aiCodingTasks: AiCodingTaskRecord[] = [
  {
    id: 1,
    aiTask: "Codex 权限矩阵代码初稿",
    relatedDevTask: "统一门户权限矩阵拆分",
    aiTool: "Codex",
    generationType: "代码初稿",
    changedFiles: 8,
    executionStatus: "构建验证已通过",
    manualConfirmation: "待确认",
    updatedAt: "06-29 11:20",
    summary:
      "Codex 已生成代码初稿，变更文件 8 个，构建验证已通过，人工评审待确认。",
    files: [
      "src/views/permission/Matrix.vue",
      "src/api/permission.ts",
      "src/store/modules/permission.ts"
    ],
    result: "单元测试 32 条通过，类型检查通过，等待评审人确认权限边界。"
  },
  {
    id: 2,
    aiTask: "补偿状态机接口适配",
    relatedDevTask: "支付异常补偿任务编排",
    aiTool: "Codex",
    generationType: "接口适配",
    changedFiles: 6,
    executionStatus: "生成中",
    manualConfirmation: "待确认",
    updatedAt: "06-29 10:45",
    summary:
      "AI 正在生成补偿状态流转和重试策略代码，账务回写边界等待人工确认。",
    files: [
      "src/payment/compensation/state.ts",
      "src/payment/compensation/retry.ts"
    ],
    result: "当前生成进度 70%，尚未触发完整构建验证。"
  },
  {
    id: 3,
    aiTask: "画像规则灰度单元测试",
    relatedDevTask: "画像规则灰度发布前端",
    aiTool: "Copilot",
    generationType: "单元测试",
    changedFiles: 5,
    executionStatus: "待人工评审",
    manualConfirmation: "待确认",
    updatedAt: "06-28 18:10",
    summary: "AI 已补齐灰度发布、回滚确认和影响预估三类测试用例。",
    files: [
      "src/views/profile/rule-gray-release.spec.ts",
      "src/utils/rule-preview.spec.ts"
    ],
    result: "局部测试通过，需人工确认断言覆盖是否满足验收标准。"
  },
  {
    id: 4,
    aiTask: "旧 Element Admin 表单重构建议",
    relatedDevTask: "运营批量审批交互改造",
    aiTool: "AI Review Bot",
    generationType: "重构建议",
    changedFiles: 4,
    executionStatus: "构建验证已通过",
    manualConfirmation: "已确认",
    updatedAt: "06-28 15:40",
    summary: "AI 建议将旧表单拆分为审批信息、风险预览和确认动作三个组件。",
    files: [
      "src/views/ops/BatchApproval.vue",
      "src/components/ApprovalRiskPreview.vue"
    ],
    result: "重构建议已采纳，构建验证已通过并进入合入队列。"
  }
];

export const codeReviewRecords: CodeReviewRecord[] = [
  {
    id: 1,
    reviewTask: "权限矩阵拆分 MR-4821",
    repository: "portal-web",
    commitRecord: "a8f34c2..c19b7e0",
    aiReviewStatus: "已完成",
    manualReviewStatus: "评审中",
    issueCount: 3,
    riskLevel: "中",
    conclusion: "补充测试",
    aiSuggestions: [
      "补充临时授权到期后的自动回收测试。",
      "高敏菜单访问建议增加双人确认状态校验。"
    ],
    humanOpinions: [
      "权限边界整体清晰，需补充兼任角色样例。",
      "建议合入前再跑一次端到端菜单访问用例。"
    ],
    riskHints: [
      "角色组合场景遗漏会造成越权访问。",
      "旧菜单缓存可能影响首次登录展示。"
    ]
  },
  {
    id: 2,
    reviewTask: "支付补偿状态机 MR-4828",
    repository: "payment-service",
    commitRecord: "2f89ad1..6d2a9bb",
    aiReviewStatus: "需复核",
    manualReviewStatus: "待评审",
    issueCount: 7,
    riskLevel: "高",
    conclusion: "暂缓合入",
    aiSuggestions: [
      "补偿任务需要保证幂等键唯一。",
      "账务回写失败后的重试次数需要和监控阈值保持一致。"
    ],
    humanOpinions: ["待交易架构组确认状态流转后再进入合入窗口。"],
    riskHints: [
      "重复回调可能导致状态覆盖。",
      "异常告警噪声过高会影响值班判断。"
    ]
  },
  {
    id: 3,
    reviewTask: "批量审批交互改造 MR-4799",
    repository: "ops-admin",
    commitRecord: "ff01d42..91acb72",
    aiReviewStatus: "已完成",
    manualReviewStatus: "已通过",
    issueCount: 1,
    riskLevel: "低",
    conclusion: "可合入",
    aiSuggestions: ["建议保留批量操作前的风险预览。"],
    humanOpinions: ["交互拆分清晰，可合入主干。"],
    riskHints: ["撤销入口需在发布说明中提示。"]
  }
];

export const refactorProgressRecords: RefactorProgressRecord[] = [
  {
    id: 1,
    moduleName: "系统权限管理",
    legacyPageCount: 18,
    migratedCount: 14,
    aiParticipation: "Codex 生成权限表单与路由映射",
    completionRate: 78,
    buildStatus: "已通过",
    riskNote: "角色兼任场景仍需补充回归用例。",
    migrationStatus: "核心页面已迁移",
    achievements: [
      "菜单、角色、按钮权限页面完成 Vue3 setup 改造。",
      "权限 API 类型定义已统一。"
    ],
    legacyIssues: ["旧缓存策略仍需清理。", "部分弹窗交互依赖旧 mixin。"]
  },
  {
    id: 2,
    moduleName: "运营配置中心",
    legacyPageCount: 22,
    migratedCount: 19,
    aiParticipation: "AI 辅助拆分批量审批组件",
    completionRate: 86,
    buildStatus: "已通过",
    riskNote: "批量配置撤销入口需业务确认。",
    migrationStatus: "页面迁移进入收尾",
    achievements: [
      "批量审批、配置预览、操作审计完成迁移。",
      "构建验证连续 3 次通过。"
    ],
    legacyIssues: ["少量历史配置字段缺少枚举。"]
  },
  {
    id: 3,
    moduleName: "客户画像控制台",
    legacyPageCount: 16,
    migratedCount: 10,
    aiParticipation: "Copilot 生成灰度发布测试用例",
    completionRate: 63,
    buildStatus: "失败待修复",
    riskNote: "旧 Element 表格类型与新组件适配存在冲突。",
    migrationStatus: "重点页面联调中",
    achievements: ["标签规则列表、规则详情已完成迁移。"],
    legacyIssues: ["复杂表格列配置依赖旧组件。", "灰度回滚弹窗仍需重构。"]
  },
  {
    id: 4,
    moduleName: "质量协作看板",
    legacyPageCount: 12,
    migratedCount: 5,
    aiParticipation: "PromptFlow 生成看板状态映射建议",
    completionRate: 42,
    buildStatus: "待验证",
    riskNote: "问题状态流转和旧缺陷系统字段仍需对齐。",
    migrationStatus: "基础结构已建立",
    achievements: ["看板布局和筛选框架完成。"],
    legacyIssues: ["旧缺陷状态字段不统一。", "图表组件需要替换。"]
  }
];

export const iterationProgress = [
  { label: "需求转开发", value: 92, color: "#2563eb" },
  { label: "开发完成", value: 74, color: "#0f9d8f" },
  { label: "构建通过", value: 68, color: "#16a34a" },
  { label: "评审完成", value: 52, color: "#d97706" }
];

export function tagType(value: string): TagType {
  if (
    [
      "高",
      "失败待修复",
      "执行失败",
      "退回修订",
      "暂缓合入",
      "退回修改"
    ].includes(value)
  ) {
    return "danger";
  }
  if (
    [
      "中",
      "待开发",
      "开发中",
      "构建中",
      "待评审",
      "人工确认中",
      "待确认",
      "待人工评审",
      "需复核",
      "补充测试",
      "待验证"
    ].includes(value)
  ) {
    return "warning";
  }
  if (
    [
      "低",
      "已完成",
      "已通过",
      "构建验证已通过",
      "已确认",
      "可合入",
      "联调中"
    ].includes(value)
  ) {
    return "success";
  }
  return "primary";
}
