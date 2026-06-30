import { aiCenter } from "@/router/enums";

export default {
  path: "/ai-center",
  redirect: "/ai-center/task-board",
  meta: {
    icon: "ri:robot-2-line",
    title: "AI 协作中心",
    rank: aiCenter
  },
  children: [
    {
      path: "/ai-center/task-board",
      name: "AiTaskBoard",
      component: () => import("@/views/ai-center/task-board/index.vue"),
      meta: {
        icon: "ri:dashboard-line",
        title: "AI 任务看板"
      }
    },
    {
      path: "/ai-center/assistant-session",
      name: "AiAssistantSession",
      component: () => import("@/views/executive-workspace/index.vue"),
      meta: {
        icon: "ri:message-3-line",
        title: "AI 助手会话"
      }
    },
    {
      path: "/ai-center/generation-records",
      name: "AiGenerationRecords",
      component: () => import("@/views/executive-workspace/index.vue"),
      meta: {
        icon: "ri:file-copy-2-line",
        title: "AI 生成记录"
      }
    },
    {
      path: "/ai-center/manual-confirmations",
      name: "HumanConfirmationRecords",
      component: () => import("@/views/executive-workspace/index.vue"),
      meta: {
        icon: "ri:user-follow-line",
        title: "人工确认记录"
      }
    }
  ]
} satisfies RouteConfigsTable;
