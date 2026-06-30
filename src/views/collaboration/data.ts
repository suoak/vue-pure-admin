export type StageKey =
  | "RequirementsDesign"
  | "CodingReview"
  | "IntegrationTesting"
  | "InternalTesting";

export interface MetricCard {
  label: string;
  value: string;
  accent: string;
  helper: string;
}

export interface ProcessStage {
  title: string;
  summary: string;
  status: string;
  aiRate: string;
  owner: string;
}

export interface ProjectRow {
  project: string;
  phase: string;
  owner: string;
  risk: string;
  progress: number;
}

export interface StageConfig {
  badge: string;
  title: string;
  description: string;
  objective: string;
  theme: [string, string];
  tags: string[];
  stats: Array<{
    label: string;
    value: string;
    helper: string;
  }>;
  aiActions: Array<{
    title: string;
    desc: string;
    owner: string;
  }>;
  workItems: Array<{
    name: string;
    owner: string;
    status: string;
    progress: number;
  }>;
  milestones: Array<{
    time: string;
    title: string;
    desc: string;
    type: "primary" | "success" | "warning";
  }>;
  qualityGates: Array<{
    name: string;
    status: string;
  }>;
  risks: Array<{
    level: "高" | "中" | "低";
    title: string;
    desc: string;
  }>;
}

export const dashboardMetrics: MetricCard[] = [
  {
    label: "协作项目",
    value: "28",
    accent: "#1f6bff",
    helper: "覆盖重点产品线与核心交付主题"
  },
  {
    label: "AI 介入任务",
    value: "146",
    accent: "#12b981",
    helper: "需求整理、代码评审、测试归因全链路可追踪"
  },
  {
    label: "平均评审时长",
    value: "2.6h",
    accent: "#f59e0b",
    helper: "较上周缩短 31%"
  },
  {
    label: "发布就绪度",
    value: "94%",
    accent: "#7c3aed",
    helper: "关键依赖、用例、风险项已同步闭环"
  }
];

export const collaborationStages: ProcessStage[] = [
  {
    title: "需求与设计",
    summary: "AI 聚类需求、输出设计分解与评审摘要",
    status: "节奏稳定",
    aiRate: "88%",
    owner: "产品委员会"
  },
  {
    title: "编码与评审",
    summary: "智能补全、变更解释、风险评审同步推进",
    status: "效率提升",
    aiRate: "91%",
    owner: "研发中心"
  },
  {
    title: "集成测试",
    summary: "流水线自动触发回归、接口契约与环境联调",
    status: "自动运行",
    aiRate: "84%",
    owner: "质量平台"
  },
  {
    title: "内部测试",
    summary: "缺陷闭环、版本验证与发布建议统一收口",
    status: "风险可控",
    aiRate: "79%",
    owner: "测试管理组"
  }
];

export const keyProjects: ProjectRow[] = [
  {
    project: "统一门户 3.0",
    phase: "编码与评审",
    owner: "前端平台组",
    risk: "中",
    progress: 82
  },
  {
    project: "数据中台编排升级",
    phase: "集成测试",
    owner: "数据架构组",
    risk: "低",
    progress: 90
  },
  {
    project: "支付链路稳态改造",
    phase: "内部测试",
    owner: "交易研发组",
    risk: "高",
    progress: 71
  },
  {
    project: "客户画像引擎",
    phase: "需求与设计",
    owner: "智能应用组",
    risk: "中",
    progress: 64
  }
];

export const executiveFocus = [
  "AI 已在需求拆解、代码评审、测试归因三个环节形成闭环记录，支持领导快速追溯。",
  "高风险项目统一进入驾驶舱观察面板，问题归因与责任人同步可见。",
  "协作工作台承接跨角色动作，减少产品、研发、测试之间的信息折返。 "
];

export const loopHighlights = [
  {
    title: "需求到设计",
    value: "1.8 天",
    desc: "从需求入池到设计评审完成的平均周期"
  },
  {
    title: "编码到合入",
    value: "6.4 小时",
    desc: "AI 解释变更后，合入决策更快达成"
  },
  {
    title: "测试到闭环",
    value: "92%",
    desc: "内部测试问题在发布前完成闭环处理"
  }
];

