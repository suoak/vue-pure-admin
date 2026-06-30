export type TagType = "primary" | "success" | "warning" | "danger" | "info";
export type AiTaskStatus =
  | "待分析"
  | "AI 执行中"
  | "待人工确认"
  | "已采纳"
  | "已归档";
export type Priority = "高" | "中" | "低";

export interface AiBoardTask {
  id: number;
  taskName: string;
  stage: string;
  aiCapability: string;
  owner: string;
  priority: Priority;
  status: AiTaskStatus;
  updatedAt: string;
  summary: string;
}

export interface ManualConfirmationRecord {
  id: number;
  aiTask: string;
  stage: string;
  generatedResult: string;
  confirmer: string;
  confirmationConclusion: "通过" | "补充说明" | "退回修订";
  adoptionStatus: "已采纳" | "部分采纳" | "未采纳" | "待处理";
  confirmedAt: string;
  modificationAdvice: string;
}

export interface ResultAssetRecord {
  id: number;
  assetName: string;
  assetType:
    | "需求模板"
    | "设计检查项"
    | "代码评审规则"
    | "测试用例"
    | "缺陷分析经验"
    | "测试报告";
  sourceStage: string;
  sourceAiTask: string;
  reuseCount: number;
  status: "已发布" | "待复核" | "归档中";
  updatedAt: string;
  summary: string;
}

export const aiBoardTasks: AiBoardTask[] = [
  {
    id: 1,
    taskName: "统一门户角色权限需求拆解",
    stage: "需求与设计",
    aiCapability: "需求聚类与验收标准生成",
    owner: "产品委员会",
    priority: "中",
    status: "待分析",
    updatedAt: "06-29 09:20",
    summary: "等待业务负责人补充角色边界后启动 AI 需求拆解。"
  },
  {
    id: 2,
    taskName: "支付异常补偿代码生成",
    stage: "编码与评审",
    aiCapability: "Codex 代码初稿生成",
    owner: "交易研发组",
    priority: "高",
    status: "AI 执行中",
    updatedAt: "06-29 10:45",
    summary: "Codex 正在生成补偿状态机和重试策略代码。"
  },
  {
    id: 3,
    taskName: "首页驾驶舱用例生成确认",
    stage: "集成测试",
    aiCapability: "测试用例生成",
    owner: "质量平台",
    priority: "中",
    status: "待人工确认",
    updatedAt: "06-29 15:20",
    summary: "AI 已生成 28 条用例，等待测试负责人确认采纳范围。"
  },
  {
    id: 4,
    taskName: "内部测试 R2 报告摘要",
    stage: "内部测试",
    aiCapability: "测试报告生成",
    owner: "测试管理组",
    priority: "高",
    status: "已采纳",
    updatedAt: "06-29 16:30",
    summary: "AI 生成报告摘要已被纳入演示前测试结论。"
  },
  {
    id: 5,
    taskName: "权限矩阵代码评审规则沉淀",
    stage: "编码与评审",
    aiCapability: "代码评审规则抽取",
    owner: "研发效能组",
    priority: "中",
    status: "已归档",
    updatedAt: "06-28 18:20",
    summary: "高敏权限双人确认规则已归档到评审规范库。"
  },
  {
    id: 6,
    taskName: "缺陷归因经验整理",
    stage: "集成测试",
    aiCapability: "缺陷原因聚类",
    owner: "质量平台",
    priority: "低",
    status: "已归档",
    updatedAt: "06-28 17:10",
    summary: "响应式布局和 mock 兜底问题已沉淀为缺陷分析经验。"
  }
];

