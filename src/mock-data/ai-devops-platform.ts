export type ProcessStageName =
  | "需求与设计"
  | "编码与评审"
  | "集成测试"
  | "内部测试";

export interface ProcessAccessStatus {
  accessPhase: "已接入" | "试运行" | "规划中";
  accessState: string;
  accessRate: string;
  owner: string;
  lastSync: string;
  summary: string;
  connectedSystems: string[];
}

export interface ProcessAiCapability {
  name: string;
  description: string;
  owner: string;
  value: string;
}

export interface ProcessTaskRecord {
  id: number;
  taskName: string;
  owner: string;
  status: "进行中" | "待确认" | "已完成" | "高风险";
  priority: "高" | "中" | "低";
  aiOutput: string;
  updatedAt: string;
  analysis: string;
  nextAction: string;
}

export interface ProcessRiskRecord {
  title: string;
  level: "高" | "中" | "低";
  description: string;
  todo: string;
  owner: string;
}

export interface ProcessAiGeneratedContent {
  id: number;
  title: string;
  contentType: "需求摘要" | "设计建议" | "代码解释" | "测试建议" | "发布结论";
  summary: string;
  outputBy: string;
  generatedAt: string;
  adoptionStatus: string;
}

export interface ProcessManualReviewRecord {
  id: number;
  reviewTopic: string;
  reviewer: string;
  decision: "通过" | "补充说明" | "退回修订";
  reviewAt: string;
  comment: string;
}

export interface ProcessDevOpsStatus {
  projectName: string;
  repoStatus: string;
  pipelineStatus: string;
  testStatus: string;
  releaseReadiness: string;
  riskSummary: string;
}

export interface PlatformProcessMock {
  title: ProcessStageName;
  description: string;
  accessStatus: ProcessAccessStatus;
  aiCapabilities: ProcessAiCapability[];
  taskList: ProcessTaskRecord[];
  riskList: ProcessRiskRecord[];
  aiGeneratedContents: ProcessAiGeneratedContent[];
  manualReviewRecords: ProcessManualReviewRecord[];
  devOpsStatus: ProcessDevOpsStatus;
}

export const aiDevopsPlatformMockData: Record<
  ProcessStageName,
  PlatformProcessMock
