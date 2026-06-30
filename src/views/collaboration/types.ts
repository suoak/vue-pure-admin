export interface WorkspaceStatus {
  accessPhase: "已接入" | "试运行" | "规划中";
  accessState: string;
  accessRate: string;
  owner: string;
  lastSync: string;
  summary: string;
  connectedSystems: string[];
}

export interface WorkspaceCapability {
  name: string;
  description: string;
  owner: string;
  value: string;
}

export interface WorkspaceTask {
  id: number;
  taskName: string;
  owner: string;
  status: "进行中" | "待确认" | "已完成" | "高风险";
  priority: "高" | "中" | "低";
  aiOutput: string;
  updatedAt: string;
  analysis: string;
  nextAction: string;
}

export interface WorkspaceRisk {
  title: string;
  level: "高" | "中" | "低";
  description: string;
  todo: string;
  owner: string;
}

export interface ProcessWorkspaceData {
  title: string;
  description: string;
  status: WorkspaceStatus;
  aiCapabilities: WorkspaceCapability[];
  tasks: WorkspaceTask[];
  risks: WorkspaceRisk[];
}
