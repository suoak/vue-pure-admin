export type TagType = "primary" | "success" | "warning" | "danger" | "info";
export type RiskLevel = "高" | "中" | "低";

export interface IntegrationTestTask {
  id: number;
  taskName: string;
  requirement: string;
  testScope: string;
  caseCount: number;
  executionStatus: "未开始" | "执行中" | "阻塞" | "已完成";
  passRate: string;
  owner: string;
  riskLevel: RiskLevel;
  progress: number;
  riskHint: string;
}

export interface AiCaseGenerationTask {
  id: number;
  generationTask: string;
  requirement: string;
  generatedCases: number;
  adoptedCases: number;
  coveredModules: string;
  manualConfirmation: "待确认" | "已确认" | "退回调整";
  updatedAt: string;
  normalScenarios: string[];
  abnormalScenarios: string[];
  boundaryScenarios: string[];
  aiSummary: string;
}

export interface PipelineRecord {
  id: number;
  pipelineName: string;
  relatedTask: string;
  executionStatus: "运行中" | "成功" | "失败" | "待触发";
  duration: string;
  failureReason: string;
  aiAnalysisStatus: "未分析" | "分析中" | "已完成" | "待复核";
  latestRunAt: string;
  suggestion: string;
}

export interface IntegrationDefect {
  id: number;
  defectTitle: string;
  module: string;
  severity: "严重" | "高" | "中" | "低";
  defectType: "接口契约" | "权限控制" | "数据兜底" | "构建配置" | "页面交互";
  aiAnalysis: string;
  processStatus: "待处理" | "处理中" | "待验证" | "已关闭";
  owner: string;
  impactScope: string;
  fixSuggestion: string;
}

export const integrationTestTasks: IntegrationTestTask[] = [
  {
    id: 1,
    taskName: "首页驾驶舱端到端验证",
    requirement: "登录后首页驾驶舱展示",
    testScope: "登录、菜单、驾驶舱指标、协作环节概览",
    caseCount: 42,
    executionStatus: "执行中",
    passRate: "92%",
    owner: "质量平台",
    riskLevel: "中",
    progress: 76,
    riskHint: "移动端窄屏下指标卡片需继续观察。"
  },
  {
    id: 2,
    taskName: "需求与设计流程联调",
    requirement: "需求工作台与 AI 需求分析",
    testScope: "需求列表、AI 分析、设计评审、风险流转",
    caseCount: 38,
    executionStatus: "已完成",
    passRate: "97%",
    owner: "测试一组",
    riskLevel: "低",
    progress: 100,
    riskHint: "无阻断问题，建议保留字段兜底用例。"
  },
  {
    id: 3,
    taskName: "编码与评审构建验证",
    requirement: "开发任务与代码评审联动",
    testScope: "任务状态、AI 编码记录、构建结果、评审结论",
    caseCount: 46,
    executionStatus: "阻塞",
    passRate: "84%",
    owner: "质量二组",
    riskLevel: "高",
    progress: 58,
    riskHint: "旧 Element Admin 重构页存在构建失败样本。"
  },
  {
    id: 4,
    taskName: "AI 协作记录看板验证",
    requirement: "AI 任务状态流转与结果沉淀",
    testScope: "任务看板、人工确认、结果沉淀、空数据展示",
    caseCount: 31,
    executionStatus: "执行中",
    passRate: "90%",
    owner: "自动化组",
    riskLevel: "中",
    progress: 68,
    riskHint: "mock 数据为空时需保持页面稳定。"
  }
];

export const aiCaseGenerationTasks: AiCaseGenerationTask[] = [
  {
    id: 1,
    generationTask: "首页驾驶舱核心链路用例生成",
    requirement: "登录后首页驾驶舱展示",
    generatedCases: 28,
    adoptedCases: 23,
    coveredModules: "登录页、首页驾驶舱、菜单权限",
    manualConfirmation: "待确认",
    updatedAt: "06-29 15:20",
    normalScenarios: ["正常登录后进入首页驾驶舱", "研发流程指标和图表正常展示"],
    abnormalScenarios: ["权限不足时隐藏操作按钮", "登录态失效时返回登录页"],
    boundaryScenarios: ["不同角色展示不同菜单", "mock 数据为空时页面保持稳定"],
    aiSummary: "AI 已围绕登录、菜单、指标卡片和空数据兜底生成核心用例。"
  },
  {
    id: 2,
    generationTask: "协作工作台跨页面用例生成",
    requirement: "需求、编码、测试协作页面联动",
    generatedCases: 36,
    adoptedCases: 30,
    coveredModules: "需求工作台、开发任务、测试任务",
    manualConfirmation: "已确认",
    updatedAt: "06-29 14:40",
    normalScenarios: ["需求进入开发任务后状态可追踪", "构建通过后进入评审列表"],
    abnormalScenarios: ["构建失败时展示修复建议", "风险等级为空时使用默认展示"],
    boundaryScenarios: ["长需求名称不撑破表格", "负责人为空时展示待分配"],
    aiSummary: "AI 已生成跨角色协作链路用例，人工确认后采纳 30 条。"
  },
  {
    id: 3,
    generationTask: "AI 任务看板异常场景生成",
    requirement: "AI 协作记录状态流转",
    generatedCases: 24,
    adoptedCases: 18,
    coveredModules: "AI 任务看板、人工确认记录、结果沉淀",
    manualConfirmation: "退回调整",
    updatedAt: "06-28 18:10",
    normalScenarios: ["AI 任务从分析中流转到已沉淀", "人工确认记录按时间展示"],
    abnormalScenarios: ["任务状态未知时展示默认标签", "沉淀资产为空时展示空态"],
    boundaryScenarios: ["多条任务同时更新", "长摘要内容自动换行"],
    aiSummary: "异常状态覆盖不足，已退回补充更多看板空态和未知状态用例。"
  }
];