export const manualConfirmationRecords: ManualConfirmationRecord[] = [
  {
    id: 1,
    aiTask: "首页驾驶舱用例生成确认",
    stage: "集成测试",
    generatedResult: "生成 28 条覆盖登录、菜单、驾驶舱和空数据兜底的测试用例。",
    confirmer: "测试负责人",
    confirmationConclusion: "补充说明",
    adoptionStatus: "部分采纳",
    confirmedAt: "06-29 15:40",
    modificationAdvice: "补充不同角色菜单差异和移动端断点验证。"
  },
  {
    id: 2,
    aiTask: "内部测试 R2 报告摘要",
    stage: "内部测试",
    generatedResult: "输出测试摘要、问题分布、风险结论和改进建议。",
    confirmer: "测试管理组",
    confirmationConclusion: "通过",
    adoptionStatus: "已采纳",
    confirmedAt: "06-29 16:45",
    modificationAdvice: "报告可用于领导演示，后续补充截图证据。"
  },
  {
    id: 3,
    aiTask: "支付异常补偿代码生成",
    stage: "编码与评审",
    generatedResult: "生成补偿状态机、重试策略和异常告警初稿。",
    confirmer: "交易架构组",
    confirmationConclusion: "退回修订",
    adoptionStatus: "待处理",
    confirmedAt: "06-29 11:30",
    modificationAdvice: "补偿幂等键和账务回写边界需要人工补充后再采纳。"
  },
  {
    id: 4,
    aiTask: "权限矩阵代码评审规则沉淀",
    stage: "编码与评审",
    generatedResult: "抽取高敏权限双人确认、临时授权回收和审计留痕规则。",
    confirmer: "安全负责人",
    confirmationConclusion: "通过",
    adoptionStatus: "已采纳",
    confirmedAt: "06-28 18:30",
    modificationAdvice: "加入兼任角色样例后发布到评审规范库。"
  }
];

export const resultAssets: ResultAssetRecord[] = [
  {
    id: 1,
    assetName: "需求澄清与验收标准模板",
    assetType: "需求模板",
    sourceStage: "需求与设计",
    sourceAiTask: "统一门户角色权限需求拆解",
    reuseCount: 12,
    status: "待复核",
    updatedAt: "06-29 10:10",
    summary: "沉淀需求摘要、边界场景、验收标准和测试关注点结构。"
  },
  {
    id: 2,
    assetName: "高敏权限设计检查项",
    assetType: "设计检查项",
    sourceStage: "需求与设计",
    sourceAiTask: "统一门户角色权限需求拆解",
    reuseCount: 8,
    status: "已发布",
    updatedAt: "06-29 11:00",
    summary: "用于评审权限边界、双人确认和审计留痕。"
  },
  {
    id: 3,
    assetName: "权限矩阵代码评审规则",
    assetType: "代码评审规则",
    sourceStage: "编码与评审",
    sourceAiTask: "权限矩阵代码评审规则沉淀",
    reuseCount: 16,
    status: "已发布",
    updatedAt: "06-28 18:35",
    summary: "约束高敏菜单、临时授权和角色兼任场景的评审标准。"
  },
  {
    id: 4,
    assetName: "首页驾驶舱核心测试用例集",
    assetType: "测试用例",
    sourceStage: "集成测试",
    sourceAiTask: "首页驾驶舱用例生成确认",
    reuseCount: 10,
    status: "已发布",
    updatedAt: "06-29 15:50",
    summary: "覆盖登录、菜单、驾驶舱指标、角色权限和空数据兜底。"
  },
  {
    id: 5,
    assetName: "响应式布局缺陷分析经验",
    assetType: "缺陷分析经验",
    sourceStage: "集成测试",
    sourceAiTask: "缺陷归因经验整理",
    reuseCount: 7,
    status: "归档中",
    updatedAt: "06-28 17:20",
    summary: "沉淀卡片栅格、表格横向滚动和长文本换行的常见修复建议。"
  },
  {
    id: 6,
    assetName: "内部测试 R2 AI 摘要报告",
    assetType: "测试报告",
    sourceStage: "内部测试",
    sourceAiTask: "内部测试 R2 报告摘要",
    reuseCount: 5,
    status: "已发布",
    updatedAt: "06-29 16:50",
    summary: "用于领导演示前说明测试覆盖、问题分布和风险结论。"
  }
];

export const boardStatusOrder: AiTaskStatus[] = [
  "待分析",
  "AI 执行中",
  "待人工确认",
  "已采纳",
  "已归档"
];

export function tagType(value: string): TagType {
  if (["高", "退回修订", "未采纳"].includes(value)) return "danger";
  if (
    [
      "中",
      "待分析",
      "AI 执行中",
      "待人工确认",
      "补充说明",
      "部分采纳",
      "待处理",
      "待复核",
      "归档中"
    ].includes(value)
  )
    return "warning";
  if (["低", "已采纳", "已归档", "通过", "已发布"].includes(value))
    return "success";
  return "primary";
}
