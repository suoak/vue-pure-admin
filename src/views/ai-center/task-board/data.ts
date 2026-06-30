import {
  aiDevopsPlatformMockData,
  platformProcessOrder,
  type ProcessStageName
} from "@/mock-data/ai-devops-platform";

export type TaskBoardStatus =
  | "待分析"
  | "AI 执行中"
  | "待人工确认"
  | "已采纳"
  | "已归档";

export interface TaskBoardRecord {
  id: number;
  taskName: string;
  stage: ProcessStageName;
  aiAgent: string;
  priority: "高" | "中" | "低";
  owner: string;
  updatedAt: string;
  status: TaskBoardStatus;
  inputMaterials: string[];
  aiResult: string;
  reviewComment: string;
  adoptionStatus: string;
  processLogs: Array<{
    time: string;
    content: string;
  }>;
}

export const taskBoardColumns: TaskBoardStatus[] = [
  "待分析",
  "AI 执行中",
  "待人工确认",
  "已采纳",
  "已归档"
];

const stageTaskBoardStatuses: Record<
  ProcessStageName,
  [TaskBoardStatus, TaskBoardStatus]
> = {
  需求与设计: ["待分析", "AI 执行中"],
  编码与评审: ["AI 执行中", "已归档"],
  集成测试: ["待人工确认", "待分析"],
  内部测试: ["已采纳", "待人工确认"]
};

export const taskBoardTasks: TaskBoardRecord[] = platformProcessOrder.flatMap(
  stage => {
    const data = aiDevopsPlatformMockData[stage];
    const generatedContent = data.aiGeneratedContents[0];
    const manualReview = data.manualReviewRecords[0];
    const statuses = stageTaskBoardStatuses[stage];

    return data.taskList.slice(0, 2).map((task, index) => ({
      id: Number(`${platformProcessOrder.indexOf(stage) + 1}${index + 1}`),
      taskName:
        index === 0
          ? (generatedContent?.title ?? task.taskName)
          : task.taskName,
      stage,
      aiAgent:
        generatedContent?.outputBy ??
        data.aiCapabilities[0]?.owner ??
        "AI 协作助手",
      priority: task.priority,
      owner: task.owner,
      updatedAt: `${task.updatedAt} ${data.accessStatus.lastSync.split(" ")[1] ?? "18:00"}`,
      status: statuses[index] ?? "待分析",
      inputMaterials: [
        data.accessStatus.connectedSystems[0],
        data.accessStatus.connectedSystems[1],
        data.devOpsStatus.projectName
      ],
      aiResult: generatedContent?.summary ?? task.aiOutput,
      reviewComment: manualReview?.comment ?? "待人工复核当前结论。",
      adoptionStatus: generatedContent?.adoptionStatus ?? "待确认",
      processLogs: [
        {
          time: data.accessStatus.lastSync,
          content: data.accessStatus.summary
        },
        {
          time: manualReview?.reviewAt ?? task.updatedAt,
          content: manualReview?.comment ?? task.nextAction
        }
      ]
    }));
  }
);