export const pipelineRecords: PipelineRecord[] = [
  {
    id: 1,
    pipelineName: "frontend-main-ci",
    relatedTask: "首页驾驶舱端到端验证",
    executionStatus: "成功",
    duration: "8m 42s",
    failureReason: "无",
    aiAnalysisStatus: "已完成",
    latestRunAt: "06-29 15:35",
    suggestion: "构建稳定，可进入下一批回归。"
  },
  {
    id: 2,
    pipelineName: "legacy-refactor-check",
    relatedTask: "编码与评审构建验证",
    executionStatus: "失败",
    duration: "12m 18s",
    failureReason: "旧表格组件类型与新页面字段不一致",
    aiAnalysisStatus: "已完成",
    latestRunAt: "06-29 14:58",
    suggestion: "先补齐表格列类型，再重跑重构模块构建验证。"
  },
  {
    id: 3,
    pipelineName: "integration-e2e-suite",
    relatedTask: "AI 协作记录看板验证",
    executionStatus: "运行中",
    duration: "6m 05s",
    failureReason: "执行中",
    aiAnalysisStatus: "分析中",
    latestRunAt: "06-29 15:50",
    suggestion: "等待用例完成后自动归因失败样本。"
  },
  {
    id: 4,
    pipelineName: "api-contract-check",
    relatedTask: "需求与设计流程联调",
    executionStatus: "成功",
    duration: "5m 31s",
    failureReason: "无",
    aiAnalysisStatus: "已完成",
    latestRunAt: "06-29 13:20",
    suggestion: "接口契约稳定，可进入内部测试轮次。"
  }
];

export const integrationDefects: IntegrationDefect[] = [
  {
    id: 1,
    defectTitle: "移动端驾驶舱指标卡片换行异常",
    module: "首页驾驶舱",
    severity: "中",
    defectType: "页面交互",
    aiAnalysis: "AI 判断为栅格断点和卡片最小宽度冲突。",
    processStatus: "处理中",
    owner: "前端平台组",
    impactScope: "影响移动端领导演示截图和窄屏浏览体验。",
    fixSuggestion: "降低卡片最小宽度并在 768px 以下切换单列布局。"
  },
  {
    id: 2,
    defectTitle: "旧重构页面构建类型校验失败",
    module: "重构进度",
    severity: "高",
    defectType: "构建配置",
    aiAnalysis: "旧 Element Admin 表格列配置未完全迁移到新的类型定义。",
    processStatus: "待验证",
    owner: "重构专项组",
    impactScope: "影响编码与评审模块的构建验证结论。",
    fixSuggestion: "统一表格列数据结构，并补充字段默认值。"
  },
  {
    id: 3,
    defectTitle: "AI 任务看板空数据时缺少提示",
    module: "AI 协作记录",
    severity: "低",
    defectType: "数据兜底",
    aiAnalysis: "mock 数据为空时列表容器仍保留高度但没有空态说明。",
    processStatus: "已关闭",
    owner: "AI 平台组",
    impactScope: "不影响主流程，但会影响演示完整度。",
    fixSuggestion: "增加 Element Plus 空态组件并保留页面高度。"
  },
  {
    id: 4,
    defectTitle: "不同角色菜单权限校验缺少回归样本",
    module: "菜单权限",
    severity: "高",
    defectType: "权限控制",
    aiAnalysis: "当前集成用例未覆盖测试负责人和管理层两类角色差异。",
    processStatus: "待处理",
    owner: "质量平台",
    impactScope: "可能影响不同角色登录后的菜单展示一致性。",
    fixSuggestion: "补充角色矩阵回归数据，并在流水线中固定执行。"
  }
];

export const pipelineTrend = [
  { day: "周一", success: 8, failed: 2 },
  { day: "周二", success: 9, failed: 1 },
  { day: "周三", success: 7, failed: 3 },
  { day: "周四", success: 10, failed: 1 },
  { day: "周五", success: 11, failed: 2 }
];

export function tagType(value: string): TagType {
  if (["高", "严重", "失败", "阻塞", "待处理", "执行失败"].includes(value))
    return "danger";
  if (
    [
      "中",
      "执行中",
      "运行中",
      "分析中",
      "待确认",
      "处理中",
      "待复核",
      "待验证"
    ].includes(value)
  )
    return "warning";
  if (
    ["低", "成功", "已完成", "已确认", "已关闭", "已完成", "已完成"].includes(
      value
    )
  )
    return "success";
  return "primary";
}
