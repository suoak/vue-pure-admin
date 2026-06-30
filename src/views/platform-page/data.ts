export interface PageCard {
  label: string;
  value: string;
  note: string;
}

export interface PageSection {
  title: string;
  desc: string;
}

export interface PlatformPageConfig {
  badge: string;
  title: string;
  description: string;
  cards: PageCard[];
  sections: PageSection[];
}

const makeConfig = (
  badge: string,
  title: string,
  description: string,
  cards: PageCard[],
  sections: PageSection[]
): PlatformPageConfig => ({
  badge,
  title,
  description,
  cards,
  sections
});

export const platformPageConfigs: Record<string, PlatformPageConfig> = {
  RequirementsDesign: makeConfig(
    "协作工作台",
    "需求与设计",
    "统一承接需求输入、方案梳理与设计评审，让研发流程的起点清晰可追溯。",
    [
      {
        label: "待澄清需求",
        value: "14",
        note: "AI 已完成主题聚类与优先级建议"
      },
      { label: "方案评审中", value: "6", note: "跨团队设计议题同步推进" },
      { label: "冻结完成率", value: "82%", note: "本周需求范围整体稳定" }
    ],
    [
      {
        title: "需求池汇总",
        desc: "集中查看业务诉求、变更影响与协作责任人。"
      },
      {
        title: "设计评审纪要",
        desc: "对关键结论、约束条件和后续动作进行结构化沉淀。"
      },
      {
        title: "AI 辅助拆解",
        desc: "自动生成需求摘要、风险点和验收建议，减少沟通折返。"
      }
    ]
  ),
  CodingReview: makeConfig(
    "协作工作台",
    "编码与评审",
    "把变更开发、代码审阅和合入决策放到同一协作面板，突出 AI 协作闭环。",
    [
      { label: "待评审变更", value: "9", note: "高风险改动已自动标记" },
      { label: "首轮反馈时长", value: "38 分钟", note: "评审效率保持稳定" },
      { label: "自动摘要覆盖率", value: "93%", note: "核心仓库默认启用" }
    ],
    [
      {
        title: "代码变更摘要",
        desc: "按模块聚合展示本轮改动重点、影响范围与回滚建议。"
      },
      {
        title: "评审协同看板",
        desc: "同步展示评审意见、阻塞项和处理状态。"
      },
      {
        title: "知识库联动",
        desc: "关联既有规范、历史问题和最佳实践，提升评审质量。"
      }
    ]
  ),
  IntegrationTesting: makeConfig(
    "协作工作台",
    "集成测试",
    "聚合环境联调、接口契约和自动回归结果，让测试协作有统一视图。",
    [
      { label: "流水线触发", value: "26", note: "今日关键任务持续自动运行" },
      { label: "回归通过率", value: "96.4%", note: "失败场景已自动聚类归因" },
      { label: "环境健康度", value: "4/5", note: "预发环境仍需持续观察" }
    ],
    [
      {
        title: "联调计划",
        desc: "汇总服务、接口和环境准备状态，明确阻塞位置。"
      },
      {
        title: "测试执行结果",
        desc: "集中查看自动化回归、冒烟测试和失败重跑结论。"
      },
      {
        title: "AI 归因分析",
        desc: "对失败用例做相似问题归并，缩短排查路径。"
      }
    ]
  ),
  InternalTesting: makeConfig(
    "协作工作台",
    "内部测试",
    "围绕版本验证、问题收敛和发布建议开展协作，支撑上线前最后一道把关。",
    [
      { label: "待关闭缺陷", value: "11", note: "其中 2 个为发布阻断项" },
      { label: "业务覆盖率", value: "89%", note: "重点场景已基本完成验证" },
      { label: "版本建议", value: "按计划推进", note: "RC 版本整体可控" }
    ],
    [
      {
        title: "缺陷闭环",
        desc: "记录问题根因、责任归属和复测结论，形成完整闭环。"
      },
      {
        title: "版本评估",
        desc: "同步呈现内测结论、上线条件与剩余风险。"
      },
      {
        title: "发布前检查",
        desc: "用统一模板确认回退预案、观察指标与关键联系人。"
      }
    ]
  ),
  AiTaskBoard: makeConfig(
    "AI 协作中心",
    "AI 任务看板",
    "统一查看 AI 参与的研发任务，覆盖需求整理、代码解释、测试归因等场景。",
    [
      {
        label: "运行中任务",
        value: "32",
        note: "跨需求、代码、测试三个域同步推进"
      },
      { label: "完成率", value: "87%", note: "今日新增任务处理节奏稳定" },
      { label: "人工介入", value: "6", note: "关键任务已安排负责人复核" }
    ],
    [
      {
        title: "任务分类",
        desc: "按研发流程、优先级和责任团队组织 AI 工作项。"
      },
      {
        title: "执行状态",
        desc: "清晰呈现排队、运行、待确认和已完成等状态。"
      },
      {
        title: "闭环追踪",
        desc: "跟踪 AI 输出是否被采纳、修订或退回人工处理。"
      }
    ]
  ),
  AiAssistantSession: makeConfig(
    "AI 协作中心",
    "AI 助手会话",
    "面向研发协作场景沉淀多轮会话，支持围绕需求、代码和测试进行连续问答。",
    [
      { label: "活跃会话", value: "18", note: "当前以代码评审和问题定位为主" },
      { label: "平均轮次", value: "7.2", note: "说明会话深度较高" },
      { label: "已归档", value: "126", note: "可回溯关键讨论上下文" }
    ],
    [
      {
        title: "会话分组",
        desc: "按照项目、协作环节和任务主题组织上下文。"
      },
      {
        title: "知识引用",
        desc: "在问答中自动引用规范、复盘和历史记录。"
      },
      {
        title: "结果回写",
        desc: "将有价值结论回写到任务、知识库或发布检查单。"
      }
    ]
  ),
  AiGenerationRecords: makeConfig(
    "AI 协作中心",
    "AI 生成记录",
    "记录 AI 生成的方案摘要、代码解释、测试建议和总结结论，支持审计与复用。",
    [
      { label: "今日新增", value: "54", note: "输出类型覆盖较全面" },
      { label: "高价值采纳", value: "31", note: "已进入正式协作流程" },
      { label: "待复核", value: "8", note: "需要人工补充确认" }
    ],
    [
      {
        title: "内容分层",
        desc: "按需求、开发、测试、运维等类别组织生成结果。"
      },
      {
        title: "版本对比",
        desc: "保留不同生成版本，便于比较修订前后差异。"
      },
      {
        title: "复用入口",
        desc: "将高质量生成结果沉淀为模板或经验片段。"
      }
    ]
  ),
  HumanConfirmationRecords: makeConfig(
    "AI 协作中心",
    "人工确认记录",
    "对 AI 输出的人工确认过程进行留痕，确保关键决策有负责人、有依据。",
    [
      { label: "待确认项", value: "12", note: "高风险内容优先处理" },
      { label: "确认通过率", value: "91%", note: "大多数输出可直接进入流程" },
      { label: "退回修订", value: "4", note: "集中在发布风险类建议" }
    ],
    [
      {
        title: "确认责任",
        desc: "明确每条 AI 输出的审核人、审核时间和结论。"
      },
      {
        title: "分歧记录",
        desc: "保留人工与 AI 结论差异，便于后续复盘与优化。"
      },
      {
        title: "审计留痕",
        desc: "支撑管理层查看关键决策是否完成必要确认。"
      }
    ]
  ),
  DevOpsProjectAccess: makeConfig(
    "DevOps 管理",
    "项目接入状态",
    "查看各研发项目接入代码仓、流水线、质量门禁和发布规范的整体进展。",
    [
      { label: "已接入项目", value: "28", note: "核心项目已纳入统一管理" },
      { label: "待完善项", value: "7", note: "主要集中在质量门禁与模板" },
      { label: "标准化率", value: "84%", note: "平台接入成熟度持续提升" }
    ],
    [
      {
        title: "接入清单",
        desc: "按项目查看代码、流水线、测试和发布能力覆盖情况。"
      },
      {
        title: "缺口识别",
        desc: "快速识别尚未纳入平台治理的流程环节。"
      },
      {
        title: "推进建议",
        desc: "结合当前状态给出后续接入与优化建议。"
      }
    ]
  ),
  PipelineRuns: makeConfig(
    "DevOps 管理",
    "流水线运行",
    "围绕持续集成与持续验证过程，集中展示运行批次、耗时和失败原因。",
    [
      { label: "运行批次", value: "64", note: "今日流水线触发频次较高" },
      { label: "成功率", value: "92%", note: "关键链路总体稳定" },
      { label: "平均耗时", value: "14 分钟", note: "回归阶段仍有优化空间" }
    ],
    [
      {
        title: "批次总览",
        desc: "按项目和分支维度查看流水线运行趋势。"
      },
      {
        title: "失败定位",
        desc: "聚合失败节点、错误摘要与处理人信息。"
      },
      {
        title: "协同提醒",
        desc: "在阻塞发生时及时触达研发、测试和运维角色。"
      }
    ]
  ),
  DefectRisk: makeConfig(
    "DevOps 管理",
    "缺陷与风险",
    "沉淀跨研发流程的问题与风险，支撑从发现、归因到跟踪收敛的统一管理。",
    [
      { label: "高风险项", value: "5", note: "均已分配责任人和跟进计划" },
      { label: "缺陷闭环率", value: "88%", note: "发布前持续收敛" },
      { label: "重复问题", value: "3", note: "AI 已识别相似根因" }
    ],
    [
      {
        title: "问题归类",
        desc: "按需求、开发、测试、环境等类型聚合问题来源。"
      },
      {
        title: "风险台账",
        desc: "同步展示影响范围、紧急程度和处置状态。"
      },
      {
        title: "复盘沉淀",
        desc: "将代表性问题沉淀到知识库，支持后续预防。"
      }
    ]
  ),
  ReleaseReadinessCheck: makeConfig(
    "DevOps 管理",
    "发布准备检查",
    "围绕上线前的质量门、回退预案、观察指标和协同责任完成统一核查。",
    [
      { label: "检查项总数", value: "24", note: "覆盖技术与业务双维度" },
      { label: "已完成", value: "21", note: "剩余项集中在业务确认" },
      { label: "阻断项", value: "2", note: "需在发布前闭环" }
    ],
    [
      {
        title: "发布清单",
        desc: "将上线条件、依赖方确认和风险项统一结构化管理。"
      },
      {
        title: "回退预案",
        desc: "确认异常情况下的处置路径、联系人和恢复窗口。"
      },
      {
        title: "观察指标",
        desc: "为发布后监控与复盘预置核心技术和业务指标。"
      }
    ]
  ),
  DevelopmentStandardsLibrary: makeConfig(
    "知识与规范",
    "研发规范库",
    "集中沉淀架构约束、编码规范和协作要求，让研发流程中的标准更容易被调用。",
    [
      { label: "规范主题", value: "46", note: "覆盖前后端、测试与运维" },
      { label: "本周更新", value: "5", note: "重点补充 AI 协作指引" },
      { label: "引用频次", value: "218", note: "已成为常用知识来源" }
    ],
    [
      {
        title: "标准分类",
        desc: "按角色和研发协作环节组织规范内容。"
      },
      {
        title: "快速引用",
        desc: "在评审、测试和发布场景中快速引用标准要求。"
      },
      {
        title: "持续更新",
        desc: "结合项目实践和复盘结果持续维护规范库。"
      }
    ]
  ),
  TestCaseLibrary: makeConfig(
    "知识与规范",
    "测试用例库",
    "沉淀关键业务场景、接口验证与回归策略，支撑测试环节更高效复用。",
    [
      { label: "核心用例", value: "132", note: "已覆盖主要业务链路" },
      { label: "自动化映射", value: "76%", note: "持续补齐回归资产" },
      { label: "待补场景", value: "9", note: "集中在新能力联调阶段" }
    ],
    [
      {
        title: "场景目录",
        desc: "按业务主题、风险级别和执行方式组织测试用例。"
      },
      {
        title: "执行记录",
        desc: "同步展示历史执行结果、失败原因与修复建议。"
      },
      {
        title: "协作复用",
        desc: "支持测试、研发与产品在同一视图复用验证资产。"
      }
    ]
  ),
  ProblemReviewLibrary: makeConfig(
    "知识与规范",
    "问题复盘库",
    "沉淀缺陷案例、根因分析和改进动作，把问题处理经验转成组织能力。",
    [
      { label: "复盘条目", value: "58", note: "覆盖版本、环境和流程问题" },
      { label: "高价值案例", value: "17", note: "适合培训和制度优化" },
      { label: "改进落实率", value: "83%", note: "多数问题已形成预防措施" }
    ],
    [
      {
        title: "根因分析",
        desc: "明确问题触发条件、影响链路与协作薄弱环节。"
      },
      {
        title: "措施跟踪",
        desc: "持续跟进改进动作是否落实到流程与规范。"
      },
      {
        title: "经验复用",
        desc: "支持 AI 与人工共同引用历史复盘，减少重复犯错。"
      }
    ]
  ),
  PromptTemplateLibrary: makeConfig(
    "知识与规范",
    "Prompt 模板库",
    "为需求分析、代码解释、测试设计和发布检查提供可复用的提示词模板。",
    [
      { label: "模板数量", value: "39", note: "覆盖多类研发协作场景" },
      { label: "高频模板", value: "12", note: "已沉淀为团队常用资产" },
      { label: "优化建议", value: "8", note: "待结合新模型继续调整" }
    ],
    [
      {
        title: "模板分类",
        desc: "按研发流程、角色和使用目标组织提示词资产。"
      },
      {
        title: "效果反馈",
        desc: "记录模板的适用范围、质量表现与改写建议。"
      },
      {
        title: "协作沉淀",
        desc: "将高质量提示词与实际产出形成可复用闭环。"
      }
    ]
  ),
  SystemUserManagement: makeConfig(
    "系统管理",
    "用户管理",
    "用于演示平台用户接入、角色归属和协作身份管理的基础能力骨架。",
    [
      { label: "平台用户", value: "186", note: "覆盖产品、研发、测试与运维" },
      { label: "活跃账号", value: "143", note: "本周仍保持稳定活跃" },
      { label: "待开通", value: "7", note: "集中在新接入项目组" }
    ],
    [
      {
        title: "用户目录",
        desc: "展示平台账号、组织归属和协作职责。"
      },
      {
        title: "权限关联",
        desc: "说明用户与角色、数据范围和工作台权限的关系。"
      },
      {
        title: "接入流程",
        desc: "用于沉淀新成员加入平台时的标准开通步骤。"
      }
    ]
  ),
  SystemRolePermission: makeConfig(
    "系统管理",
    "角色权限",
    "用于演示不同协作角色在研发流程中的工作台权限、查看范围和审批职责。",
    [
      { label: "角色类型", value: "12", note: "覆盖管理、产品、研发、测试等" },
      { label: "权限策略", value: "28", note: "支持按菜单和协作环节配置" },
      { label: "待调整", value: "3", note: "新接入团队权限仍在校准" }
    ],
    [
      {
        title: "角色定义",
        desc: "明确各类角色可见的菜单、数据和操作范围。"
      },
      {
        title: "审批链路",
        desc: "展示关键节点的确认与授权关系。"
      },
      {
        title: "最小权限",
        desc: "帮助平台持续优化权限颗粒度与安全边界。"
      }
    ]
  ),
  SystemModelConfig: makeConfig(
    "系统管理",
    "模型配置",
    "用于演示 AI 助手接入的模型能力、参数策略和场景绑定配置。",
    [
      { label: "已接入模型", value: "6", note: "覆盖通用问答、代码与摘要场景" },
      { label: "启用策略", value: "14", note: "按任务类型分配模型能力" },
      { label: "待评估", value: "2", note: "新模型正在沙箱验证" }
    ],
    [
      {
        title: "模型清单",
        desc: "展示模型版本、可用场景和基础配置状态。"
      },
      {
        title: "策略编排",
        desc: "定义不同协作环节如何选择模型与提示模板。"
      },
      {
        title: "效果监测",
        desc: "跟踪响应质量、人工采纳率和风险控制状态。"
      }
    ]
  ),
  SystemAuditLog: makeConfig(
    "系统管理",
    "审计日志",
    "集中查看关键操作、模型调用和人工确认记录，为管理与合规提供留痕支撑。",
    [
      { label: "今日审计记录", value: "428", note: "操作留痕覆盖关键协作动作" },
      { label: "模型调用", value: "173", note: "重点查看高风险指令场景" },
      { label: "异常告警", value: "2", note: "已进入人工复核流程" }
    ],
    [
      {
        title: "操作留痕",
        desc: "记录用户关键行为、菜单访问和配置变更。"
      },
      {
        title: "AI 调用审计",
        desc: "查看模型使用、生成内容和人工确认链路。"
      },
      {
        title: "合规支撑",
        desc: "为平台治理、问题追溯和决策复盘提供依据。"
      }
    ]
  )
};
