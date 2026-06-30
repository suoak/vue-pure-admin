export type RequirementRiskLevel = "高" | "中" | "低";

export interface RequirementRecord {
  id: number;
  requirementName: string;
  source: string;
  project: string;
  currentStatus: "待评审" | "AI 分析中" | "设计评审中" | "推进中" | "已确认";
  aiAnalysisStatus: "未开始" | "分析中" | "待确认" | "已完成";
  designReviewStatus: "未提交" | "评审中" | "待确认" | "已通过";
  riskLevel: RequirementRiskLevel;
  owner: string;
  updatedAt: string;
  progress: number;
  latestUpdate: string;
}

export interface RequirementAnalysisRecord {
  requirementId: number;
  summary: string;
  involvedSystems: string[];
  coreFeatures: string[];
  boundaryScenarios: string[];
  acceptanceCriteria: string[];
  testFocus: string[];
  designNotes: string[];
  potentialRisks: string[];
  nextSteps: string[];
  impactScope: Array<{
    area: string;
    level: RequirementRiskLevel;
    description: string;
  }>;
}

export interface DesignReviewRecord {
  id: number;
  reviewTopic: string;
  relatedRequirement: string;
  reviewStatus: "待评审" | "评审中" | "待确认" | "已通过";
  reviewer: string;
  aiConclusion: string;
  pendingItems: number;
  reviewTime: string;
  checklist: Array<{
    item: string;
    status: "通过" | "待确认" | "需补充";
    note: string;
  }>;
  opinions: string[];
  conclusion: string;
}

export interface RequirementRiskRecord {
  id: number;
  riskName: string;
  relatedRequirement: string;
  riskLevel: RequirementRiskLevel;
  riskType: "范围风险" | "依赖风险" | "体验风险" | "数据风险" | "合规风险";
  aiSuggestion: string;
  handler: string;
  currentStatus: "待处理" | "处理中" | "待确认" | "已缓解";
  trend: "上升" | "稳定" | "下降";
  updatedAt: string;
}

export const requirementRecords: RequirementRecord[] = [
  {
    id: 1,
    requirementName: "客户画像引擎标签规则升级",
    source: "业务运营部",
    project: "客户画像引擎",
    currentStatus: "设计评审中",
    aiAnalysisStatus: "已完成",
    designReviewStatus: "评审中",
    riskLevel: "高",
    owner: "李佳",
    updatedAt: "06-29 10:20",
    progress: 68,
    latestUpdate: "AI 已完成冲突标签识别，架构组正在确认标签扩展边界。"
  },
  {
    id: 2,
    requirementName: "统一门户角色权限精细化",
    source: "产品委员会",
    project: "统一门户 3.0",
    currentStatus: "待评审",
    aiAnalysisStatus: "待确认",
    designReviewStatus: "未提交",
    riskLevel: "中",
    owner: "周明",
    updatedAt: "06-29 09:40",
    progress: 42,
    latestUpdate: "AI 输出权限矩阵差异，等待业务负责人确认角色边界。"
  },
  {
    id: 3,
    requirementName: "支付异常分流与补偿提醒",
    source: "交易中台",
    project: "支付链路稳态改造",
    currentStatus: "AI 分析中",
    aiAnalysisStatus: "分析中",
    designReviewStatus: "未提交",
    riskLevel: "高",
    owner: "陈思",
    updatedAt: "06-28 18:30",
    progress: 35,
    latestUpdate: "AI 正在补全异常场景清单，已发现账务回写边界待确认。"
  },
  {
    id: 4,
    requirementName: "运营后台批量配置审批",
    source: "运营管理部",
    project: "运营后台体验提升",
    currentStatus: "推进中",
    aiAnalysisStatus: "已完成",
    designReviewStatus: "已通过",
    riskLevel: "低",
    owner: "王悦",
    updatedAt: "06-28 15:10",
    progress: 82,
    latestUpdate: "评审结论已通过，需求已同步到开发任务拆分。"
  },
  {
    id: 5,
    requirementName: "内部测试反馈自动归类",
    source: "测试管理组",
    project: "质量协作平台",
    currentStatus: "已确认",
    aiAnalysisStatus: "已完成",
    designReviewStatus: "已通过",
    riskLevel: "低",
    owner: "赵宁",
    updatedAt: "06-27 17:45",
    progress: 100,
    latestUpdate: "验收口径和设计约束均已沉淀，可进入后续研发协作环节。"
  }
];

