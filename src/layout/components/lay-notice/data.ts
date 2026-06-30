import { $t } from "@/plugins/i18n";

export interface ListItem {
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  description: string;
  status?: "primary" | "success" | "warning" | "info" | "danger";
  extra?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
  emptyText: string;
}

export const noticesData: TabItem[] = [
  {
    key: "1",
    name: $t("status.pureNotify"),
    list: [
      {
        avatar: "",
        title: "需求池新增跨团队协同主题",
        description:
          "本周新增 12 条研发协作需求，已由 AI 助理完成初步聚类与优先级建议。",
        datetime: "10 分钟前",
        type: "1"
      },
      {
        avatar: "",
        title: "集成环境完成自动回归",
        description:
          "回归任务覆盖 96 个关键场景，失败用例已自动归档到问题看板。",
        datetime: "今天 09:30",
        type: "1"
      }
    ],
    emptyText: $t("status.pureNoNotify")
  },
  {
    key: "2",
    name: $t("status.pureMessage"),
    list: [
      {
        avatar: "",
        title: "AI 评审助手已生成代码审阅摘要",
        description:
          "支付域服务的 3 个高风险改动已生成差异摘要，并附带回滚建议。",
        datetime: "今天",
        type: "2"
      },
      {
        avatar: "",
        title: "测试负责人更新了内部验证结论",
        description:
          "RC-2026.06 版本的可发布建议已同步到协作驾驶舱，请及时查看。",
        datetime: "昨天",
        type: "2"
      }
    ],
    emptyText: $t("status.pureNoMessage")
  },
  {
    key: "3",
    name: $t("status.pureTodo"),
    list: [
      {
        avatar: "",
        title: "上线前风险复核",
        description:
          "请在今天 18:00 前完成支付链路、通知链路与权限链路的发布前复核。",
        datetime: "",
        extra: "高优先级",
        status: "danger",
        type: "3"
      },
      {
        avatar: "",
        title: "周会材料准备",
        description: "同步整理研发流程核心指标，用于领导例会演示与答疑。",
        datetime: "",
        extra: "准备中",
        status: "warning",
        type: "3"
      },
      {
        avatar: "",
        title: "缺陷闭环复盘",
        description: "内部测试阶段的 6 个核心问题需补充根因与预防措施。",
        datetime: "",
        extra: "进行中",
        type: "3"
      }
    ],
    emptyText: $t("status.pureNoTodo")
  }
];
