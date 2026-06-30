import type { ExecutiveRouteKey, ExecutiveWorkspaceConfig } from "./types";

const fallbackConfig: ExecutiveWorkspaceConfig = {
  badge: "平台页面",
  title: "页面建设中",
  description: "该页面用于承接 AI + DevOps 研发协作平台的后续演示内容。",
  capabilityTitle: "核心能力",
  focusTitle: "重点关注",
  tableTitle: "关键记录",
  status: {
    label: "页面状态",
    value: "可访问",
    owner: "平台管理员",
    updatedAt: "06-26 18:00",
    summary: "当前页面已完成可访问骨架，可继续叠加真实演示内容。",
    tags: ["可访问", "待扩展"]
  },
  metrics: [
    {
      label: "页面阶段",
      value: "骨架版",
      note: "支持后续继续补充业务信息"
    }
  ],
  capabilities: [
    {
      title: "基础展示",
      description: "承接当前模块的标题、说明和基础信息。",
      owner: "平台前端",
      value: "1 项"
    }
  ],
  records: [
    {
      id: 1,
      name: "页面骨架已创建",
      owner: "平台前端",
      status: "已完成",
      priority: "低",
      summary: "当前页面可正常访问。",
      updatedAt: "06-26",
      analysis: "可按需要继续补充图表、表格和联动动作。",
      nextAction: "按业务场景补齐 mock 数据。"
    }
  ],
  focusItems: [
    {
      title: "演示内容待补齐",
      level: "中",
      description: "当前仍以基础骨架为主，建议按模块价值继续增强。",
      action: "补充与菜单定位匹配的演示内容。",
      owner: "平台产品"
    }
  ]
};

export const executiveWorkspaceConfigs: Record<
  ExecutiveRouteKey,
  ExecutiveWorkspaceConfig
