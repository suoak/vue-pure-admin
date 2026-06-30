export interface DashboardMetric {
  label: string;
  value: string;
  note: string;
  accent: string;
}

export interface CollaborationStage {
  title: string;
  aiCapability: string;
  status: string;
  pendingCount: number;
  riskLevel: "高" | "中" | "低";
  aiCoverage: number;
  closureRate: number;
  owner: string;
  latestRecord: string;
}

export interface CollaborationTask {
  id: number;
  taskName: string;
  stage: string;
  owner: string;
  status: "进行中" | "待确认" | "已完成" | "高风险";
  priority: "高" | "中" | "低";
  aiOutput: string;
  nextAction: string;
  latestDecision: string;
  participants: string[];
  updatedAt: string;
}

export interface ConfirmationDistributionItem {
  name: string;
  value: number;
  color: string;
}

export interface TaskTrendData {
  labels: string[];
  taskVolume: number[];
  confirmVolume: number[];
}

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "研发流程 AI 接入率",
    value: "75%",
    note: "需求、评审、测试与确认环节已形成统一入口",
    accent: "#2563eb"
  },
  {
    label: "AI 协作任务",
    value: "128",
    note: "覆盖需求整理、代码分析、测试建议与问题跟踪",
    accent: "#0891b2"
  },
  {
    label: "本周完成协作",
    value: "46",
    note: "包含方案摘要、评审建议、测试结论与复盘沉淀",
    accent: "#7c3aed"
  },
  {
    label: "待人工确认事项",
    value: "12",
    note: "当前集中在上线风险、模型输出复核与发布判断",
    accent: "#f59e0b"
  },
  {
    label: "高风险协作任务",
    value: "5",
    note: "涉及支付链路、权限变更和关键发布窗口",
    accent: "#ea580c"
  },
  {
    label: "效率提升预估",
    value: "32%",
    note: "基于 AI 参与率、等待时长和回归压缩比例综合测算",
    accent: "#16a34a"
  }
];

export const collaborationStages: CollaborationStage[] = [
  {
    title: "需求与设计",
    aiCapability: "需求聚类、设计摘要、验收建议生成",
    status: "方案收敛中",
    pendingCount: 4,
    riskLevel: "中",
    aiCoverage: 72,
    closureRate: 78,
    owner: "产品委员会",
    latestRecord: "AI 已完成客户画像引擎需求拆解，并同步 3 条待确认边界。"
  },
  {
    title: "编码与评审",
    aiCapability: "代码变更解释、差异摘要、风险热点识别",
    status: "重点跟踪",
    pendingCount: 3,
    riskLevel: "高",
    aiCoverage: 81,
    closureRate: 69,
    owner: "交易研发组",
    latestRecord: "支付服务合并请求已生成风险摘要，建议追加一次双人复核。"
  },
  {
    title: "集成测试",
    aiCapability: "失败归因聚类、回归用例推荐、环境异常提示",
    status: "自动运行",
    pendingCount: 2,
    riskLevel: "低",
    aiCoverage: 76,
    closureRate: 86,
    owner: "质量平台",
    latestRecord: "AI 将预发回归失败聚类为网络抖动，并关联 2 条历史问题。"
  },
  {
    title: "内部测试",
    aiCapability: "缺陷去重、发布建议汇总、人工确认提醒",
    status: "发布前确认",
    pendingCount: 3,
    riskLevel: "中",
    aiCoverage: 71,
    closureRate: 74,
    owner: "测试管理组",
    latestRecord: "RC 版本内测结论已汇总，剩余 1 个阻断项待人工确认。"
  }
];

export const collaborationLoop = [
  "业务输入",
  "AI 分析",
  "生成建议",
  "人工确认",
  "DevOps 执行",
  "结果沉淀"
] as const;

