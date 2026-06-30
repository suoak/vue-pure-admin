import { system } from "@/router/enums";

export default {
  path: "/system",
  redirect: "/system/user-management",
  meta: {
    icon: "ri:settings-3-line",
    title: "系统管理",
    rank: system
  },
  children: [
    {
      path: "/system/user-management",
      name: "SystemUserManagement",
      component: () => import("@/views/platform-page/index.vue"),
      meta: {
        icon: "ri:admin-line",
        title: "用户管理",
        roles: ["admin"]
      }
    },
    {
      path: "/system/role-permission",
      name: "SystemRolePermission",
      component: () => import("@/views/platform-page/index.vue"),
      meta: {
        icon: "ri:shield-user-line",
        title: "角色权限",
        roles: ["admin"]
      }
    },
    {
      path: "/system/model-config",
      name: "SystemModelConfig",
      component: () => import("@/views/platform-page/index.vue"),
      meta: {
        icon: "ri:cpu-line",
        title: "模型配置",
        roles: ["admin"]
      }
    },
    {
      path: "/system/audit-log",
      name: "SystemAuditLog",
      component: () => import("@/views/platform-page/index.vue"),
      meta: {
        icon: "ri:file-search-line",
        title: "审计日志",
        roles: ["admin"]
      }
    }
  ]
} satisfies RouteConfigsTable;
