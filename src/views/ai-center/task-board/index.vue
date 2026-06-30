<script setup lang="ts">
import { computed, ref } from "vue";
import {
  taskBoardColumns,
  taskBoardTasks,
  type TaskBoardRecord,
  type TaskBoardStatus
} from "./data";

defineOptions({
  name: "AiTaskBoardPage"
});

const detailVisible = ref(false);
const currentTask = ref<TaskBoardRecord | null>(null);

const summaryCards = computed(() => {
  return taskBoardColumns.map(status => ({
    label: status,
    value: taskBoardTasks.filter(item => item.status === status).length
  }));
});

const groupedTasks = computed<Record<TaskBoardStatus, TaskBoardRecord[]>>(
  () => {
    return taskBoardColumns.reduce(
      (acc, status) => {
        acc[status] = taskBoardTasks.filter(item => item.status === status);
        return acc;
      },
      {} as Record<TaskBoardStatus, TaskBoardRecord[]>
    );
  }
);

function stageTagType(stage: TaskBoardRecord["stage"]) {
  if (stage === "需求与设计") return "primary";
  if (stage === "编码与评审") return "success";
  if (stage === "集成测试") return "warning";
  return "danger";
}

function priorityTagType(priority: TaskBoardRecord["priority"]) {
  if (priority === "高") return "danger";
  if (priority === "中") return "warning";
  return "success";
}

function columnTone(status: TaskBoardStatus) {
  if (status === "待分析") return "is-pending";
  if (status === "AI 执行中") return "is-running";
  if (status === "待人工确认") return "is-review";
  if (status === "已采纳") return "is-adopted";
  return "is-archived";
}

function openTaskDetail(task: TaskBoardRecord) {
  currentTask.value = task;
  detailVisible.value = true;
}
</script>

<template>
  <div class="task-board-page">
    <section class="hero-panel">
      <div class="hero-copy">
        <span class="hero-badge">AI 协作中心</span>
        <h1>AI 任务看板</h1>
        <p>
          统一展示需求与设计、编码与评审、集成测试、内部测试四个协作环节中的 AI
          任务状态，帮助领导快速观察分析进度、人工确认节奏与成果沉淀情况。
        </p>
      </div>
      <div class="hero-side">
        <span class="hero-side-label">当前看板观察</span>
        <h3>高优任务主要集中在编码与测试环节</h3>
        <p>支付链路、发布建议和失败归因任务需要重点关注人工确认与闭环时效。</p>
      </div>
    </section>

    <section class="summary-grid">
      <el-card
        v-for="item in summaryCards"
        :key="item.label"
        shadow="hover"
        class="summary-card"
      >
        <span class="summary-label">{{ item.label }}</span>
        <strong class="summary-value">{{ item.value }}</strong>
        <span class="summary-note">当前状态任务数</span>
      </el-card>
    </section>

    <el-card shadow="never" class="board-card">
      <template #header>
        <div class="card-head">
          <span>AI 协作任务流转</span>
          <el-tag type="info" effect="plain">本地 Mock 数据</el-tag>
        </div>
      </template>

      <div class="board-grid">
        <section
          v-for="status in taskBoardColumns"
          :key="status"
          :class="['board-column', columnTone(status)]"
        >
          <header class="board-column-head">
            <div>
              <h3>{{ status }}</h3>
              <p>{{ groupedTasks[status].length }} 个任务</p>
            </div>
            <span class="board-column-dot" />
          </header>

          <div class="task-list">
            <button
              v-for="task in groupedTasks[status]"
              :key="task.id"
              type="button"
              class="task-card"
              @click="openTaskDetail(task)"
            >
              <div class="task-card-top">
                <h4>{{ task.taskName }}</h4>
                <el-tag
                  :type="priorityTagType(task.priority)"
                  effect="dark"
                  round
                >
                  {{ task.priority }}优先
                </el-tag>
              </div>
              <div class="task-tag-row">
                <el-tag :type="stageTagType(task.stage)" effect="plain" round>
                  {{ task.stage }}
                </el-tag>
                <span>{{ task.aiAgent }}</span>
              </div>
              <div class="task-meta">
                <div class="task-meta-item">
                  <span>负责人</span>
                  <strong>{{ task.owner }}</strong>
                </div>
                <div class="task-meta-item">
                  <span>更新时间</span>
                  <strong>{{ task.updatedAt }}</strong>
                </div>
              </div>
            </button>
          </div>
        </section>
      </div>
    </el-card>

    <el-drawer
      v-model="detailVisible"
      :title="currentTask?.taskName ?? '任务详情'"
      size="42%"
    >
      <template v-if="currentTask">
        <div class="detail-panel">
          <div class="detail-grid">
            <div class="detail-item">
              <span>所属工序</span>
              <strong>{{ currentTask.stage }}</strong>
            </div>
            <div class="detail-item">
              <span>AI Agent</span>
              <strong>{{ currentTask.aiAgent }}</strong>
            </div>
            <div class="detail-item">
              <span>负责人</span>
              <strong>{{ currentTask.owner }}</strong>
            </div>
            <div class="detail-item">
              <span>采纳状态</span>
              <strong>{{ currentTask.adoptionStatus }}</strong>
            </div>
          </div>

          <div class="detail-block">
            <span>输入材料</span>
            <div class="material-list">
              <el-tag
                v-for="item in currentTask.inputMaterials"
                :key="item"
                effect="plain"
                round
              >
                {{ item }}
              </el-tag>
            </div>
          </div>

          <div class="detail-block">
            <span>AI 生成结果</span>
            <p>{{ currentTask.aiResult }}</p>
          </div>

          <div class="detail-block">
            <span>评审意见</span>
            <p>{{ currentTask.reviewComment }}</p>
          </div>

          <div class="detail-block">
            <span>过程记录</span>
            <div class="log-list">
              <div
                v-for="item in currentTask.processLogs"
                :key="`${item.time}-${item.content}`"
                class="log-item"
              >
                <strong>{{ item.time }}</strong>
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.task-board-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 2px 0 12px;
}