> = {
  AiTaskBoard: {
    badge: "AI 协作中心",
    title: "AI 任务看板",
    description:
      "统一查看 AI 参与的研发协作任务，覆盖需求分析、代码解释、测试归因和人工确认节奏。",
    capabilityTitle: "任务协同能力",
    focusTitle: "重点关注任务",
    tableTitle: "近期 AI 任务记录",
    status: {
      label: "当前运行状态",
      value: "多环节并行处理中",
      owner: "AI 协作运营组",
      updatedAt: "06-26 18:10",
      summary:
        "AI 任务已覆盖四个研发协作环节，高优任务自动进入人工确认队列并同步结果沉淀。",
      tags: ["需求分析", "代码解释", "测试归因", "人工确认"]
    },
    metrics: [
      { label: "运行中任务", value: "32", note: "跨多个项目持续推进" },
      { label: "待人工确认", value: "6", note: "高风险内容优先处理" },
      { label: "今日完成", value: "18", note: "闭环效率整体稳定" },
      { label: "高风险任务", value: "3", note: "均已指定负责人跟进" }
    ],
    capabilities: [
      {
        title: "任务状态聚合",
        description: "按环节、优先级和确认状态集中查看 AI 协作任务。",
        owner: "AI 调度器",
        value: "128 条"
      },
      {
        title: "闭环进度追踪",
        description: "跟踪 AI 输出是否被采纳、修订或退回人工处理。",
        owner: "任务运营",
        value: "87%"
      },
      {
        title: "风险任务标记",
        description: "对高影响任务自动标注并进入领导观察面板。",
        owner: "AI 风控助手",
        value: "3 项"
      }
    ],
    records: [
      {
        id: 1,
        name: "客户画像需求摘要生成",
        owner: "AI 需求助理",
        status: "进行中",
        priority: "中",
        summary: "已输出主题聚类与需求冲突摘要。",
        updatedAt: "06-26",
        analysis:
          "当前任务已识别 4 个业务主题和 7 个冲突点，建议先冻结主链路需求，再拆分扩展能力进入下一轮。",
        nextAction: "等待产品负责人确认冻结范围并回写结论。"
      },
      {
        id: 2,
        name: "支付变更评审解释生成",
        owner: "AI 评审助手",
        status: "高风险",
        priority: "高",
        summary: "已识别支付回退与补偿逻辑改动。",
        updatedAt: "06-26",
        analysis:
          "本次代码变更同时影响同步与异步链路，若未做专项评审可能影响交易状态回写稳定性。",
        nextAction: "安排双评审人专项复核并保留灰度开关。"
      },
      {
        id: 3,
        name: "预发失败用例归因分析",
        owner: "AI 测试助理",
        status: "待确认",
        priority: "高",
        summary: "已将失败样本归并为环境抖动和契约偏差两类。",
        updatedAt: "06-25",
        analysis:
          "失败并非完全来自代码问题，建议由测试与运维共同确认环境抖动是否为主因，再决定是否重跑。",
        nextAction: "完成环境确认后重新触发关键回归批次。"
      }
    ],
    focusItems: [
      {
        title: "高优任务集中在编码与测试环节",
        level: "高",
        description:
          "支付与权限相关 AI 任务占比较高，需要持续观察人工确认节奏。",
        action: "优先保障高敏任务的复核与闭环速度。",
        owner: "AI 协作负责人"
      },
      {
        title: "需求环节可继续提升自动采纳率",
        level: "中",
        description:
          "部分需求摘要仍需较多人工修订，说明模板和口径还有优化空间。",
        action: "补充更多高质量需求分析 Prompt 模板。",
        owner: "产品运营"
      }
    ]
  },
  AiAssistantSession: {
    badge: "AI 协作中心",
    title: "AI 助手会话",
    description:
      "沉淀需求、代码、测试等多轮会话过程，帮助团队回溯上下文并复用高价值交流结论。",
    capabilityTitle: "会话协作能力",
    focusTitle: "当前关注会话",
    tableTitle: "近期助手会话记录",
    status: {
      label: "当前会话状态",
      value: "多角色持续活跃",
      owner: "AI 助手运营组",
      updatedAt: "06-26 17:55",
      summary:
        "当前活跃会话主要集中在代码评审、问题定位和发布建议三个场景，已形成较稳定的上下文复用链路。",
      tags: ["多轮问答", "上下文追溯", "知识引用", "结果回写"]
    },
    metrics: [
      { label: "活跃会话", value: "18", note: "当前仍在持续互动" },
      { label: "平均轮次", value: "7.2", note: "说明讨论深度较高" },
      { label: "已归档", value: "126", note: "支持后续复盘回看" },
      { label: "知识引用率", value: "68%", note: "会话中已自动联动规范库" }
    ],
    capabilities: [
      {
        title: "项目级会话分组",
        description: "按项目、环节和主题组织多轮对话，保留完整协作语境。",
        owner: "会话引擎",
        value: "24 组"
      },
      {
        title: "知识自动引用",
        description: "在对话中关联规范、复盘和历史记录，降低重复解释成本。",
        owner: "知识联动助手",
        value: "68%"
      },
      {
        title: "结论回写任务",
        description: "把高价值会话结论自动回写到任务卡片和发布检查单。",
        owner: "AI 协同链路",
        value: "41 次"
      }
    ],
    records: [
      {
        id: 1,
        name: "支付链路问题定位会话",
        owner: "交易研发组",
        status: "进行中",
        priority: "高",
        summary: "围绕支付状态回写失败进行多轮定位。",
        updatedAt: "06-26",
        analysis:
          "AI 已结合日志、接口契约和历史复盘推断根因集中在异步补偿未正确消费，当前仍待开发确认。",
        nextAction: "补充消费日志后继续会话，并输出最终归因摘要。"
      },
      {
        id: 2,
        name: "导航权限改造评审问答",
        owner: "前端平台组",
        status: "待确认",
        priority: "中",
        summary: "会话已整理出权限边界和菜单影响列表。",
        updatedAt: "06-25",
        analysis:
          "当前讨论已形成清晰方案，但仍需平台管理员确认高敏菜单的最终权限矩阵配置。",
        nextAction: "等待管理员确认后回写评审结论。"
      },
      {
        id: 3,
        name: "发布建议生成会话",
        owner: "测试管理组",
        status: "已完成",
        priority: "中",
        summary: "已完成 RC 版本建议初稿讨论。",
        updatedAt: "06-24",
        analysis:
          "AI 已将版本建议拆成上线条件、阻断项和观察指标三部分，便于领导快速审阅。",
        nextAction: "将会话摘要沉淀至发布准备检查页面。"
      }
    ],
    focusItems: [
      {
        title: "高价值会话复用率可继续提升",
        level: "中",
        description: "部分会话结论仍停留在对话层，未完全沉淀到知识资产。",
        action: "增加自动推荐“沉淀为模板/复盘”的动作入口。",
        owner: "知识运营"
      },
      {
        title: "问题定位会话依赖日志质量",
        level: "高",
        description: "当日志字段不完整时，会影响 AI 对根因的判断置信度。",
        action: "补齐关键链路日志规范并提升上下文质量。",
        owner: "研发效能负责人"
      }
    ]
  },
  AiGenerationRecords: {
    badge: "AI 协作中心",
    title: "AI 生成记录",
    description:
      "记录 AI 在研发流程中生成的方案摘要、代码解释、测试建议和发布结论，支撑复核与复用。",
    capabilityTitle: "生成资产能力",
    focusTitle: "重点生成内容",
    tableTitle: "近期生成记录",
    status: {
      label: "当前生成状态",
      value: "稳定输出中",
      owner: "AI 资产运营组",
      updatedAt: "06-26 18:20",
      summary:
        "AI 每日生成内容已覆盖需求分析、代码解读、测试建议和风险总结，关键输出均可进入人工确认闭环。",
      tags: ["方案摘要", "代码解释", "测试建议", "发布结论"]
    },
    metrics: [
      { label: "今日新增", value: "54", note: "多场景持续产出" },
      { label: "高价值采纳", value: "31", note: "已进入正式协作流程" },
      { label: "待复核", value: "8", note: "关键内容需人工确认" },
      { label: "模板复用率", value: "62%", note: "部分场景已形成稳定模板" }
    ],
    capabilities: [
      {
        title: "多场景内容生成",
        description: "围绕需求、开发、测试、发布多个阶段生成结构化内容。",
        owner: "生成引擎",
        value: "4 类"
      },
      {
        title: "版本差异留存",
        description: "保留生成内容不同版本，方便对比修订前后差异。",
        owner: "记录中心",
        value: "112 份"
      },
      {
        title: "高价值资产回收",
        description: "把高质量输出沉淀为规范模板、复盘案例或 Prompt 资产。",
        owner: "知识沉淀助手",
        value: "31 条"
      }
    ],
    records: [
      {
        id: 1,
        name: "客户画像需求分析摘要",
        owner: "AI 需求助理",
        status: "已完成",
        priority: "中",
        summary: "已形成需求主题、冲突点和优先级建议。",
        updatedAt: "06-26",
        analysis:
          "摘要质量较高，已被产品团队直接采纳为评审输入，后续可沉淀为需求拆解模板。",
        nextAction: "写入需求与设计页面，并复用到相似项目。"
      },
      {
        id: 2,
        name: "支付域代码影响解释",
        owner: "AI 评审助手",
        status: "待确认",
        priority: "高",
        summary: "已解释熔断、补偿、回退三条逻辑改动。",
        updatedAt: "06-25",
        analysis:
          "生成内容覆盖面较全，但对某个历史模块的背景引用还不够准确，需要评审人做补充校正。",
        nextAction: "由架构师补充背景后入库。"
      },
      {
        id: 3,
        name: "预发失败归因总结",
        owner: "AI 测试助理",
        status: "进行中",
        priority: "中",
        summary: "已归纳环境抖动与契约偏差两大原因。",
        updatedAt: "06-24",
        analysis:
          "总结已具备初版复盘价值，但仍需要补齐重跑结果和最终责任归属，才能作为正式案例沉淀。",
        nextAction: "等待回归重跑完成后更新最终版本。"
      }
    ],
    focusItems: [
      {
        title: "高敏内容需要更严格复核",
        level: "高",
        description:
          "权限、支付、发布风险类内容对准确性要求高，不能只依赖自动生成。",
        action: "对高敏记录默认增加人工确认步骤。",
        owner: "AI 治理负责人"
      },
      {
        title: "部分场景模板稳定性不足",
        level: "中",
        description:
          "某些复杂问题定位类输出质量波动较大，说明模板仍有优化空间。",
        action: "结合优秀样本优化 Prompt 模板和上下文注入方式。",
        owner: "Prompt 运营"
      }
    ]
  },
  HumanConfirmationRecords: {
    badge: "AI 协作中心",
    title: "人工确认记录",
    description:
      "对 AI 输出的人工确认过程进行留痕，确保关键建议、风险结论和发布判断都有负责人和依据。",
    capabilityTitle: "确认闭环能力",
    focusTitle: "当前待办确认",
    tableTitle: "近期人工确认记录",
    status: {
      label: "当前确认状态",
      value: "关键项持续收口",
      owner: "人工确认委员会",
      updatedAt: "06-26 18:05",
      summary:
        "高风险 AI 输出已经统一进入确认闭环，确认结论会同步回写到任务、知识库和审计日志。",
      tags: ["责任留痕", "差异记录", "审计回写", "结果复核"]
    },
    metrics: [
      { label: "待确认项", value: "12", note: "高风险内容优先处理" },
      { label: "确认通过率", value: "91%", note: "整体质量较稳定" },
      { label: "退回修订", value: "4", note: "主要集中在风险建议类" },
      { label: "审计回写率", value: "100%", note: "确认动作全部留痕" }
    ],
    capabilities: [
      {
        title: "确认责任绑定",
        description: "明确每条 AI 输出对应的审核人、时间和最终结论。",
        owner: "确认流程引擎",
        value: "12 项"
      },
      {
        title: "分歧原因记录",
        description: "保留人工与 AI 结论不一致的原因，支撑模型优化。",
        owner: "审计助手",
        value: "4 条"
      },
      {
        title: "结果同步回写",
        description: "确认后的内容自动回写到相关任务、规范和日志系统。",
        owner: "协作链路",
        value: "100%"
      }
    ],
    records: [
      {
        id: 1,
        name: "权限矩阵调整确认",
        owner: "平台管理员",
        status: "待确认",
        priority: "高",
        summary: "待确认高敏菜单权限差异是否按建议执行。",
        updatedAt: "06-26",
        analysis:
          "AI 已输出影响用户范围和变更差异，但涉及系统管理入口，必须由管理员与安全负责人共同确认。",
        nextAction: "今晚完成双人确认并生成最终生效清单。"
      },
      {
        id: 2,
        name: "发布风险摘要复核",
        owner: "测试负责人",
        status: "进行中",
        priority: "高",
        summary: "正在核对 RC 版本的阻断项和回退条件。",
        updatedAt: "06-25",
        analysis:
          "AI 给出的发布建议总体合理，但业务方尚未补齐最终验收结论，暂不宜直接通过。",
        nextAction: "等待业务方结论后更新确认状态。"
      },
      {
        id: 3,
        name: "需求摘要采纳确认",
        owner: "产品负责人",
        status: "已完成",
        priority: "中",
        summary: "需求冻结摘要已确认采纳并进入评审纪要。",
        updatedAt: "06-24",
        analysis:
          "该记录说明 AI 在需求分析场景中的输出可直接复用，采纳链路较清晰。",
        nextAction: "沉淀为后续类似项目的标准参考模板。"
      }
    ],
    focusItems: [
      {
        title: "高敏确认依赖少数关键角色",
        level: "高",
        description:
          "权限、发布等高风险确认事项集中在少数负责人手中，容易形成节奏瓶颈。",
        action: "优先安排高风险事项的确认窗口，避免阻塞主流程。",
        owner: "平台治理负责人"
      },
      {
        title: "分歧记录具备模型优化价值",
        level: "中",
        description: "当前已积累多条人工修订原因，适合作为后续模型调优样本。",
        action: "把退回修订原因同步纳入 Prompt 模板优化闭环。",
        owner: "AI 运营"
      }
    ]
  },
  DevOpsProjectAccess: {
    badge: "DevOps 管理",
    title: "项目接入状态",
    description:
      "查看各研发项目接入代码仓、流水线、质量门和发布规范的整体成熟度，支撑平台治理推进。",
    capabilityTitle: "接入治理能力",
    focusTitle: "当前接入重点",
    tableTitle: "近期接入记录",
    status: {
      label: "当前接入状态",
      value: "核心项目持续扩展",
      owner: "DevOps 平台组",
      updatedAt: "06-26 17:40",
      summary:
        "核心项目已基本纳入统一协作链路，当前重点是补齐质量门禁和发布模板的最后缺口。",
      tags: ["代码仓", "流水线", "质量门", "发布规范"]
    },
    metrics: [
      { label: "已接入项目", value: "28", note: "覆盖重点产品线" },
      { label: "待完善项", value: "7", note: "主要集中在质量门禁" },
      { label: "标准化率", value: "84%", note: "整体成熟度持续提升" },
      { label: "本周新增", value: "3", note: "新接入项目进展稳定" }
    ],
    capabilities: [
      {
        title: "接入覆盖盘点",
        description: "按项目查看代码、测试、发布等基础能力接入情况。",
        owner: "平台治理助手",
        value: "28 项"
      },
      {
        title: "缺口识别提醒",
        description: "自动标记未接入质量门、测试用例或发布检查的项目。",
        owner: "治理规则引擎",
        value: "7 项"
      },
      {
        title: "推进建议生成",
        description: "根据项目现状生成下一步接入建议和优先顺序。",
        owner: "DevOps 助手",
        value: "12 条"
      }
    ],
    records: [
      {
        id: 1,
        name: "统一门户 3.0 接入质量门",
        owner: "前端平台组",
        status: "进行中",
        priority: "中",
        summary: "正在补齐自动化回归和发布前检查链路。",
        updatedAt: "06-26",
        analysis:
          "当前代码仓和流水线已接入完成，但质量门与用例库映射还不完整，影响平台标准化率。",
        nextAction: "补齐回归映射后再进入正式接入完成状态。"
      },
      {
        id: 2,
        name: "支付链路稳态改造接入",
        owner: "交易研发组",
        status: "高风险",
        priority: "高",
        summary: "高敏项目接入深度不足，发布规范仍有空白。",
        updatedAt: "06-25",
        analysis:
          "支付项目虽然已接入基础流水线，但回退预案和发布观察指标未统一沉淀，治理风险较高。",
        nextAction: "优先补齐发布检查模板和回退预案。"
      },
      {
        id: 3,
        name: "客户画像引擎项目纳管",
        owner: "智能应用组",
        status: "待确认",
        priority: "中",
        summary: "待确认测试资产与审计配置是否全部接通。",
        updatedAt: "06-24",
        analysis:
          "AI 建议当前项目已具备纳管条件，但仍需平台管理员确认审计日志和模型配置是否同步。",
        nextAction: "完成审计配置确认后纳入正式清单。"
      }
    ],
    focusItems: [
      {
        title: "高敏项目接入不能只完成基础链路",
        level: "高",
        description:
          "支付、权限类项目必须同步补齐质量门与发布检查，否则治理价值不完整。",
        action: "优先补齐高敏项目的完整接入清单。",
        owner: "DevOps 平台负责人"
      },
      {
        title: "新项目纳管节奏较快",
        level: "低",
        description: "本周新增接入整体稳定，说明平台模板已具备较好复用性。",
        action: "继续沉淀标准化接入模板。",
        owner: "平台治理组"
      }
    ]
  },
  PipelineRuns: {
    badge: "DevOps 管理",
    title: "流水线运行",
    description:
      "围绕持续集成和持续验证过程，集中展示批次、耗时、失败节点和跨角色处理状态。",
    capabilityTitle: "流水线观测能力",
    focusTitle: "当前阻塞与观察",
    tableTitle: "近期流水线记录",
    status: {
      label: "当前运行状态",
      value: "关键链路总体稳定",
      owner: "持续交付平台组",
      updatedAt: "06-26 18:12",
      summary:
        "今日流水线触发频次较高，主要阻塞集中在预发环境抖动和个别接口契约偏差，整体成功率仍保持可控。",
      tags: ["批次总览", "失败节点", "自动重跑", "协同提醒"]
    },
    metrics: [
      { label: "运行批次", value: "64", note: "今日触发频次较高" },
      { label: "成功率", value: "92%", note: "关键链路总体稳定" },
      { label: "平均耗时", value: "14 分钟", note: "回归阶段仍可优化" },
      { label: "自动重跑", value: "9 次", note: "减少人工介入成本" }
    ],
    capabilities: [
      {
        title: "批次级总览",
        description: "按项目和分支查看流水线运行趋势与状态变化。",
        owner: "CI 引擎",
        value: "64 条"
      },
      {
        title: "失败节点定位",
        description: "自动抓取失败步骤、错误摘要和处理责任人。",
        owner: "AI 归因助手",
        value: "11 条"
      },
      {
        title: "阻塞实时广播",
        description: "在关键节点失败时同步通知研发、测试和运维角色。",
        owner: "通知中心",
        value: "实时"
      }
    ],
    records: [
      {
        id: 1,
        name: "统一门户主干回归批次",
        owner: "质量平台",
        status: "进行中",
        priority: "中",
        summary: "自动回归已进入后半程，当前无阻断失败。",
        updatedAt: "06-26",
        analysis:
          "运行状态稳定，耗时略高于平均值，主要因为前端资源构建阶段耗时较长，但整体可接受。",
        nextAction: "观察是否需要优化前端构建缓存策略。"
      },
      {
        id: 2,
        name: "支付链路预发验证批次",
        owner: "交易测试组",
        status: "高风险",
        priority: "高",
        summary: "在契约校验阶段出现关键失败。",
        updatedAt: "06-25",
        analysis:
          "AI 已判断失败主因是接口字段口径偏差，并非环境问题，若不修正会持续阻塞后续回归。",
        nextAction: "开发修正文档与 mock 后重新触发批次。"
      },
      {
        id: 3,
        name: "画像引擎联调冒烟批次",
        owner: "智能应用组",
        status: "待确认",
        priority: "中",
        summary: "待确认业务配置是否已同步到最新环境。",
        updatedAt: "06-24",
        analysis:
          "当前失败与配置版本有关，AI 建议先确认配置中心版本，再决定是否继续重跑。",
        nextAction: "业务方确认配置后再恢复流水线。"
      }
    ],
    focusItems: [
      {
        title: "高敏批次失败需要优先联动",
        level: "高",
        description:
          "支付链路失败会直接影响版本节奏，不能放在统一重跑队列中被动等待。",
        action: "单独建立高敏流水线的快速响应机制。",
        owner: "持续交付负责人"
      },
      {
        title: "构建阶段仍有优化空间",
        level: "中",
        description: "部分前端项目构建耗时偏高，对整体流水线时长有持续影响。",
        action: "评估缓存和并行策略，压缩构建时长。",
        owner: "前端平台组"
      }
    ]
  },
  DefectRisk: {
    badge: "DevOps 管理",
    title: "缺陷与风险",
    description:
      "沉淀跨研发流程的问题与风险，支撑从发现、归因到收敛的统一管理与领导视角观察。",
    capabilityTitle: "问题治理能力",
    focusTitle: "重点风险项",
    tableTitle: "近期缺陷与风险记录",
    status: {
      label: "当前风险状态",
      value: "总体可控但需盯紧高敏链路",
      owner: "质量治理组",
      updatedAt: "06-26 18:00",
      summary:
        "当前高风险项主要集中在支付链路、权限调整和发布前确认场景，均已进入统一跟踪台账。",
      tags: ["问题归类", "风险台账", "责任跟踪", "复盘沉淀"]
    },
    metrics: [
      { label: "高风险项", value: "5", note: "均已指定责任人" },
      { label: "缺陷闭环率", value: "88%", note: "发布前持续收敛" },
      { label: "重复问题", value: "3", note: "已被 AI 识别归并" },
      { label: "本周新增", value: "9", note: "多来自联调与内测阶段" }
    ],
    capabilities: [
      {
        title: "问题来源归类",
        description: "按需求、代码、测试、环境等来源聚合问题。",
        owner: "AI 归因引擎",
        value: "9 条"
      },
      {
        title: "风险台账联动",
        description: "同步展示影响范围、紧急程度与当前处理动作。",
        owner: "风险中心",
        value: "5 项"
      },
      {
        title: "复盘价值识别",
        description: "识别适合沉淀到问题复盘库的代表性案例。",
        owner: "知识助手",
        value: "3 条"
      }
    ],
    records: [
      {
        id: 1,
        name: "支付状态回写阻断问题",
        owner: "交易研发组",
        status: "高风险",
        priority: "高",
        summary: "影响交易结果同步和发布建议结论。",
        updatedAt: "06-26",
        analysis:
          "问题贯穿代码、接口契约和内测验证多个环节，若今晚不能完成复测，将直接影响版本发布节奏。",
        nextAction: "研发、测试、运维三方今晚共同完成专项处理。"
      },
      {
        id: 2,
        name: "权限矩阵配置差异",
        owner: "平台管理员",
        status: "待确认",
        priority: "高",
        summary: "涉及系统管理高敏菜单权限范围变更。",
        updatedAt: "06-25",
        analysis:
          "当前差异尚未完全确认，若直接生效可能造成角色越权或权限缺失。",
        nextAction: "完成双人复核后再合入配置。"
      },
      {
        id: 3,
        name: "预发环境抖动重复出现",
        owner: "基础设施团队",
        status: "进行中",
        priority: "中",
        summary: "多条回归失败与环境资源抢占有关。",
        updatedAt: "06-24",
        analysis:
          "AI 已识别该问题具有重复性，适合作为基础设施稳定性专项改进项持续跟踪。",
        nextAction: "优化资源配额并纳入后续复盘。"
      }
    ],
    focusItems: [
      {
        title: "支付链路是当前最核心风险源",
        level: "高",
        description:
          "同一链路同时影响代码评审、集成测试和发布准备，需要集中收口。",
        action: "设为当日最高优先级风险并专人盯办。",
        owner: "质量治理负责人"
      },
      {
        title: "重复环境问题值得专项治理",
        level: "中",
        description: "环境抖动已多次导致误判和返工，不能只做单次修复。",
        action: "形成稳定性专项方案并进入复盘库。",
        owner: "基础设施负责人"
      }
    ]
  },
  ReleaseReadinessCheck: {
    badge: "DevOps 管理",
    title: "发布准备检查",
    description:
      "围绕上线前的质量门、回退预案、观察指标和责任确认完成统一核查，支撑领导决策。",
    capabilityTitle: "发布把关能力",
    focusTitle: "当前发布关注",
    tableTitle: "近期发布检查记录",
    status: {
      label: "当前发布状态",
      value: "可推进但需完成最后确认",
      owner: "发布经理",
      updatedAt: "06-26 18:18",
      summary:
        "当前 RC 版本整体可控，但仍有支付链路复测和业务验收结论需要在发布前完成最终确认。",
      tags: ["质量门", "回退预案", "观察指标", "责任确认"]
    },
    metrics: [
      { label: "检查项总数", value: "24", note: "覆盖技术与业务双维度" },
      { label: "已完成", value: "21", note: "大多数检查已通过" },
      { label: "阻断项", value: "2", note: "需在发布前闭环" },
      { label: "观察指标", value: "8", note: "发布后重点监控" }
    ],
    capabilities: [
      {
        title: "发布清单统一核查",
        description: "把上线条件、依赖确认和剩余风险集中到同一面板。",
        owner: "发布检查助手",
        value: "24 项"
      },
      {
        title: "回退预案校验",
        description: "检查异常情况下的处置路径、联系人和恢复窗口是否完备。",
        owner: "运维协同组",
        value: "100%"
      },
      {
        title: "观察指标预置",
        description: "为发布后监控和复盘预置技术与业务观察指标。",
        owner: "发布经理",
        value: "8 项"
      }
    ],
    records: [
      {
        id: 1,
        name: "RC-2026.06 发布检查单",
        owner: "发布经理",
        status: "进行中",
        priority: "高",
        summary: "大部分检查项已完成，剩余两项关键确认待收口。",
        updatedAt: "06-26",
        analysis:
          "当前版本具备推进条件，但支付链路复测和业务最终验收仍是发布前的两个决定性因素。",
        nextAction: "今晚收齐复测与验收结果后形成最终发布建议。"
      },
      {
        id: 2,
        name: "支付回退预案专项检查",
        owner: "交易运维组",
        status: "待确认",
        priority: "高",
        summary: "回退脚本和联系人链路已准备，待做最终演练确认。",
        updatedAt: "06-25",
        analysis:
          "当前回退预案完整度较高，但因支付链路改动较深，仍建议在发布前完成一次最终演练。",
        nextAction: "发布前完成演练并更新检查结论。"
      },
      {
        id: 3,
        name: "业务观察指标确认",
        owner: "业务运营组",
        status: "已完成",
        priority: "中",
        summary: "核心业务监控口径已确认完成。",
        updatedAt: "06-24",
        analysis:
          "业务侧关键指标已统一，发布后可快速判断交易成功率和核心路径健康度变化。",
        nextAction: "将观察项同步到监控面板和值班手册。"
      }
    ],
    focusItems: [
      {
        title: "最后两项确认直接影响发布节奏",
        level: "高",
        description: "支付链路复测和业务验收若延迟，将直接推迟最终发布决策。",
        action: "把两项确认拉到同一决策窗口内集中完成。",
        owner: "发布经理"
      },
      {
        title: "回退演练价值高于纸面确认",
        level: "中",
        description: "高敏版本只看预案文档不足，最好在发布前做一次轻量演练。",
        action: "安排正式发布前的快速演练并记录结果。",
        owner: "运维负责人"
      }
    ]
  }
};

export function getExecutiveWorkspaceConfig(name: string) {
  return executiveWorkspaceConfigs[name as ExecutiveRouteKey] ?? fallbackConfig;
}