export const recentTasks: CollaborationTask[] = [
  {
    id: 1,
    taskName: "统一门户 3.0 需求主题聚类",
    stage: "需求与设计",
    owner: "产品委员会",
    status: "已完成",
    priority: "中",
    aiOutput: "生成 4 个需求主题与优先级建议",
    nextAction: "进入设计评审并冻结一期范围",
    latestDecision: "采纳 AI 给出的主题聚类，补充边界说明后进入下一环节",
    participants: ["产品经理", "架构师", "业务代表"],
    updatedAt: "今天 09:20"
  },
  {
    id: 2,
    taskName: "支付域代码变更风险解释",
    stage: "编码与评审",
    owner: "交易研发组",
    status: "高风险",
    priority: "高",
    aiOutput: "识别权限校验与缓存耦合风险",
    nextAction: "安排双人复核并补充灰度方案",
    latestDecision: "暂不直接合入，等待补充回滚预案与专项测试说明",
    participants: ["后端负责人", "评审人A", "测试负责人"],
    updatedAt: "今天 10:45"
  },
  {
    id: 3,
    taskName: "预发环境自动回归结果归因",
    stage: "集成测试",
    owner: "质量平台",
    status: "进行中",
    priority: "中",
    aiOutput: "已归类 6 条失败用例并给出原因分组",
    nextAction: "定位网络抖动并重跑失败批次",
    latestDecision: "先处理环境类共性问题，再确认是否存在真实功能回归",
    participants: ["测试工程师", "平台运维", "研发接口人"],
    updatedAt: "今天 13:10"
  },
  {
    id: 4,
    taskName: "RC-2026.06 内测结论汇总",
    stage: "内部测试",
    owner: "测试管理组",
    status: "待确认",
    priority: "高",
    aiOutput: "输出版本建议与阻断项确认清单",
    nextAction: "等待业务负责人确认上线窗口",
    latestDecision: "版本整体可推进，但 1 个阻断项需要在发布前完成复测签字",
    participants: ["测试经理", "业务负责人", "发布经理"],
    updatedAt: "今天 15:30"
  },
  {
    id: 5,
    taskName: "发布检查清单自动补全",
    stage: "内部测试",
    owner: "发布经理",
    status: "进行中",
    priority: "低",
    aiOutput: "补全回退预案和观察指标模板",
    nextAction: "补充客服与运维联动联系人",
    latestDecision: "已采纳模板框架，待完善关键电话树和观察阈值",
    participants: ["发布经理", "运维负责人", "客服接口人"],
    updatedAt: "今天 16:05"
  },
  {
    id: 6,
    taskName: "权限策略调整人工确认",
    stage: "编码与评审",
    owner: "平台研发组",
    status: "待确认",
    priority: "高",
    aiOutput: "AI 建议收紧菜单权限并保留管理员兜底策略",
    nextAction: "由安全负责人完成最终确认",
    latestDecision: "策略方向认可，但需补充历史角色影响评估",
    participants: ["安全负责人", "平台研发", "运维接口人"],
    updatedAt: "今天 17:10"
  }
];

export const confirmationDistribution: ConfirmationDistributionItem[] = [
  {
    name: "已确认",
    value: 18,
    color: "#16a34a"
  },
  {
    name: "待确认",
    value: 12,
    color: "#f59e0b"
  },
  {
    name: "退回修订",
    value: 4,
    color: "#ea580c"
  }
];

export const taskTrend: TaskTrendData = {
  labels: ["周一", "周二", "周三", "周四", "周五", "周六"],
  taskVolume: [18, 21, 17, 24, 26, 22],
  confirmVolume: [8, 11, 9, 13, 14, 12]
};

export const executiveSignals = [
  {
    title: "代码评审环节仍是当前风险集中区",
    desc: "高风险协作任务中有 3 项来自编码与评审，建议优先检查支付域与权限域改动。"
  },
  {
    title: "人工确认压力主要出现在发布前判断",
    desc: "待确认事项里有 5 项与版本建议、回退预案和业务影响评估直接相关。"
  },
  {
    title: "AI 结果沉淀开始反哺后续协作",
    desc: "近期复盘与模板沉淀已能为测试建议和发布检查提供复用内容。"
  }
];