.hero-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  gap: 18px;
}

.hero-copy,
.hero-side {
  color: #fff;
  border-radius: 22px;
}

.hero-copy {
  padding: 26px;
  background: var(--ai-hero-gradient);
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

.hero-side {
  padding: 24px;
  background: linear-gradient(180deg, #10172b, #17203a);
  border: 1px solid rgb(148 163 184 / 16%);
  box-shadow: var(--ai-card-shadow-sm);

  h3 {
    margin: 8px 0 10px;
    font-size: 24px;
    line-height: 1.45;
  }

  p {
    margin: 0;
    line-height: 1.8;
    color: rgb(255 255 255 / 78%);
  }
}

.hero-badge,
.hero-side-label {
  display: inline-flex;
  padding: 6px 12px;
  font-size: 12px;
  letter-spacing: 0.08em;
  border-radius: 999px;
}

.hero-badge {
  background: rgb(255 255 255 / 12%);
  border: 1px solid rgb(255 255 255 / 16%);
}

.hero-side-label {
  color: rgb(255 255 255 / 78%);
  background: rgb(255 255 255 / 8%);
}

.summary-grid,
.board-grid,
.detail-grid {
  display: grid;
  gap: 18px;
}

.summary-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.summary-card,
.board-card {
  border: var(--ai-card-border);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-sm);
}

.summary-card {
  background: var(--ai-surface-gradient);

  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.summary-label,
.summary-note,
.board-column-head p,
.task-tag-row span,
.task-meta-item span,
.detail-item span,
.detail-block span,
.log-item p {
  color: var(--el-text-color-secondary);
}

.summary-label {
  font-size: 13px;
}

.summary-value {
  font-size: 30px;
  line-height: 1.2;
  color: var(--el-text-color-primary);
}

.summary-note,
.board-column-head p,
.task-tag-row span,
.task-meta-item span,
.detail-block p,
.log-item p {
  margin: 0;
  font-size: 13px;
  line-height: 1.8;
}

.card-head {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

.board-grid {
  grid-template-columns: repeat(5, minmax(260px, 1fr));
  align-items: start;
  padding-bottom: 4px;
  overflow-x: auto;
}

.board-column {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 540px;
  padding: 16px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
  box-shadow: 0 10px 24px rgb(15 23 42 / 5%);

  &.is-pending {
    border-top: 4px solid #64748b;
  }

  &.is-running {
    border-top: 4px solid #2563eb;
  }

  &.is-review {
    border-top: 4px solid #f59e0b;
  }

  &.is-adopted {
    border-top: 4px solid #0f9d8f;
  }

  &.is-archived {
    border-top: 4px solid #7c3aed;
  }
}

.board-column-head {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  justify-content: space-between;

  h3 {
    margin: 0 0 6px;
    font-size: 18px;
    color: var(--el-text-color-primary);
  }
}

.board-column-dot {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  margin-top: 6px;
  background: #2563eb;
  border-radius: 999px;
}

.task-list,
.detail-panel,
.material-list,
.log-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 16px;
  text-align: left;
  cursor: pointer;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: rgb(96 165 250);
    box-shadow: 0 12px 28px rgb(37 99 235 / 12%);
  }
}

.task-card-top,
.task-meta {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  justify-content: space-between;
}

.task-card-top h4 {
  margin: 0;
  font-size: 16px;
  line-height: 1.55;
  color: var(--el-text-color-primary);
}

.task-tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.task-meta {
  gap: 10px;
}

.task-meta-item {
  flex: 1;
  min-width: 0;

  span,
  strong {
    display: block;
  }

  strong {
    margin-top: 6px;
    font-size: 13px;
    color: var(--el-text-color-primary);
  }
}

.detail-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.detail-item,
.detail-block,
.log-item {
  padding: 16px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
  box-shadow: 0 8px 20px rgb(15 23 42 / 4%);
}

.detail-item {
  span,
  strong {
    display: block;
  }

  strong {
    margin-top: 8px;
    color: var(--el-text-color-primary);
  }
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

.material-list {
  flex-flow: row wrap;
}

.log-item {
  strong {
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
    color: var(--el-text-color-primary);
  }
}

@media (width <= 1280px) {
  .hero-panel,
  .summary-grid {
    grid-template-columns: 1fr;
  }
}

@media (width <= 768px) {
  .hero-copy,
  .hero-side {
    padding: 20px;
    border-radius: 18px;
  }

  .hero-copy h1,
  .hero-side h3 {
    font-size: 28px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
