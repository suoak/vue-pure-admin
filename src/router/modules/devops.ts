import { devops } from "@/router/enums";

const requirementsWorkbench = () =>
  import("@/views/ai-devops/requirements/workbench.vue");
const requirementAiAnalysis = () =>
  import("@/views/ai-devops/requirements/ai-analysis.vue");
const requirementDesignReview = () =>
  import("@/views/ai-devops/requirements/design-review.vue");
const requirementRisk = () => import("@/views/ai-devops/requirements/risk.vue");
const developmentTasks = () =>
  import("@/views/ai-devops/coding-review/tasks.vue");
const aiCodingAssistant = () =>
  import("@/views/ai-devops/coding-review/ai-coding.vue");
const codeReview = () =>
  import("@/views/ai-devops/coding-review/code-review.vue");
const refactorProgress = () =>
  import("@/views/ai-devops/coding-review/refactor-progress.vue");
const integrationTestTasks = () =>
  import("@/views/ai-devops/integration-testing/tasks.vue");
const aiCaseGeneration = () =>
  import("@/views/ai-devops/integration-testing/ai-cases.vue");
const pipelineValidation = () =>
  import("@/views/ai-devops/integration-testing/pipeline-validation.vue");
const integrationDefectAnalysis = () =>
  import("@/views/ai-devops/integration-testing/defect-analysis.vue");
const internalTestRounds = () =>
  import("@/views/ai-devops/internal-testing/rounds.vue");
const issueTracking = () =>
  import("@/views/ai-devops/internal-testing/issues.vue");
const regressionValidation = () =>
  import("@/views/ai-devops/internal-testing/regression.vue");
const internalTestReport = () =>
  import("@/views/ai-devops/internal-testing/report.vue");
const aiTaskBoard = () => import("@/views/ai-devops/records/task-board.vue");
const manualConfirmationRecords = () =>
  import("@/views/ai-devops/records/manual-confirmations.vue");
const resultAssets = () =>
  import("@/views/ai-devops/records/result-assets.vue");