export const requirementAnalysisRecords: RequirementAnalysisRecord[] = [
  {
    requirementId: 1,
    summary:
      "围绕客户分层、标签权重和实时刷新能力升级画像引擎，目标是提升运营触达精准度并减少人工规则维护成本。",
    involvedSystems: [
      "画像规则中心",
      "客户标签服务",
      "运营触达平台",
      "数据同步任务"
    ],
    coreFeatures: [
      "支持多维标签规则组合与优先级配置",
      "提供标签命中原因解释和样本回溯",
      "支持规则发布前影响人数预估",
      "支持灰度发布和异常规则回滚"
    ],
    boundaryScenarios: [
      "标签冲突时以业务优先级和生效时间共同判定",
      "离线标签延迟超过阈值时必须提示人工确认",
      "规则灰度期间不影响既有客户触达任务",
      "历史标签结果需要保留可追溯记录"
    ],
    acceptanceCriteria: [
      "规则配置后 5 分钟内完成影响范围预估",
      "核心标签命中解释覆盖率不低于 95%",
      "灰度规则可按客户分组回滚且不影响正式规则",
      "关键操作具备审计记录和人工确认结论"
    ],
    testFocus: [
      "标签冲突、空值、重复命中等边界场景",
      "规则发布与回滚链路一致性",
      "大批量客户预估性能与超时提示",
      "运营触达平台读取标签结果的兼容性"
    ],
    designNotes: [
      "标签规则需拆分为配置层、计算层和解释层",
      "规则发布需要保留版本号，便于灰度和回滚",
      "高影响范围规则必须进入人工确认队列"
    ],
    potentialRisks: [
      "标签冲突处理口径未完全统一",
      "离线数据延迟会影响实时规则判断",
      "高影响规则缺少人工确认可能带来误触达"
    ],
    nextSteps: [
      "产品负责人确认标签冲突优先级",
      "架构组补充规则版本与回滚设计",
      "测试组基于 AI 输出生成验收用例初稿"
    ],
    impactScope: [
      {
        area: "业务运营",
        level: "高",
        description: "直接影响客户触达策略、活动分组和运营效果评估。"
      },
      {
        area: "数据服务",
        level: "中",
        description: "需要保证离线标签与实时标签同步口径一致。"
      },
      {
        area: "质量验证",
        level: "中",
        description: "需要新增规则冲突、灰度回滚和审计链路用例。"
      }
    ]
  },
  {
    requirementId: 2,
    summary:
      "对统一门户角色权限进行精细化拆分，支撑不同研发、测试和管理角色按职责访问协作数据。",
    involvedSystems: ["统一门户", "权限中心", "组织架构服务", "审计日志"],
    coreFeatures: [
      "按角色、项目和研发协作环节配置访问范围",
      "提供权限变更前后差异比对",
      "支持高敏权限双人确认",
      "保留权限变更审计记录"
    ],
    boundaryScenarios: [
      "跨项目角色兼任时按最小必要权限展示",
      "临时授权到期后自动回收",
      "高敏菜单授权必须有人工确认记录"
    ],
    acceptanceCriteria: [
      "权限变更差异可被业务负责人确认",
      "高敏权限必须触发双人确认",
      "审计日志可追溯到操作人、确认人和变更原因"
    ],
    testFocus: [
      "角色组合权限",
      "临时授权回收",
      "高敏菜单访问",
      "审计日志完整性"
    ],
    designNotes: [
      "权限策略应保持配置化，避免散落在页面逻辑中",
      "管理端与移动端需共用同一套权限判断口径"
    ],
    potentialRisks: [
      "旧角色边界不清晰",
      "临时授权回收遗漏",
      "权限矩阵确认周期偏长"
    ],
    nextSteps: [
      "业务负责人确认角色清单",
      "安全负责人确认高敏菜单范围",
      "研发补齐权限矩阵设计"
    ],
    impactScope: [
      {
        area: "门户导航",
        level: "中",
        description: "影响菜单展示、页面访问和操作按钮权限。"
      },
      {
        area: "审计合规",
        level: "高",
        description: "高敏权限需要形成可追溯的确认记录。"
      }
    ]
  },
  {
    requirementId: 3,
    summary:
      "为支付异常链路补充分流、提醒和补偿能力，降低异常订单人工排查成本并提升交易状态一致性。",
    involvedSystems: ["支付网关", "账务服务", "通知中心", "交易监控"],
    coreFeatures: [
      "异常订单自动分流",
      "补偿任务提醒",
      "状态回写监控",
      "人工处置记录沉淀"
    ],
    boundaryScenarios: [
      "第三方支付超时",
      "账务回写失败",
      "通知重复触发",
      "补偿任务超过时限"
    ],
    acceptanceCriteria: [
      "异常订单可按原因自动进入对应处置队列",
      "补偿任务超时必须触发提醒",
      "交易状态最终一致性校验通过率达到目标阈值"
    ],
    testFocus: ["支付超时", "重复回调", "账务补偿", "监控告警联动"],
    designNotes: [
      "分流策略需与监控告警打通",
      "补偿任务需要幂等设计",
      "人工处置记录需进入审计链路"
    ],
    potentialRisks: [
      "下游回调口径不一致",
      "补偿幂等设计不足",
      "异常告警噪声过高"
    ],
    nextSteps: ["补齐账务回写边界", "确认补偿重试策略", "组织跨团队设计评审"],
    impactScope: [
      {
        area: "交易稳定性",
        level: "高",
        description: "影响支付状态一致性和异常订单处理时效。"
      },
      {
        area: "运维监控",
        level: "中",
        description: "需要新增分流与补偿相关告警策略。"
      }
    ]
  }
];

