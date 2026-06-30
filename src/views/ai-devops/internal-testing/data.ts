export type TagType = "primary" | "success" | "warning" | "danger" | "info";
export type RiskLevel = "高" | "中" | "低";

export interface TestRoundRecord {
  id: number;
  roundName: string;
  testScope: string;
  startTime: string;
  currentStatus: "未开始" | "测试中" | "回归中" | "已完成";
  issueCount: number;
  regressionStatus: "未开始" | "待回归" | "回归中" | "已通过";
  testOwner: string;
  passRate: string;
}

export interface InternalIssueRecord {
  id: number;
  issueTitle: string;
  module: string;
  issueLevel: "严重" | "高" | "中" | "低";
  aiSuggestion: string;
  processStatus: "待处理" | "处理中" | "待验证" | "已关闭";
  owner: string;
  updatedAt: string;
  closeStatus: string;
}

export interface RegressionRecord {
  id: number;
  regressionTask: string;
  relatedIssue: string;
  validationScope: string;
  validationResult: "通过" | "失败" | "待验证" | "需复测";
  passed: "是" | "否" | "待确认";
  validator: string;
  updatedAt: string;
  failureReason: string;
  pendingItems: string;
}

export interface TestReportRecord {
  id: number;
  reportName: string;
  testScope: string;
  issueCount: number;
  riskLevel: RiskLevel;
  generationStatus: "生成中" | "已生成" | "待补充";
  manualConfirmation: "待确认" | "已确认" | "退回调整";
  generatedAt: string;
  summary: string;
  issueDistribution: Array<{ type: string; count: number }>;
  riskConclusion: string;
  improvements: string[];
}

export const testRounds: TestRoundRecord[] = [
  {
    id: 1,
    roundName: "内部测试 R1",
    testScope: "登录页、首页驾驶舱、需求与设计",
    startTime: "06-27 09:30",
    currentStatus: "已完成",
    issueCount: 9,
    regressionStatus: "已通过",
    testOwner: "测试管理组",
    passRate: "96%"
  },
  {
    id: 2,
    roundName: "内部测试 R2",
    testScope: "编码与评审、集成测试、AI 协作记录",
    startTime: "06-29 10:00",
    currentStatus: "测试中",
    issueCount: 12,
    regressionStatus: "待回归",
    testOwner: "质量平台",
    passRate: "89%"
  },
  {
    id: 3,
    roundName: "演示前专项验证",
    testScope: "首页驾驶舱、协作工作台、AI 任务看板",
    startTime: "06-30 09:00",
    currentStatus: "未开始",
    issueCount: 0,
    regressionStatus: "未开始",
    testOwner: "发布经理",
    passRate: "0%"
  },
  {
    id: 4,
    roundName: "移动端适配回归",
    testScope: "菜单、表格、横幅、指标卡片",
    startTime: "06-29 16:00",
    currentStatus: "回归中",
    issueCount: 4,
    regressionStatus: "回归中",
    testOwner: "前端平台组",
    passRate: "91%"
  }
];

export const internalIssues: InternalIssueRecord[] = [
  {
    id: 1,
    issueTitle: "窄屏下首页指标卡片排列不稳定",
    module: "首页驾驶舱",
    issueLevel: "中",
    aiSuggestion: "优化栅格断点，指标卡片在移动端切换为单列。",
    processStatus: "处理中",
    owner: "前端平台组",
    updatedAt: "06-29 15:40",
    closeStatus: "待回归关闭"
  },
  {
    id: 2,
    issueTitle: "AI 任务看板空态提示不明显",
    module: "AI 协作记录",
    issueLevel: "低",
    aiSuggestion: "增加空态提示和默认高度，避免页面视觉坍塌。",
    processStatus: "待验证",
    owner: "AI 平台组",
    updatedAt: "06-29 14:20",
    closeStatus: "修复待验"
  },
  {
    id: 3,
    issueTitle: "状态标签颜色在部分页面不一致",
    module: "协作工作台",
    issueLevel: "中",
    aiSuggestion: "统一状态到 tagType 映射，保持风险和执行状态颜色一致。",
    processStatus: "处理中",
    owner: "产品体验组",
    updatedAt: "06-29 13:50",
    closeStatus: "待二次验证"
  },
  {
    id: 4,
    issueTitle: "登录页演示账号说明需弱化",
    module: "登录页",
    issueLevel: "低",
    aiSuggestion: "保留登录入口，减少不必要说明文字，突出平台名称。",
    processStatus: "已关闭",
    owner: "平台组",
    updatedAt: "06-28 18:00",
    closeStatus: "已关闭"
  }
];

