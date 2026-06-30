export type ExecutiveRouteKey =
  | "AiTaskBoard"
  | "AiAssistantSession"
  | "AiGenerationRecords"
  | "HumanConfirmationRecords"
  | "DevOpsProjectAccess"
  | "PipelineRuns"
  | "DefectRisk"
  | "ReleaseReadinessCheck";

export interface ExecutiveStatus {
  label: string;
  value: string;
  owner: string;
  updatedAt: string;
  summary: string;
  tags: string[];
}

export interface ExecutiveMetric {
  label: string;
  value: string;
  note: string;
}

export interface ExecutiveCapability {
  title: string;
  description: string;
  owner: string;
  value: string;
}

export interface ExecutiveRecord {
  id: number;
  name: string;
  owner: string;
  status: "进行中" | "待确认" | "已完成" | "高风险";
  priority: "高" | "中" | "低";
  summary: string;
  updatedAt: string;
  analysis: string;
  nextAction: string;
}

export interface ExecutiveFocus {
  title: string;
  level: "高" | "中" | "低";
  description: string;
  action: string;
  owner: string;
}

export interface ExecutiveWorkspaceConfig {
  badge: string;
  title: string;
  description: string;
  capabilityTitle: string;
  focusTitle: string;
  tableTitle: string;
  status: ExecutiveStatus;
  metrics: ExecutiveMetric[];
  capabilities: ExecutiveCapability[];
  records: ExecutiveRecord[];
  focusItems: ExecutiveFocus[];
}