export const designReviewRecords: DesignReviewRecord[] = [
  {
    id: 1,
    reviewTopic: "画像规则版本与回滚设计评审",
    relatedRequirement: "客户画像引擎标签规则升级",
    reviewStatus: "评审中",
    reviewer: "架构委员会",
    aiConclusion: "AI 建议补充规则版本隔离和高影响规则人工确认机制。",
    pendingItems: 2,
    reviewTime: "06-29 15:00",
    checklist: [
      {
        item: "影响范围是否完整",
        status: "通过",
        note: "覆盖运营、数据与质量验证。"
      },
      {
        item: "回滚方案是否明确",
        status: "需补充",
        note: "需补充规则版本回退路径。"
      },
      {
        item: "人工确认是否闭环",
        status: "待确认",
        note: "高影响规则确认人待指定。"
      }
    ],
    opinions: [
      "规则版本需要与发布批次绑定。",
      "影响人数超过阈值时必须进入人工确认。"
    ],
    conclusion: "主方案可推进，待补充回滚细节和确认人后进入设计冻结。"
  },
  {
    id: 2,
    reviewTopic: "统一门户权限矩阵评审",
    relatedRequirement: "统一门户角色权限精细化",
    reviewStatus: "待确认",
    reviewer: "安全负责人",
    aiConclusion: "AI 识别 4 个高敏菜单与 2 类临时授权场景需要双人确认。",
    pendingItems: 3,
    reviewTime: "06-29 16:30",
    checklist: [
      {
        item: "角色范围是否清晰",
        status: "待确认",
        note: "业务负责人需确认兼任角色边界。"
      },
      {
        item: "审计记录是否完整",
        status: "通过",
        note: "已覆盖操作人、确认人与原因。"
      },
      {
        item: "临时授权是否可回收",
        status: "需补充",
        note: "需补充自动回收失败兜底。"
      }
    ],
    opinions: ["建议先冻结高敏菜单清单。", "临时授权需要在页面展示到期时间。"],
    conclusion: "权限矩阵需要业务与安全共同确认后再进入开发拆分。"
  },
  {
    id: 3,
    reviewTopic: "支付异常补偿链路评审",
    relatedRequirement: "支付异常分流与补偿提醒",
    reviewStatus: "待评审",
    reviewer: "交易架构组",
    aiConclusion: "AI 已标注账务回写和通知重复触发两个高风险边界。",
    pendingItems: 4,
    reviewTime: "06-30 10:00",
    checklist: [
      {
        item: "补偿幂等是否明确",
        status: "待确认",
        note: "需要研发补充处理策略。"
      },
      {
        item: "监控告警是否覆盖",
        status: "需补充",
        note: "需新增异常分流告警。"
      },
      {
        item: "人工处置是否留痕",
        status: "待确认",
        note: "审计字段尚未最终确认。"
      }
    ],
    opinions: ["先确认账务回写边界。", "补偿提醒不要直接触发重复通知。"],
    conclusion: "等待跨团队评审，当前不建议直接冻结设计。"
  }
];

