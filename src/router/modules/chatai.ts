import { chatai } from "@/router/enums";

export default {
  path: "/collaboration",
  redirect: "/collaboration/requirements-design",
  meta: {
    icon: "ri:team-line",
    title: "协作工作台",
    rank: chatai
  },
  children: [
    {
      path: "/collaboration/requirements-design",
      name: "RequirementsDesign",
      component: () =>
        import("@/views/collaboration/workspaces/requirements-design.vue"),
      meta: {
        icon: "ri:file-list-3-line",
        title: "需求与设计"
      }
    },
    {
      path: "/collaboration/coding-review",
      name: "CodingReview",
      component: () =>
        import("@/views/collaboration/workspaces/coding-review.vue"),
      meta: {
        icon: "ri:code-s-slash-line",
        title: "编码与评审"
      }
    },
    {
      path: "/collaboration/integration-testing",
      name: "IntegrationTesting",
      component: () =>
        import("@/views/collaboration/workspaces/integration-testing.vue"),
      meta: {
        icon: "ri:flask-line",
        title: "集成测试"
      }
    },
    {
      path: "/collaboration/internal-testing",
      name: "InternalTesting",
      component: () =>
        import("@/views/collaboration/workspaces/internal-testing.vue"),
      meta: {
        icon: "ri:shield-check-line",
        title: "内部测试"
      }
    }
  ]
} satisfies RouteConfigsTable;
