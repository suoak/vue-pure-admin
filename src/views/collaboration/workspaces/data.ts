import { aiDevopsPlatformMockData } from "@/mock-data/ai-devops-platform";
import type { ProcessWorkspaceData } from "../types";

function createWorkspace(
  stage: keyof typeof aiDevopsPlatformMockData
): ProcessWorkspaceData {
  const data = aiDevopsPlatformMockData[stage];

  return {
    title: data.title,
    description: data.description,
    status: data.accessStatus,
    aiCapabilities: data.aiCapabilities,
    tasks: data.taskList,
    risks: data.riskList
  };
}

export const requirementsDesignWorkspace = createWorkspace("需求与设计");

export const codingReviewWorkspace = createWorkspace("编码与评审");

export const integrationTestingWorkspace = createWorkspace("集成测试");

export const internalTestingWorkspace = createWorkspace("内部测试");