export const requirementRiskRecords: RequirementRiskRecord[] = [
  {
    id: 1,
    riskName: "标签冲突口径未冻结",
    relatedRequirement: "客户画像引擎标签规则升级",
    riskLevel: "高",
    riskType: "范围风险",
    aiSuggestion: "先冻结核心标签优先级，扩展标签进入下一轮需求池。",
    handler: "李佳",
    currentStatus: "处理中",
    trend: "上升",
    updatedAt: "06-29 10:20"
  },
  {
    id: 2,
    riskName: "高敏权限确认周期偏长",
    relatedRequirement: "统一门户角色权限精细化",
    riskLevel: "中",
    riskType: "合规风险",
    aiSuggestion: "拆分普通权限与高敏权限评审，先确认不阻塞的基础范围。",
    handler: "周明",
    currentStatus: "待确认",
    trend: "稳定",
    updatedAt: "06-29 09:40"
  },
  {
    id: 3,
    riskName: "账务回写边界不清晰",
    relatedRequirement: "支付异常分流与补偿提醒",
    riskLevel: "高",
    riskType: "依赖风险",
    aiSuggestion: "组织交易、账务、通知三方确认状态流转和重试边界。",
    handler: "陈思",
    currentStatus: "待处理",
    trend: "上升",
    updatedAt: "06-28 18:30"
  },
  {
    id: 4,
    riskName: "批量配置误操作影响范围扩大",
    relatedRequirement: "运营后台批量配置审批",
    riskLevel: "低",
    riskType: "体验风险",
    aiSuggestion: "保留二次确认、批量预览和撤销入口，降低误操作风险。",
    handler: "王悦",
    currentStatus: "已缓解",
    trend: "下降",
    updatedAt: "06-28 15:10"
  },
  {
    id: 5,
    riskName: "反馈归类训练样本不足",
    relatedRequirement: "内部测试反馈自动归类",
    riskLevel: "中",
    riskType: "数据风险",
    aiSuggestion: "先引入历史问题库样本，再通过人工确认持续校准分类结果。",
    handler: "赵宁",
    currentStatus: "处理中",
    trend: "稳定",
    updatedAt: "06-27 17:45"
  }
];

export const requirementUpdates = [
  "06-29 10:20 客户画像标签冲突点已完成 AI 聚类，等待架构确认冻结范围。",
  "06-29 09:40 统一门户权限矩阵已生成差异视图，业务负责人待确认。",
  "06-28 18:30 支付异常分流新增账务回写风险，已进入跨团队待办。",
  "06-28 15:10 运营后台批量配置审批设计评审通过，进入开发拆分。"
];

export const riskTrendData = [
  { day: "周一", high: 2, medium: 4, low: 3 },
  { day: "周二", high: 2, medium: 3, low: 4 },
  { day: "周三", high: 3, medium: 3, low: 3 },
  { day: "周四", high: 3, medium: 2, low: 4 },
  { day: "周五", high: 2, medium: 3, low: 5 }
];

export function tagType(value: string) {
  if (["高", "待处理", "需补充", "上升"].includes(value)) return "danger";
  if (
    ["中", "待评审", "AI 分析中", "待确认", "处理中", "稳定"].includes(value)
  ) {
    return "warning";
  }
  if (
    [
      "低",
      "已确认",
      "已完成",
      "已通过",
      "通过",
      "已缓解",
      "下降",
      "推进中"
    ].includes(value)
  ) {
    return "success";
  }
  return "primary";
}