export const stageConfigs: Record<StageKey, StageConfig> = {
  RequirementsDesign: {
    badge: "研发协作环节 01",
    title: "需求与设计",
    description:
      "围绕业务目标统一需求语义、设计拆解与评审结论，让立项、方案、排期在一个工作面板完成同步。",
    objective: "让需求信息一次进入、多人协同、全程可追溯。",
    theme: ["#1f6bff", "#0f9d8f"],
    tags: ["需求聚类", "方案评审", "设计拆解"],
    stats: [
      { label: "待澄清需求", value: "14", helper: "AI 已生成差异点摘要" },
      { label: "方案评审通过率", value: "87%", helper: "本周较上周提升 9%" },
      { label: "需求冻结周期", value: "2.1 天", helper: "平均从立项到冻结" }
    ],
    aiActions: [
      {
        title: "需求自动归并",
        desc: "将来自业务、客户与运营的诉求自动聚类，输出主题、冲突点与优先级建议。",
        owner: "AI 需求助理"
      },
      {
        title: "方案摘要生成",
        desc: "对评审材料提炼核心目标、影响范围与待确认事项，减少会前阅读成本。",
        owner: "产品经理"
      },
      {
        title: "设计决策沉淀",
        desc: "将评审纪要整理为设计约束与后续动作，自动关联到迭代计划。",
        owner: "架构师"
      }
    ],
    workItems: [
      {
        name: "客户画像引擎需求冻结",
        owner: "产品组",
        status: "推进中",
        progress: 68
      },
      {
        name: "统一门户 3.0 方案评审",
        owner: "架构组",
        status: "已排期",
        progress: 52
      },
      {
        name: "支付链路异常分流设计",
        owner: "中台组",
        status: "待确认",
        progress: 36
      }
    ],
    milestones: [
      {
        time: "06-26 10:00",
        title: "需求主题聚类完成",
        desc: "AI 助理生成 4 个核心主题与 7 个冲突点。",
        type: "primary"
      },
      {
        time: "06-26 14:30",
        title: "跨部门设计评审",
        desc: "确认接口边界与关键验收口径。",
        type: "success"
      },
      {
        time: "06-27 09:00",
        title: "冻结范围复核",
        desc: "校准优先级与资源占用。",
        type: "warning"
      }
    ],
    qualityGates: [
      { name: "需求口径一致", status: "已达成" },
      { name: "设计影响评估", status: "已达成" },
      { name: "验收标准明确", status: "观察中" }
    ],
    risks: [
      {
        level: "中",
        title: "跨团队依赖尚未完全锁定",
        desc: "支付与通知链路接口仍需完成最终责任边界确认。"
      },
      {
        level: "低",
        title: "历史需求复用度偏低",
        desc: "部分方案可复用能力仍在整理中，但不影响当前推进。"
      }
    ]
  },
  CodingReview: {
    badge: "研发协作环节 02",
    title: "编码与评审",
    description:
      "把编码、提交、评审、合入压缩到统一协作节奏里，通过 AI 总结变更重点、识别风险区域并辅助达成评审结论。",
    objective: "提升交付速度的同时，把关键变更讲清楚、看明白、合得稳。",
    theme: ["#2563eb", "#8b5cf6"],
    tags: ["智能补全", "变更解释", "评审闭环"],
    stats: [
      { label: "待评审合并请求", value: "9", helper: "3 个高优变更已自动标红" },
      { label: "平均首轮反馈", value: "38 分钟", helper: "高峰期仍保持可控" },
      { label: "AI 解释覆盖率", value: "93%", helper: "核心服务已默认开启" }
    ],
    aiActions: [
      {
        title: "差异摘要",
        desc: "针对合并请求生成变更摘要、影响点和潜在回归面，帮助评审快速进入重点。",
        owner: "AI 评审助手"
      },
      {
        title: "关键风险标记",
        desc: "识别权限、支付、并发、缓存等敏感区域，自动提升审阅等级。",
        owner: "质量负责人"
      },
      {
        title: "知识库联动",
        desc: "关联历史缺陷、设计约束与编码规范，为评审意见提供上下文依据。",
        owner: "研发效能组"
      }
    ],
    workItems: [
      {
        name: "支付域熔断策略合入",
        owner: "交易研发组",
        status: "重点复核",
        progress: 74
      },
      {
        name: "统一门户导航重构",
        owner: "前端平台组",
        status: "推进中",
        progress: 81
      },
      {
        name: "画像引擎规则配置化",
        owner: "智能应用组",
        status: "待确认",
        progress: 47
      }
    ],
    milestones: [
      {
        time: "06-26 11:20",
        title: "高风险变更预警",
        desc: "自动识别权限链路改动并推送给双评审人。",
        type: "warning"
      },
      {
        time: "06-26 16:00",
        title: "代码审阅结论同步",
        desc: "评审意见已回写至任务与知识库。",
        type: "success"
      },
      {
        time: "06-27 09:30",
        title: "合入窗口开启",
        desc: "通过质量门禁的改动按批次进入主干。",
        type: "primary"
      }
    ],
    qualityGates: [
      { name: "编码规范校验", status: "已达成" },
      { name: "关键风险双审", status: "已达成" },
      { name: "回滚预案齐备", status: "观察中" }
    ],
    risks: [
      {
        level: "高",
        title: "支付相关改动耦合较深",
        desc: "建议上线前追加一次跨域联调并保留灰度开关。"
      },
      {
        level: "中",
        title: "历史模块说明不足",
        desc: "个别旧模块缺乏结构说明，AI 已补充初版解读。"
      }
    ]
  },
  IntegrationTesting: {
    badge: "研发协作环节 03",
    title: "集成测试",
    description:
      "把流水线、环境、接口契约和自动回归放进同一观察面板，让问题定位从‘找人’变成‘找证据’。",
    objective: "让每一次联调都有清晰入口、每一次失败都有可复用归因。",
    theme: ["#0f9d8f", "#0f766e"],
    tags: ["流水线观测", "接口契约", "自动回归"],
    stats: [
      { label: "今日流水线触发", value: "26", helper: "其中 22 条已自动完成" },
      { label: "回归通过率", value: "96.4%", helper: "失败场景已自动聚类" },
      { label: "环境健康度", value: "4/5", helper: "仅预发环境待优化" }
    ],
    aiActions: [
      {
        title: "失败归因聚类",
        desc: "按依赖异常、契约不一致、环境抖动等类别自动归类，减少人工排查时间。",
        owner: "AI 测试助理"
      },
      {
        title: "回归清单生成",
        desc: "基于本次变更影响面，自动推荐重点回归用例与环境组合。",
        owner: "测试工程师"
      },
      {
        title: "联调广播",
        desc: "流水线状态、阻塞原因与处理人实时同步给相关团队。",
        owner: "DevOps 平台"
      }
    ],
    workItems: [
      {
        name: "统一门户预发回归",
        owner: "质量平台",
        status: "自动运行",
        progress: 92
      },
      {
        name: "支付链路契约校验",
        owner: "交易测试组",
        status: "重点关注",
        progress: 66
      },
      {
        name: "画像引擎联调冒烟",
        owner: "智能应用组",
        status: "推进中",
        progress: 58
      }
    ],
    milestones: [
      {
        time: "06-26 09:10",
        title: "流水线批量触发",
        desc: "合入后的关键项目自动进入回归队列。",
        type: "primary"
      },
      {
        time: "06-26 13:40",
        title: "失败用例自动聚类",
        desc: "预发环境网络抖动被识别为共性根因。",
        type: "warning"
      },
      {
        time: "06-26 18:00",
        title: "联调结论回写",
        desc: "问题单、接口文档与发布建议已同步更新。",
        type: "success"
      }
    ],
    qualityGates: [
      { name: "自动回归通过", status: "已达成" },
      { name: "关键契约校验", status: "观察中" },
      { name: "环境资源稳定", status: "已达成" }
    ],
    risks: [
      {
        level: "中",
        title: "预发环境存在瞬时抖动",
        desc: "已安排基础设施团队优化资源抢占策略。"
      },
      {
        level: "低",
        title: "少量接口说明未及时同步",
        desc: "AI 已识别差异，待开发负责人确认后自动回写。"
      }
    ]
  },
  InternalTesting: {
    badge: "研发协作环节 04",
    title: "内部测试",
    description:
      "面向上线前验证，统一查看版本建议、缺陷闭环、回归结论和发布风险，确保最终决策基于同一事实面板。",
    objective: "让内测问题及时收敛，让发布建议更有把握。",
    theme: ["#f97316", "#ea580c"],
    tags: ["缺陷收敛", "版本建议", "发布把关"],
    stats: [
      { label: "待关闭缺陷", value: "11", helper: "其中 2 个为发布阻断项" },
      {
        label: "版本可发布建议",
        value: "1/1",
        helper: "RC-2026.06 建议按计划推进"
      },
      { label: "业务验证完成度", value: "89%", helper: "高优场景已覆盖" }
    ],
    aiActions: [
      {
        title: "缺陷重复识别",
        desc: "自动识别重复问题与相似根因，减少多轮沟通与重复登记。",
        owner: "AI 缺陷助理"
      },
      {
        title: "发布风险摘要",
        desc: "按业务影响、技术影响、回退复杂度生成简明结论，方便决策层快速研判。",
        owner: "测试负责人"
      },
      {
        title: "场景覆盖提示",
        desc: "识别尚未覆盖的关键业务路径，提醒补测与复测安排。",
        owner: "发布经理"
      }
    ],
    workItems: [
      {
        name: "RC-2026.06 版本验收",
        owner: "测试管理组",
        status: "推进中",
        progress: 88
      },
      {
        name: "支付链路灰度验证",
        owner: "交易测试组",
        status: "阻断跟踪",
        progress: 63
      },
      {
        name: "运营后台体验巡检",
        owner: "业务验证组",
        status: "已排期",
        progress: 54
      }
    ],
    milestones: [
      {
        time: "06-26 10:30",
        title: "内测问题复盘",
        desc: "归并重复缺陷并明确剩余阻断项。",
        type: "warning"
      },
      {
        time: "06-26 15:00",
        title: "版本建议评审",
        desc: "形成上线建议、回退条件与观察指标。",
        type: "primary"
      },
      {
        time: "06-26 19:00",
        title: "发布决策同步",
        desc: "向业务、运维与客服统一广播版本结论。",
        type: "success"
      }
    ],
    qualityGates: [
      { name: "阻断缺陷清零", status: "观察中" },
      { name: "高优场景覆盖", status: "已达成" },
      { name: "上线预案确认", status: "已达成" }
    ],
    risks: [
      {
        level: "高",
        title: "支付链路仍有 1 个阻断问题待复测",
        desc: "建议与交易研发组共同安排今晚的专项验证窗口。"
      },
      {
        level: "中",
        title: "部分业务验证依赖线下确认",
        desc: "需业务方补充最终核验结论后再做发布确认。"
      }
    ]
  }
};
