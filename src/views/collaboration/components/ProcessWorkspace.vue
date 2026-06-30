<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  WorkspaceCapability,
  WorkspaceRisk,
  WorkspaceStatus,
  WorkspaceTask
} from "../types";

defineOptions({
  name: "ProcessWorkspace"
});

const props = defineProps<{
  title: string;
  description: string;
  status: WorkspaceStatus;
  aiCapabilities: WorkspaceCapability[];
  tasks: WorkspaceTask[];
  risks: WorkspaceRisk[];
}>();

const detailVisible = ref(false);
const currentTask = ref<WorkspaceTask | null>(null);

const workspaceMetrics = computed(() => {
  const pendingCount = props.tasks.filter(
    item => item.status === "待确认"
  ).length;
  const riskCount = props.risks.filter(item => item.level === "高").length;
  const completionCount = props.tasks.filter(
    item => item.status === "已完成"
  ).length;

  return [
    {
      label: "AI 能力覆盖",
      value: `${props.aiCapabilities.length} 项`,
      note: "围绕当前协作环节已接入的辅助能力"
    },
    {
      label: "待人工确认",
      value: `${pendingCount} 项`,
      note: "需要负责人或评审角色完成确认"
    },
    {
      label: "已闭环任务",
      value: `${completionCount} 项`,
      note: "AI 输出已完成人工确认并沉淀结果"
    },
    {
      label: "高关注风险",
      value: `${riskCount} 项`,
      note: "建议在本轮节奏内优先处理"
    }
  ];
});

const todoList = computed(() => {
  return props.risks.map(item => ({
    title: item.title,
    owner: item.owner,
    todo: item.todo,
    level: item.level
  }));
});

function statusTagType(status: WorkspaceTask["status"]) {
  if (status === "高风险") return "danger";
  if (status === "待确认") return "warning";
  if (status === "已完成") return "success";
  return "primary";
}

function priorityTagType(priority: WorkspaceTask["priority"]) {
  if (priority === "高") return "danger";
  if (priority === "中") return "warning";
  return "success";
}

function riskTagType(level: WorkspaceRisk["level"]) {
  if (level === "高") return "danger";
  if (level === "中") return "warning";
  return "success";
}

function accessTagType(phase: WorkspaceStatus["accessPhase"]) {
  if (phase === "已接入") return "success";
  if (phase === "试运行") return "primary";
  return "info";
}

function openTaskDetail(task: WorkspaceTask) {
  currentTask.value = task;
  detailVisible.value = true;
}
</script>