export const regressionRecords: RegressionRecord[] = [
  {
    id: 1,
    regressionTask: "首页指标卡片响应式回归",
    relatedIssue: "窄屏下首页指标卡片排列不稳定",
    validationScope: "桌面、平板、移动端三类视口",
    validationResult: "需复测",
    passed: "待确认",
    validator: "测试管理组",
    updatedAt: "06-29 16:20",
    failureReason: "平板宽度下仍有一处卡片间距偏窄。",
    pendingItems: "确认 1024px 断点布局"
  },
  {
    id: 2,
    regressionTask: "AI 看板空态验证",
    relatedIssue: "AI 任务看板空态提示不明显",
    validationScope: "空数据、单条数据、多列状态",
    validationResult: "通过",
    passed: "是",
    validator: "AI 平台组",
    updatedAt: "06-29 15:10",
    failureReason: "无",
    pendingItems: "无"
  },
  {
    id: 3,
    regressionTask: "状态标签统一验证",
    relatedIssue: "状态标签颜色在部分页面不一致",
    validationScope: "需求、编码、测试、内部测试页面",
    validationResult: "待验证",
    passed: "待确认",
    validator: "产品体验组",
    updatedAt: "06-29 14:40",
    failureReason: "待执行",
    pendingItems: "确认风险和状态映射表"
  }
];

export const testReports: TestReportRecord[] = [
  {
    id: 1,
    reportName: "内部测试 R2 AI 摘要报告",
    testScope: "登录页、首页驾驶舱、协作工作台、AI 任务看板",
    issueCount: 12,
    riskLevel: "中",
    generationStatus: "已生成",
    manualConfirmation: "待确认",
    generatedAt: "06-29 16:30",
    summary:
      "本轮测试覆盖登录页、首页驾驶舱、协作工作台和 AI 任务看板。整体流程可正常演示，主要问题集中在响应式布局、状态标签展示和 mock 数据字段兜底。建议完成页面样式优化后进入下一轮验证。",
    issueDistribution: [
      { type: "响应式布局", count: 4 },
      { type: "状态标签", count: 3 },
      { type: "mock 兜底", count: 3 },
      { type: "交互细节", count: 2 }
    ],
    riskConclusion:
      "当前无阻断演示问题，中风险项集中在视觉一致性和移动端布局。",
    improvements: [
      "统一状态标签颜色映射。",
      "补齐空数据和字段缺失兜底。",
      "完成移动端断点复测。"
    ]
  },
  {
    id: 2,
    reportName: "内部测试 R1 闭环报告",
    testScope: "登录页、首页驾驶舱、需求与设计",
    issueCount: 9,
    riskLevel: "低",
    generationStatus: "已生成",
    manualConfirmation: "已确认",
    generatedAt: "06-28 17:40",
    summary:
      "R1 已覆盖基础登录和需求设计主链路，阻断问题已关闭，剩余为展示文案和布局细节。",
    issueDistribution: [
      { type: "展示文案", count: 3 },
      { type: "布局细节", count: 4 },
      { type: "数据兜底", count: 2 }
    ],
    riskConclusion: "R1 风险已收敛，可作为 R2 验证基线。",
    improvements: ["保留回归样本。", "将已关闭问题纳入报告沉淀。"]
  }
];

export function tagType(value: string): TagType {
  if (["高", "严重", "失败", "否", "待处理", "退回调整"].includes(value))
    return "danger";
  if (
    [
      "中",
      "测试中",
      "回归中",
      "待回归",
      "待验证",
      "需复测",
      "待确认",
      "处理中",
      "待补充",
      "生成中"
    ].includes(value)
  )
    return "warning";
  if (
    [
      "低",
      "已完成",
      "已通过",
      "通过",
      "是",
      "已关闭",
      "已生成",
      "已确认"
    ].includes(value)
  )
    return "success";
  return "primary";
}