export default [
  {
    path: "/requirements-design",
    redirect: "/requirements-design/workbench",
    meta: {
      icon: "ri:mind-map",
      title: "需求与设计",
      rank: devops
    },
    children: [
      {
        path: "/requirements-design/workbench",
        name: "RequirementsWorkbench",
        component: requirementsWorkbench,
        meta: {
          icon: "ri:dashboard-3-line",
          title: "需求工作台",
          stageName: "需求与设计"
        }
      },
      {
        path: "/requirements-design/ai-analysis",
        name: "AiRequirementAnalysis",
        component: requirementAiAnalysis,
        meta: {
          icon: "ri:sparkling-line",
          title: "AI 需求分析",
          stageName: "需求与设计"
        }
      },
      {
        path: "/requirements-design/design-review",
        name: "DesignReview",
        component: requirementDesignReview,
        meta: {
          icon: "ri:verified-badge-line",
          title: "设计评审",
          stageName: "需求与设计"
        }
      },
      {
        path: "/requirements-design/requirement-risk",
        name: "RequirementRisk",
        component: requirementRisk,
        meta: {
          icon: "ri:alarm-warning-line",
          title: "需求风险",
          stageName: "需求与设计"
        }
      }
    ]
  },
  {
    path: "/coding-review",
    redirect: "/coding-review/tasks",
    meta: {
      icon: "ri:code-s-slash-line",
      title: "编码与评审",
      rank: devops + 1
    },
    children: [
      {
        path: "/coding-review/tasks",
        name: "DevelopmentTasks",
        component: developmentTasks,
        meta: {
          icon: "ri:task-line",
          title: "开发任务",
          stageName: "编码与评审"
        }
      },
      {
        path: "/coding-review/ai-coding",
        name: "AiCodingAssistant",
        component: aiCodingAssistant,
        meta: {
          icon: "ri:robot-2-line",
          title: "AI 编码辅助",
          stageName: "编码与评审"
        }
      },
      {
        path: "/coding-review/code-review",
        name: "CodeReview",
        component: codeReview,
        meta: {
          icon: "ri:search-eye-line",
          title: "代码评审",
          stageName: "编码与评审"
        }
      },
      {
        path: "/coding-review/refactor-progress",
        name: "RefactorProgress",
        component: refactorProgress,
        meta: {
          icon: "ri:git-merge-line",
          title: "重构进度",
          stageName: "编码与评审"
        }
      }
    ]
  },
  {
    path: "/integration-testing",
    redirect: "/integration-testing/tasks",
    meta: {
      icon: "ri:route-line",
      title: "集成测试",
      rank: devops + 2
    },
    children: [
      {
        path: "/integration-testing/tasks",
        name: "IntegrationTestTasks",
        component: integrationTestTasks,
        meta: {
          icon: "ri:list-check-3",
          title: "测试任务",
          stageName: "集成测试"
        }
      },
      {
        path: "/integration-testing/ai-cases",
        name: "AiCaseGeneration",
        component: aiCaseGeneration,
        meta: {
          icon: "ri:file-list-3-line",
          title: "AI 用例生成",
          stageName: "集成测试"
        }
      },
      {
        path: "/integration-testing/pipeline-validation",
        name: "PipelineValidation",
        component: pipelineValidation,
        meta: {
          icon: "ri:play-circle-line",
          title: "流水线验证",
          stageName: "集成测试"
        }
      },
      {
        path: "/integration-testing/defect-analysis",
        name: "IntegrationDefectAnalysis",
        component: integrationDefectAnalysis,
        meta: {
          icon: "ri:bug-line",
          title: "缺陷分析",
          stageName: "集成测试"
        }
      }
    ]
  },
  {
    path: "/internal-testing",
    redirect: "/internal-testing/rounds",
    meta: {
      icon: "ri:shield-check-line",
      title: "内部测试",
      rank: devops + 3
    },
    children: [
      {
        path: "/internal-testing/rounds",
        name: "InternalTestRounds",
        component: internalTestRounds,
        meta: {
          icon: "ri:calendar-check-line",
          title: "测试轮次",
          stageName: "内部测试"
        }
      },
      {
        path: "/internal-testing/issues",
        name: "IssueTracking",
        component: issueTracking,
        meta: {
          icon: "ri:focus-3-line",
          title: "问题跟踪",
          stageName: "内部测试"
        }
      },
      {
        path: "/internal-testing/regression",
        name: "RegressionValidation",
        component: regressionValidation,
        meta: {
          icon: "ri:loop-left-line",
          title: "回归验证",
          stageName: "内部测试"
        }
      },
      {
        path: "/internal-testing/report",
        name: "InternalTestReport",
        component: internalTestReport,
        meta: {
          icon: "ri:file-chart-line",
          title: "测试报告",
          stageName: "内部测试"
        }
      }
    ]
  },
  {
    path: "/ai-collaboration-records",
    redirect: "/ai-collaboration-records/task-board",
    meta: {
      icon: "ri:timeline-view",
      title: "AI 协作记录",
      rank: devops + 4
    },
    children: [
      {
        path: "/ai-collaboration-records/task-board",
        name: "AiTaskBoard",
        component: aiTaskBoard,
        meta: {
          icon: "ri:kanban-view-2",
          title: "AI 任务看板"
        }
      },
      {
        path: "/ai-collaboration-records/manual-confirmations",
        name: "ManualConfirmationRecords",
        component: manualConfirmationRecords,
        meta: {
          icon: "ri:user-follow-line",
          title: "人工确认记录",
          stageName: "AI 协作记录"
        }
      },
      {
        path: "/ai-collaboration-records/result-assets",
        name: "ResultAssets",
        component: resultAssets,
        meta: {
          icon: "ri:archive-stack-line",
          title: "结果沉淀",
          stageName: "AI 协作记录"
        }
      }
    ]
  }
] satisfies RouteConfigsTable[];