<template>
  <div class="workspace-page">
    <section class="hero-panel">
      <div class="hero-copy">
        <span class="hero-badge">协作工作台</span>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </div>
      <el-card shadow="never" class="status-card">
        <div class="status-head">
          <div>
            <span class="status-label">当前接入状态</span>
            <div class="status-title-row">
              <h3>{{ status.accessState }}</h3>
              <el-tag
                :type="accessTagType(status.accessPhase)"
                effect="dark"
                round
              >
                {{ status.accessPhase }}
              </el-tag>
            </div>
          </div>
          <el-tag type="success" effect="plain" round class="status-rate-tag">
            AI 接入率 {{ status.accessRate }}
          </el-tag>
        </div>
        <p class="status-summary">{{ status.summary }}</p>
        <div class="status-meta">
          <div class="status-meta-item">
            <span>负责人</span>
            <strong>{{ status.owner }}</strong>
          </div>
          <div class="status-meta-item">
            <span>最近同步</span>
            <strong>{{ status.lastSync }}</strong>
          </div>
        </div>
        <div class="status-systems">
          <span>已接入能力链路</span>
          <div class="status-tags">
            <el-tag
              v-for="item in status.connectedSystems"
              :key="item"
              effect="plain"
              round
            >
              {{ item }}
            </el-tag>
          </div>
        </div>
      </el-card>
    </section>

    <section class="metric-grid">
      <el-card
        v-for="item in workspaceMetrics"
        :key="item.label"
        shadow="hover"
        class="metric-card"
      >
        <span class="metric-label">{{ item.label }}</span>
        <strong class="metric-value">{{ item.value }}</strong>
        <span class="metric-note">{{ item.note }}</span>
      </el-card>
    </section>

    <section class="content-grid">
      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>AI 能力列表</span>
            <el-tag type="primary" effect="plain">环节能力画像</el-tag>
          </div>
        </template>
        <div class="capability-list">
          <article
            v-for="item in aiCapabilities"
            :key="item.name"
            class="capability-item"
          >
            <div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
            </div>
            <div class="capability-side">
              <strong>{{ item.value }}</strong>
              <span>{{ item.owner }}</span>
            </div>
          </article>
        </div>
      </el-card>

      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>风险与待办</span>
            <el-tag type="warning" effect="plain">重点关注</el-tag>
          </div>
        </template>
        <div class="risk-layout">
          <div class="risk-list">
            <article v-for="item in risks" :key="item.title" class="risk-item">
              <div class="risk-top">
                <h3>{{ item.title }}</h3>
                <el-tag :type="riskTagType(item.level)" effect="dark" round>
                  {{ item.level }}风险
                </el-tag>
              </div>
              <p>{{ item.description }}</p>
              <div class="risk-foot">责任人：{{ item.owner }}</div>
            </article>
          </div>
          <div class="todo-panel">
            <div v-for="item in todoList" :key="item.title" class="todo-item">
              <span class="todo-dot" :class="`is-${item.level}`" />
              <div>
                <h4>{{ item.todo }}</h4>
                <p>{{ item.title }} · {{ item.owner }}</p>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </section>

    <el-card shadow="never" class="section-card">
      <template #header>
        <div class="card-head">
          <span>任务列表</span>
          <el-tag type="info" effect="plain">本地 Mock 数据</el-tag>
        </div>
      </template>
      <el-table :data="tasks" stripe>
        <el-table-column prop="taskName" label="任务名称" min-width="220" />
        <el-table-column prop="owner" label="负责人" width="140" />
        <el-table-column label="状态" width="110">
          <template #default="{ row }">
            <el-tag :type="statusTagType(row.status)" effect="light" round>
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="优先级" width="100">
          <template #default="{ row }">
            <el-tag :type="priorityTagType(row.priority)" effect="plain" round>
              {{ row.priority }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="aiOutput" label="AI 输出摘要" min-width="260" />
        <el-table-column prop="updatedAt" label="最近更新时间" width="130" />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              @click="openTaskDetail(row as WorkspaceTask)"
            >
              查看分析
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-drawer
      v-model="detailVisible"
      :title="currentTask?.taskName ?? 'AI 分析结果'"
      size="42%"
    >
      <template v-if="currentTask">
        <div class="detail-panel">
          <div class="detail-grid">
            <div class="detail-item">
              <span>负责人</span>
              <strong>{{ currentTask.owner }}</strong>
            </div>
            <div class="detail-item">
              <span>状态</span>
              <el-tag
                :type="statusTagType(currentTask.status)"
                effect="light"
                round
              >
                {{ currentTask.status }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span>优先级</span>
              <el-tag
                :type="priorityTagType(currentTask.priority)"
                effect="plain"
                round
              >
                {{ currentTask.priority }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span>最近更新时间</span>
              <strong>{{ currentTask.updatedAt }}</strong>
            </div>
          </div>
          <div class="detail-block">
            <span>AI 输出摘要</span>
            <p>{{ currentTask.aiOutput }}</p>
          </div>
          <div class="detail-block">
            <span>AI 分析结果</span>
            <p>{{ currentTask.analysis }}</p>
          </div>
          <div class="detail-block">
            <span>下一步动作</span>
            <p>{{ currentTask.nextAction }}</p>
          </div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.workspace-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 2px 0 12px;
}

.hero-panel,
.content-grid,
.metric-grid {
  display: grid;
  gap: 18px;
}

.hero-panel {
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
}

.hero-copy {
  padding: 26px;
  color: #fff;
  background: var(--ai-hero-gradient);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-md);

  h1 {
    margin: 10px 0 12px;
    font-size: 34px;
    line-height: 1.12;
  }

  p {
    max-width: 860px;
    margin: 0;
    font-size: 15px;
    line-height: 1.85;
    color: rgb(255 255 255 / 88%);
  }
}

.hero-badge {
  display: inline-flex;
  padding: 6px 12px;
  font-size: 12px;
  letter-spacing: 0.08em;
  background: rgb(255 255 255 / 12%);
  border: 1px solid rgb(255 255 255 / 16%);
  border-radius: 999px;
}

.status-card,
.metric-card,
.section-card {
  border: var(--ai-card-border);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-sm);
}