> = {
  需求与设计: {
    title: "需求与设计",
    description:
      "围绕业务目标统一需求语义、设计拆解与评审结论，让需求冻结、方案确认和后续排期在同一协作面板完成同步。",
    accessStatus: {
      accessPhase: "已接入",
      accessState: "已进入稳定协作",
      accessRate: "82%",
      owner: "产品委员会",
      lastSync: "06-26 14:20",
      summary:
        "AI 已覆盖需求聚类、方案摘要和评审纪要沉淀，重点需求可在一次协作中完成跨角色对齐。",
      connectedSystems: ["需求池", "设计评审", "任务排期", "知识沉淀"]
    },
    aiCapabilities: [
      {
        name: "需求主题聚类",
        description:
          "将业务、客户与运营诉求自动归并成统一主题，并识别冲突点与优先级建议。",
        owner: "AI 需求助理",
        value: "14 组"
      },
      {
        name: "方案摘要生成",
        description:
          "自动提炼设计目标、影响范围和待确认事项，降低会前阅读成本。",
        owner: "产品经理",
        value: "6 份"
      },
      {
        name: "验收口径建议",
        description:
          "结合历史版本和业务规则生成验收标准初稿，方便研发与测试同步。",
        owner: "架构师",
        value: "9 条"
      }
    ],
    taskList: [
      {
        id: 1,
        taskName: "客户画像引擎需求冻结",
        owner: "产品组",
        status: "进行中",
        priority: "高",
        aiOutput: "已生成冲突需求摘要与冻结建议。",
        updatedAt: "06-26",
        analysis:
          "AI 识别到画像规则与标签口径存在两处冲突，建议先冻结主链路能力，再将扩展标签纳入下一轮迭代。",
        nextAction: "安排产品、架构、数据团队在今日评审会确认冻结范围。"
      },
      {
        id: 2,
        taskName: "统一门户 3.0 方案评审",
        owner: "架构组",
        status: "待确认",
        priority: "中",
        aiOutput: "已输出评审纪要和设计约束列表。",
        updatedAt: "06-25",
        analysis:
          "当前方案已满足核心目标，但导航权限拆分仍需业务方补充最终边界说明。",
        nextAction: "由业务负责人确认权限边界后回写设计结论。"
      },
      {
        id: 3,
        taskName: "支付链路异常分流设计",
        owner: "中台组",
        status: "高风险",
        priority: "高",
        aiOutput: "已生成异常分流路径与影响分析。",
        updatedAt: "06-24",
        analysis:
          "支付异常处理涉及通知、账务、监控三个下游系统，当前设计对回退路径描述不足。",
        nextAction: "补充回退预案并在本周内完成跨团队评审。"
      }
    ],
    riskList: [
      {
        title: "跨团队依赖边界未完全锁定",
        level: "高",
        description:
          "支付与通知链路仍有接口责任边界待确认，可能影响设计冻结节奏。",
        todo: "今日完成依赖边界会签并沉淀统一结论。",
        owner: "架构负责人"
      },
      {
        title: "历史方案复用不足",
        level: "中",
        description: "相似业务场景的设计资产尚未完全复用，增加了重复评审成本。",
        todo: "从复盘库补充两份高复用设计模板。",
        owner: "知识库管理员"
      }
    ],
    aiGeneratedContents: [
      {
        id: 1,
        title: "客户画像需求主题摘要",
        contentType: "需求摘要",
        summary: "归纳出 4 个业务主题、7 个冲突点和 3 条优先级调整建议。",
        outputBy: "AI 需求助理",
        generatedAt: "06-26 10:30",
        adoptionStatus: "已纳入评审输入材料"
      },
      {
        id: 2,
        title: "统一门户方案评审结论草稿",
        contentType: "设计建议",
        summary: "提炼接口边界、权限约束和后续动作，减少人工整理纪要时间。",
        outputBy: "AI 方案摘要助手",
        generatedAt: "06-26 16:50",
        adoptionStatus: "待业务方确认最终边界"
      }
    ],
    manualReviewRecords: [
      {
        id: 1,
        reviewTopic: "客户画像需求冻结范围确认",
        reviewer: "产品负责人",
        decision: "补充说明",
        reviewAt: "06-26 13:40",
        comment: "要求补充标签体系扩展能力的下一轮排期说明。"
      },
      {
        id: 2,
        reviewTopic: "统一门户设计评审纪要确认",
        reviewer: "架构委员会",
        decision: "通过",
        reviewAt: "06-26 17:20",
        comment: "主链路设计结论通过，权限细项待后续补充说明。"
      }
    ],
    devOpsStatus: {
      projectName: "客户画像引擎",
      repoStatus: "需求相关文档与原型已同步主仓",
      pipelineStatus: "设计评审后待进入开发排期",
      testStatus: "验收口径已形成初版，测试暂未启动",
      releaseReadiness: "当前阶段以需求冻结为主，尚未进入发布检查",
      riskSummary: "主要风险在于跨团队接口边界与需求冻结节奏。"
    }
  },
  编码与评审: {
    title: "编码与评审",
    description:
      "围绕代码变更、评审意见和主干合入节奏，统一查看 AI 解释结果、风险识别和人工确认动作。",
    accessStatus: {
      accessPhase: "已接入",
      accessState: "已深度接入日常研发",
      accessRate: "91%",
      owner: "研发中心",
      lastSync: "06-26 15:10",
      summary:
        "AI 已参与变更摘要、敏感代码识别和评审依据引用，高风险提交默认进入重点观察队列。",
      connectedSystems: ["代码仓库", "合并请求", "评审规则", "规范库"]
    },
    aiCapabilities: [
      {
        name: "变更差异摘要",
        description: "对提交内容自动生成核心改动说明、影响面和回滚关注点。",
        owner: "AI 评审助手",
        value: "93%"
      },
      {
        name: "敏感区域识别",
        description: "自动识别权限、支付、缓存等关键区域并提升评审等级。",
        owner: "质量负责人",
        value: "12 次"
      },
      {
        name: "规范联动引用",
        description: "在评审时自动关联既有规范、历史缺陷与设计约束。",
        owner: "研发效能组",
        value: "26 条"
      }
    ],
    taskList: [
      {
        id: 1,
        taskName: "支付域熔断策略合入",
        owner: "交易研发组",
        status: "高风险",
        priority: "高",
        aiOutput: "已识别支付回退逻辑和异常告警路径变更。",
        updatedAt: "06-26",
        analysis:
          "AI 判断本次改动同时影响同步调用和异步补偿逻辑，建议由双评审人完成专项复核。",
        nextAction: "今晚完成联调后再进入主干合入窗口。"
      },
      {
        id: 2,
        taskName: "统一门户导航重构",
        owner: "前端平台组",
        status: "进行中",
        priority: "中",
        aiOutput: "已输出模块拆分说明和路由影响分析。",
        updatedAt: "06-26",
        analysis:
          "导航改造总体风险可控，但个别权限菜单仍引用旧配置，AI 已自动标注待修正位置。",
        nextAction: "补齐菜单权限映射后发起第二轮评审。"
      },
      {
        id: 3,
        taskName: "权限策略调整人工确认",
        owner: "平台研发组",
        status: "待确认",
        priority: "高",
        aiOutput: "已生成权限矩阵差异和影响用户范围。",
        updatedAt: "06-25",
        analysis:
          "权限矩阵涉及管理端多个高敏菜单，AI 建议由平台管理员和安全负责人共同确认后再发布。",
        nextAction: "组织人工确认会，形成最终权限变更结论。"
      }
    ],
    riskList: [
      {
        title: "高敏变更耦合较深",
        level: "高",
        description: "支付域与权限域改动均穿透多个模块，回滚复杂度较高。",
        todo: "增加一次跨团队专项评审并明确灰度范围。",
        owner: "研发经理"
      },
      {
        title: "历史模块说明缺口",
        level: "中",
        description: "旧模块结构文档不完整，部分评审意见依赖口头解释。",
        todo: "将 AI 生成的模块说明沉淀进研发规范库。",
        owner: "架构师"
      }
    ],
    aiGeneratedContents: [
      {
        id: 1,
        title: "支付域代码影响解释",
        contentType: "代码解释",
        summary:
          "解释熔断、补偿与灰度开关三条关键逻辑变更，提示双评审和回退关注点。",
        outputBy: "AI 评审助手",
        generatedAt: "06-26 17:40",
        adoptionStatus: "已进入评审依据"
      },
      {
        id: 2,
        title: "导航权限改造影响分析",
        contentType: "代码解释",
        summary: "识别出 5 个菜单权限映射变更点和 2 个高敏入口。",
        outputBy: "AI 权限分析助手",
        generatedAt: "06-25 18:10",
        adoptionStatus: "待平台管理员确认"
      }
    ],
    manualReviewRecords: [
      {
        id: 1,
        reviewTopic: "支付域高风险代码变更复核",
        reviewer: "高级研发评审组",
        decision: "补充说明",
        reviewAt: "06-26 18:00",
        comment: "需补充异步补偿异常场景的回滚说明。"
      },
      {
        id: 2,
        reviewTopic: "权限矩阵变更确认",
        reviewer: "平台管理员",
        decision: "退回修订",
        reviewAt: "06-25 18:30",
        comment: "要求增加系统管理高敏菜单的双人确认逻辑。"
      }
    ],
    devOpsStatus: {
      projectName: "统一门户 3.0",
      repoStatus: "主仓与分支策略运行正常",
      pipelineStatus: "主干前检查已开启，高敏合入需专项放行",
      testStatus: "关键变更将在合入后自动进入预发回归",
      releaseReadiness: "当前以合入质量控制为主，尚未进入最终发布核查",
      riskSummary: "主要风险集中在支付域与权限域的高敏改动。"
    }
  },
  集成测试: {
    title: "集成测试",
    description:
      "围绕流水线、环境和接口契约，集中展示 AI 归因结果、回归状态与待处理联调事项。",
    accessStatus: {
      accessPhase: "试运行",
      accessState: "自动化协作运行中",
      accessRate: "86%",
      owner: "质量平台",
      lastSync: "06-26 16:00",
      summary:
        "AI 已参与流水线失败聚类、回归清单推荐和联调阻塞同步，帮助测试团队更快定位问题来源。",
      connectedSystems: ["CI 流水线", "测试环境", "接口契约", "缺陷系统"]
    },
    aiCapabilities: [
      {
        name: "失败归因聚类",
        description: "自动按环境抖动、契约不一致和依赖失败等类型归并问题。",
        owner: "AI 测试助理",
        value: "18 次"
      },
      {
        name: "回归清单推荐",
        description: "根据变更影响面自动推荐重点回归用例和环境组合。",
        owner: "测试工程师",
        value: "22 套"
      },
      {
        name: "联调广播同步",
        description: "在流水线阻塞时自动通知研发、测试和运维角色。",
        owner: "DevOps 平台",
        value: "实时"
      }
    ],
    taskList: [
      {
        id: 1,
        taskName: "统一门户预发回归",
        owner: "质量平台",
        status: "进行中",
        priority: "中",
        aiOutput: "已生成预发回归结论与失败重跑建议。",
        updatedAt: "06-26",
        analysis:
          "大部分用例已通过，失败样本主要集中在预发缓存失效场景，AI 建议优先检查环境配置一致性。",
        nextAction: "由运维与测试联合核对缓存配置并重跑失败集。"
      },
      {
        id: 2,
        taskName: "支付链路契约校验",
        owner: "交易测试组",
        status: "高风险",
        priority: "高",
        aiOutput: "已识别三处请求字段与文档口径不一致。",
        updatedAt: "06-25",
        analysis:
          "支付确认接口存在契约字段偏差，若不修正会影响后续回归稳定性。",
        nextAction: "开发负责人今日修正文档并同步更新接口 mock。"
      },
      {
        id: 3,
        taskName: "画像引擎联调冒烟",
        owner: "智能应用组",
        status: "待确认",
        priority: "中",
        aiOutput: "已生成联调通过项与待确认场景。",
        updatedAt: "06-24",
        analysis:
          "AI 发现画像规则切换场景依赖最新配置中心数据，当前仍缺一次业务确认才能进入批量回归。",
        nextAction: "请业务方确认规则切换口径后再触发全量冒烟。"
      }
    ],
    riskList: [
      {
        title: "预发环境存在瞬时抖动",
        level: "中",
        description: "部分失败并非代码问题，而是环境资源抢占导致的瞬时超时。",
        todo: "今晚前完成资源配额优化并验证稳定性。",
        owner: "基础设施团队"
      },
      {
        title: "关键契约未完全收敛",
        level: "高",
        description:
          "支付相关接口仍存在字段口径差异，可能导致后续验证反复失败。",
        todo: "先收敛契约文档，再重新触发关键回归批次。",
        owner: "交易测试负责人"
      }
    ],
    aiGeneratedContents: [
      {
        id: 1,
        title: "预发失败归因总结",
        contentType: "测试建议",
        summary: "将失败样本归纳为环境抖动与契约偏差两类，并给出优先排查顺序。",
        outputBy: "AI 测试助理",
        generatedAt: "06-26 16:45",
        adoptionStatus: "待测试与运维联合确认"
      },
      {
        id: 2,
        title: "画像引擎联调冒烟建议",
        contentType: "测试建议",
        summary: "建议优先覆盖规则切换、配置拉取和结果校验三类关键场景。",
        outputBy: "AI 联调助理",
        generatedAt: "06-26 15:55",
        adoptionStatus: "待业务配置确认"
      }
    ],
    manualReviewRecords: [
      {
        id: 1,
        reviewTopic: "预发失败主因判定",
        reviewer: "测试负责人",
        decision: "补充说明",
        reviewAt: "06-26 17:10",
        comment: "需运维补充资源监控截图，确认环境因素是否为主因。"
      },
      {
        id: 2,
        reviewTopic: "支付接口契约差异复核",
        reviewer: "交易测试负责人",
        decision: "通过",
        reviewAt: "06-25 19:00",
        comment: "确认字段口径差异属真实问题，已转开发修正。"
      }
    ],
    devOpsStatus: {
      projectName: "支付链路稳态改造",
      repoStatus: "代码与契约文档已同步，但文档口径需更新",
      pipelineStatus: "预发验证批次运行中，关键契约检查阻塞 1 条",
      testStatus: "自动回归通过率 96.4%，关键失败已进入专项排查",
      releaseReadiness: "未满足发布前联调完成条件，需先收敛契约问题",
      riskSummary: "当前主要风险在于支付接口契约偏差与预发环境抖动。"
    }
  },
  内部测试: {
    title: "内部测试",
    description:
      "围绕版本验证、问题闭环和发布建议，统一查看 AI 风险总结、人工确认结论和上线前待办。",
    accessStatus: {
      accessPhase: "试运行",
      accessState: "发布前集中收口中",
      accessRate: "79%",
      owner: "测试管理组",
      lastSync: "06-26 17:15",
      summary:
        "AI 已辅助完成缺陷重复识别、发布风险摘要和业务覆盖提示，关键版本建议可在当前工作台统一收口。",
      connectedSystems: ["缺陷系统", "版本建议", "发布检查", "审计记录"]
    },
    aiCapabilities: [
      {
        name: "缺陷重复识别",
        description: "自动识别重复缺陷和相似根因，减少多轮登记与沟通成本。",
        owner: "AI 缺陷助理",
        value: "11 项"
      },
      {
        name: "发布风险摘要",
        description: "按业务影响、技术影响和回退复杂度输出简明风险结论。",
        owner: "测试负责人",
        value: "1 版"
      },
      {
        name: "场景覆盖提示",
        description: "识别尚未覆盖的关键业务路径，提醒补测和复测安排。",
        owner: "发布经理",
        value: "7 条"
      }
    ],
    taskList: [
      {
        id: 1,
        taskName: "RC-2026.06 版本验收",
        owner: "测试管理组",
        status: "进行中",
        priority: "高",
        aiOutput: "已生成版本建议初稿与剩余风险摘要。",
        updatedAt: "06-26",
        analysis:
          "AI 评估当前版本整体可按计划推进，但仍需确认支付链路复测和业务方最终验收结论。",
        nextAction: "汇总今晚复测结果后更新最终版本建议。"
      },
      {
        id: 2,
        taskName: "支付链路灰度验证",
        owner: "交易测试组",
        status: "高风险",
        priority: "高",
        aiOutput: "已输出阻断问题影响面与复测清单。",
        updatedAt: "06-25",
        analysis: "支付灰度验证仍存在 1 个阻断问题未闭环，影响交易状态回写。",
        nextAction: "安排研发、测试、运维三方今晚共同复测。"
      },
      {
        id: 3,
        taskName: "运营后台体验巡检",
        owner: "业务验证组",
        status: "待确认",
        priority: "中",
        aiOutput: "已整理体验问题清单与优先级建议。",
        updatedAt: "06-24",
        analysis:
          "目前存在两个中优界面问题，AI 建议先由业务方确认是否纳入本次发布窗口处理。",
        nextAction: "请业务负责人确认取舍，并同步发布说明。"
      }
    ],
    riskList: [
      {
        title: "阻断问题尚未完全清零",
        level: "高",
        description:
          "支付链路仍有 1 个阻断问题待复测，会直接影响发布准备检查结论。",
        todo: "今晚完成专项复测，并在发布前做最终确认。",
        owner: "测试负责人"
      },
      {
        title: "业务验收依赖线下结论",
        level: "中",
        description: "部分场景需要业务方补充线下核验结果，当前闭环速度受限。",
        todo: "明早前完成业务确认并更新版本建议。",
        owner: "业务验证负责人"
      }
    ],
    aiGeneratedContents: [
      {
        id: 1,
        title: "RC 版本发布建议摘要",
        contentType: "发布结论",
        summary: "建议版本按计划推进，发布前需完成支付链路复测与业务最终验收。",
        outputBy: "AI 发布助理",
        generatedAt: "06-26 16:10",
        adoptionStatus: "已采纳并回写发布检查单"
      },
      {
        id: 2,
        title: "业务验收问题复核摘要",
        contentType: "测试建议",
        summary: "两项界面问题可延后，一项流程提示问题建议纳入本次发布修正。",
        outputBy: "AI 缺陷助理",
        generatedAt: "06-26 16:00",
        adoptionStatus: "待业务负责人确认"
      }
    ],
    manualReviewRecords: [
      {
        id: 1,
        reviewTopic: "RC 版本发布建议复核",
        reviewer: "发布经理",
        decision: "通过",
        reviewAt: "06-26 16:40",
        comment: "采纳主体建议，补充发布前回退演练要求。"
      },
      {
        id: 2,
        reviewTopic: "业务验收问题纳入范围确认",
        reviewer: "业务负责人",
        decision: "补充说明",
        reviewAt: "06-26 17:00",
        comment: "希望补充核心用户路径复核结果后再给出最终取舍。"
      }
    ],
    devOpsStatus: {
      projectName: "RC-2026.06 版本",
      repoStatus: "代码冻结完成，待发布前最终确认",
      pipelineStatus: "回归批次基本完成，仅剩支付专项复测",
      testStatus: "业务覆盖率 89%，阻断缺陷剩余 1 项",
      releaseReadiness: "可推进但需完成最后两项确认",
      riskSummary: "当前主要风险在支付链路复测与业务最终验收结论。"
    }
  }
};

export const platformProcessOrder: ProcessStageName[] = [
  "需求与设计",
  "编码与评审",
  "集成测试",
  "内部测试"
];
