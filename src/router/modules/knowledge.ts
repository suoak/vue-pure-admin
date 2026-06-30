import { knowledge } from "@/router/enums";

export default {
  path: "/knowledge",
  redirect: "/knowledge/development-standards",
  meta: {
    icon: "ri:book-open-line",
    title: "知识与规范",
    rank: knowledge
  },
  children: [
    {
      path: "/knowledge/development-standards",
      name: "DevelopmentStandardsLibrary",
      component: () => import("@/views/platform-page/index.vue"),
      meta: {
        icon: "ri:file-list-line",
        title: "研发规范库"
      }
    },
    {
      path: "/knowledge/test-cases",
      name: "TestCaseLibrary",
      component: () => import("@/views/platform-page/index.vue"),
      meta: {
        icon: "ri:test-tube-line",
        title: "测试用例库"
      }
    },
    {
      path: "/knowledge/problem-reviews",
      name: "ProblemReviewLibrary",
      component: () => import("@/views/platform-page/index.vue"),
      meta: {
        icon: "ri:history-line",
        title: "问题复盘库"
      }
    },
    {
      path: "/knowledge/prompt-templates",
      name: "PromptTemplateLibrary",
      component: () => import("@/views/platform-page/index.vue"),
      meta: {
        icon: "ri:chat-quote-line",
        title: "Prompt 模板库"
      }
    }
  ]
} satisfies RouteConfigsTable;