.status-card {
  height: 100%;
  background: transparent;

  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    padding: 22px;
    background: var(--ai-surface-gradient);
    border-radius: var(--ai-card-radius-lg);
  }
}

.status-head,
.status-meta,
.card-head,
.risk-top {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  justify-content: space-between;
}

.status-label,
.status-summary,
.status-meta-item span,
.status-systems span,
.metric-label,
.metric-note,
.capability-item p,
.capability-side span,
.risk-item p,
.risk-foot,
.todo-item p,
.detail-block span,
.detail-item span {
  color: var(--el-text-color-secondary);
}

.status-head h3,
.capability-item h3,
.risk-item h3,
.todo-item h4 {
  margin: 0;
  color: var(--el-text-color-primary);
}

.status-head h3 {
  margin-top: 6px;
  font-size: 24px;
}

.status-title-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.status-rate-tag {
  border-color: rgb(22 163 74 / 22%);
}

.status-summary,
.metric-note,
.capability-item p,
.risk-item p,
.todo-item p,
.detail-block p {
  margin: 0;
  font-size: 13px;
  line-height: 1.8;
}

.status-meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.status-meta-item,
.detail-item {
  padding: 14px;
  background: rgb(248 250 252);
  border: 1px solid rgb(226 232 240 / 85%);
  border-radius: 16px;

  span,
  strong {
    display: block;
  }

  strong {
    margin-top: 8px;
    font-size: 16px;
    color: var(--el-text-color-primary);
  }
}

.status-systems {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.status-tags,
.metric-grid,
.participant-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.metric-card {
  background: var(--ai-surface-gradient);

  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.metric-label {
  font-size: 13px;
}

.metric-value {
  font-size: 28px;
  line-height: 1.2;
  color: var(--el-text-color-primary);
}

.content-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.card-head {
  font-weight: 600;
}

.capability-list,
.risk-list,
.todo-panel,
.detail-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.capability-item,
.risk-item,
.todo-item,
.detail-block {
  padding: 16px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
  box-shadow: 0 8px 20px rgb(15 23 42 / 4%);
}

.capability-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-between;
}

.capability-item h3,
.risk-item h3,
.todo-item h4 {
  margin-bottom: 8px;
  font-size: 16px;
}

.capability-side {
  min-width: 92px;
  text-align: right;

  strong,
  span {
    display: block;
  }

  strong {
    font-size: 20px;
    color: #1d4ed8;
  }

  span {
    margin-top: 6px;
    font-size: 12px;
  }
}

.risk-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 0.82fr);
  gap: 14px;
}

.risk-foot {
  margin-top: 10px;
  font-size: 12px;
}

.todo-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.todo-dot {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  margin-top: 6px;
  background: #16a34a;
  border-radius: 999px;

  &.is-高 {
    background: var(--ai-tag-risk-high);
  }

  &.is-中 {
    background: var(--ai-tag-risk-medium);
  }
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.detail-block {
  span {
    display: block;
    margin-bottom: 8px;
    font-size: 12px;
  }

  p {
    color: var(--el-text-color-primary);
  }
}

@media (width <= 1180px) {
  .hero-panel,
  .content-grid,
  .metric-grid,
  .risk-layout {
    grid-template-columns: 1fr;
  }
}

@media (width <= 768px) {
  .hero-copy {
    padding: 20px;
    border-radius: 18px;

    h1 {
      font-size: 28px;
    }
  }

  .status-meta,
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .capability-item {
    flex-direction: column;
  }

  .capability-side {
    min-width: auto;
    text-align: left;
  }
}
</style>
