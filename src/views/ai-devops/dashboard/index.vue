<script setup lang="ts">
import { computed, ref } from "vue";
import {
  collaborationLoop,
  collaborationStages,
  type CollaborationTask,
  dashboardMetrics,
  executiveSignals,
  recentTasks,
  confirmationDistribution,
  taskTrend
} from "./data";
import TaskTrendChart from "./components/TaskTrendChart.vue";
import ConfirmationChart from "./components/ConfirmationChart.vue";

defineOptions({
  name: "AiDevOpsDashboard"
});

const activeTaskStatus = ref<"全部" | CollaborationTask["status"]>("全部");
const detailVisible = ref(false);
const currentTask = ref<CollaborationTask | null>(null);

const taskStatusOptions = [
  "全部",
  "进行中",
  "待确认",
  "已完成",
  "高风险"
] as const;

const filteredTasks = computed(() => {
  if (activeTaskStatus.value === "全部") return recentTasks;
  return recentTasks.filter(item => item.status === activeTaskStatus.value);
});

const taskStatusSummary = computed(() => {
  return taskStatusOptions.map(status => ({
    label: status,
    count:
      status === "全部"
        ? recentTasks.length
        : recentTasks.filter(item => item.status === status).length
  }));
});

function riskTagType(level: string) {
  if (level === "高") return "danger";
  if (level === "中") return "warning";
  return "success";
}

function statusTagType(status: string) {
  if (status === "高风险") return "danger";
  if (status === "待确认") return "warning";
  if (status === "已完成") return "success";
  return "primary";
}

function priorityTagType(priority: string) {
  if (priority === "高") return "danger";
  if (priority === "中") return "warning";
  return "success";
}

function openTaskDetail(task: CollaborationTask) {
  currentTask.value = task;
  detailVisible.value = true;
}
</script>

<template>
  <div class="dashboard-page">
    <section class="hero-panel">
      <div class="hero-copy">
        <span class="hero-badge">首页驾驶舱</span>
        <h1>AI + DevOps 研发协作平台驾驶舱</h1>
        <p>
          围绕需求与设计、编码与评审、集成测试、内部测试，统一管理 AI
          协作任务、研发过程状态与人工确认结果。
        </p>
      </div>
      <div class="hero-side">
        <div class="hero-side-label">本周驾驶舱观察</div>
        <div class="hero-side-value">AI 协作正在从单点工具走向流程闭环</div>
        <div class="hero-side-grid">
          <div class="hero-side-item">
            <span>覆盖环节</span>
            <strong>4</strong>
          </div>
          <div class="hero-side-item">
            <span>高优任务</span>
            <strong>18</strong>
          </div>
          <div class="hero-side-item">
            <span>待确认</span>
            <strong>12</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="metrics-grid">
      <el-card
        v-for="item in dashboardMetrics"
        :key="item.label"
        shadow="hover"
        class="metric-card"
      >
        <span class="metric-label">{{ item.label }}</span>
        <strong class="metric-value" :style="{ color: item.accent }">
          {{ item.value }}
        </strong>
        <span class="metric-note">{{ item.note }}</span>
      </el-card>
    </section>

    <el-card shadow="never" class="section-card">
      <template #header>
        <div class="card-head">
          <span>协作环节概览</span>
          <el-tag type="primary" effect="plain">研发流程全景</el-tag>
        </div>
      </template>
      <section class="stages-grid">
        <article
          v-for="item in collaborationStages"
          :key="item.title"
          class="stage-card"
        >
          <div class="stage-top">
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.aiCapability }}</p>
            </div>
            <el-tag :type="riskTagType(item.riskLevel)" effect="dark" round>
              风险 {{ item.riskLevel }}
            </el-tag>
          </div>
          <div class="stage-owner">{{ item.owner }}</div>
          <div class="stage-metrics">
            <div class="stage-metric">
              <span>当前状态</span>
              <strong>{{ item.status }}</strong>
            </div>
            <div class="stage-metric">
              <span>待处理数量</span>
              <strong>{{ item.pendingCount }}</strong>
            </div>
          </div>
          <div class="stage-progress">
            <div class="stage-progress-row">
              <span>AI 覆盖率</span>
              <strong>{{ item.aiCoverage }}%</strong>
            </div>
            <el-progress
              :percentage="item.aiCoverage"
              :stroke-width="8"
              :show-text="false"
              color="#2563eb"
            />
          </div>
          <div class="stage-progress">
            <div class="stage-progress-row">
              <span>闭环进度</span>
              <strong>{{ item.closureRate }}%</strong>
            </div>
            <el-progress
              :percentage="item.closureRate"
              :stroke-width="8"
              :show-text="false"
              color="#0f9d8f"
            />
          </div>
          <div class="stage-record">
            <span>最近一次 AI 协作记录</span>
            <p>{{ item.latestRecord }}</p>
          </div>
        </article>
      </section>
    </el-card>

    <section class="content-grid">
      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>协作任务趋势</span>
            <el-tag type="primary" effect="plain">近六日观察</el-tag>
          </div>
        </template>
        <TaskTrendChart
          :labels="taskTrend.labels"
          :task-volume="taskTrend.taskVolume"
          :confirm-volume="taskTrend.confirmVolume"
        />
      </el-card>

      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>人工确认分布</span>
            <el-tag type="warning" effect="plain">当前状态</el-tag>
          </div>
        </template>
        <ConfirmationChart :data="confirmationDistribution" />
      </el-card>
    </section>

    <section class="content-grid">
      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>AI 协作闭环</span>
            <el-tag type="success" effect="plain">从输入到沉淀</el-tag>
          </div>
        </template>
        <div class="loop-flow">
          <template v-for="(item, index) in collaborationLoop" :key="item">
            <div class="loop-node">
              <span class="loop-index">0{{ index + 1 }}</span>
              <strong>{{ item }}</strong>
            </div>
            <div v-if="index < collaborationLoop.length - 1" class="loop-arrow">
              <span />
            </div>
          </template>
        </div>
      </el-card>

      <el-card shadow="never" class="section-card summary-card">
        <template #header>
          <div class="card-head">
            <span>驾驶舱提示</span>
            <el-tag type="warning" effect="plain">领导视角</el-tag>
          </div>
        </template>
        <div class="summary-list">
          <div
            v-for="item in executiveSignals"
            :key="item.title"
            class="summary-item"
          >
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </el-card>
    </section>

    <el-card shadow="never" class="section-card">
      <template #header>
        <div class="card-head">
          <span>近期 AI 协作任务</span>
          <el-tag type="info" effect="plain">研发协作记录</el-tag>
        </div>
      </template>
      <div class="task-toolbar">
        <div class="task-summary-list">
          <button
            v-for="item in taskStatusSummary"
            :key="item.label"
            type="button"
            :class="[
              'task-summary-item',
              activeTaskStatus === item.label && 'is-active'
            ]"
            @click="activeTaskStatus = item.label"
          >
            <span>{{ item.label }}</span>
            <strong>{{ item.count }}</strong>
          </button>
        </div>
        <div class="task-toolbar-tip">
          当前筛选：<strong>{{ activeTaskStatus }}</strong>
        </div>
      </div>
      <el-table :data="filteredTasks" stripe>
        <el-table-column prop="taskName" label="任务名称" min-width="220" />
        <el-table-column prop="stage" label="协作环节" width="140" />
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
        <el-table-column label="操作" width="110" fixed="right">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              @click="openTaskDetail(row as CollaborationTask)"
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-drawer
      v-model="detailVisible"
      :title="currentTask?.taskName ?? '任务详情'"
      size="40%"
    >
      <template v-if="currentTask">
        <div class="task-detail">
          <div class="task-detail-grid">
            <div class="task-detail-item">
              <span>协作环节</span>
              <strong>{{ currentTask.stage }}</strong>
            </div>
            <div class="task-detail-item">
              <span>负责人</span>
              <strong>{{ currentTask.owner }}</strong>
            </div>
            <div class="task-detail-item">
              <span>状态</span>
              <el-tag
                :type="statusTagType(currentTask.status)"
                effect="light"
                round
              >
                {{ currentTask.status }}
              </el-tag>
            </div>
            <div class="task-detail-item">
              <span>优先级</span>
              <el-tag
                :type="priorityTagType(currentTask.priority)"
                effect="plain"
                round
              >
                {{ currentTask.priority }}
              </el-tag>
            </div>
          </div>

          <div class="task-detail-block">
            <span>AI 输出摘要</span>
            <p>{{ currentTask.aiOutput }}</p>
          </div>

          <div class="task-detail-block">
            <span>当前决策</span>
            <p>{{ currentTask.latestDecision }}</p>
          </div>

          <div class="task-detail-block">
            <span>下一步动作</span>
            <p>{{ currentTask.nextAction }}</p>
          </div>

          <div class="task-detail-block">
            <span>参与角色</span>
            <div class="participant-list">
              <el-tag
                v-for="item in currentTask.participants"
                :key="item"
                effect="plain"
                round
              >
                {{ item }}
              </el-tag>
            </div>
          </div>

          <div class="task-detail-foot">
            最近更新时间：{{ currentTask.updatedAt }}
          </div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 2px 0 12px;
}

.hero-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.85fr);
  gap: 18px;
  padding: 26px;
  overflow: hidden;
  color: #fff;
  background: var(--ai-hero-gradient);
  border-radius: 24px;
  box-shadow: var(--ai-card-shadow-md);
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

.hero-copy h1 {
  margin: 10px 0 12px;
  font-size: 36px;
  line-height: 1.12;
}

.hero-copy p {
  max-width: 860px;
  margin: 0;
  font-size: 15px;
  line-height: 1.85;
  color: rgb(255 255 255 / 88%);
}

.hero-side {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: rgb(255 255 255 / 10%);
  border: 1px solid rgb(255 255 255 / 16%);
  border-radius: 18px;
  backdrop-filter: blur(10px);
}

.hero-side-label {
  font-size: 12px;
  color: rgb(255 255 255 / 70%);
}

.hero-side-value {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.45;
}

.hero-side-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.hero-side-item {
  padding: 14px 12px;
  background: rgb(255 255 255 / 10%);
  border-radius: 14px;

  span,
  strong {
    display: block;
  }

  span {
    font-size: 12px;
    color: rgb(255 255 255 / 72%);
  }

  strong {
    margin-top: 8px;
    font-size: 22px;
  }
}

.metrics-grid,
.stages-grid,
.content-grid {
  display: grid;
  gap: 18px;
}

.metrics-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stages-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.content-grid {
  grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.7fr);
}

.section-card,
.metric-card {
  border: var(--ai-card-border);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-sm);
}

.metric-card {
  background: var(--ai-surface-gradient);

  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.metric-label,
.metric-note,
.stage-top p,
.stage-record span,
.stage-record p,
.summary-item p {
  color: var(--el-text-color-secondary);
}

.metric-label {
  font-size: 13px;
}

.metric-value {
  font-size: 30px;
  line-height: 1.2;
}

.metric-note,
.stage-top p,
.stage-record span,
.stage-record p,
.summary-item p {
  font-size: 13px;
  line-height: 1.75;
}

.card-head {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

.stage-card,
.summary-item {
  padding: 18px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
  box-shadow: 0 8px 20px rgb(15 23 42 / 4%);
}

.stage-top {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  justify-content: space-between;

  h3 {
    margin: 0 0 8px;
    font-size: 18px;
    color: var(--el-text-color-primary);
  }

  p {
    margin: 0;
  }
}

.stage-owner {
  display: inline-flex;
  padding: 4px 10px;
  margin-top: 14px;
  font-size: 12px;
  color: #1d4ed8;
  background: rgb(37 99 235 / 8%);
  border-radius: 999px;
}

.stage-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 18px 0;
}

.stage-metric {
  padding: 14px;
  background: rgb(248 250 252);
  border: 1px solid rgb(226 232 240 / 85%);
  border-radius: 16px;

  span,
  strong {
    display: block;
  }

  span {
    margin-bottom: 8px;
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }

  strong {
    font-size: 18px;
    color: var(--el-text-color-primary);
  }
}

.stage-progress {
  margin-bottom: 14px;
}

.stage-progress-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--el-text-color-secondary);

  strong {
    color: var(--el-text-color-primary);
  }
}

.stage-record span {
  display: block;
  margin-bottom: 8px;
}

.stage-record p {
  margin: 0;
}

.loop-flow {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.loop-node {
  display: flex;
  flex: 1 1 150px;
  flex-direction: column;
  gap: 8px;
  min-width: 140px;
  padding: 18px 16px;
  text-align: center;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(191 219 254 / 88%);
  border-radius: var(--ai-card-radius-md);
  box-shadow: 0 8px 18px rgb(37 99 235 / 6%);

  strong {
    font-size: 16px;
    color: var(--el-text-color-primary);
  }
}

.loop-index {
  font-size: 12px;
  color: #2563eb;
}

.loop-arrow {
  display: flex;
  flex: 0 0 24px;
  justify-content: center;

  span {
    position: relative;
    display: block;
    width: 100%;
    height: 2px;
    margin-top: -2px;
    background: linear-gradient(90deg, #60a5fa, #0ea5e9);

    &::after {
      position: absolute;
      top: -4px;
      right: -1px;
      width: 0;
      height: 0;
      content: "";
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 8px solid #0ea5e9;
    }
  }
}

.summary-card {
  :deep(.el-card__body) {
    display: flex;
    height: 100%;
  }
}

.summary-list {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 14px;
}

.summary-item h3 {
  margin: 0 0 8px;
  font-size: 16px;
  color: var(--el-text-color-primary);
}

.summary-item p {
  margin: 0;
}

.task-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.task-summary-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.task-summary-item {
  display: flex;
  gap: 12px;
  align-items: center;
  min-width: 108px;
  padding: 10px 14px;
  color: var(--el-text-color-regular);
  cursor: pointer;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: 16px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  span,
  strong {
    display: block;
  }

  span {
    font-size: 13px;
  }

  strong {
    font-size: 18px;
    color: var(--el-text-color-primary);
  }

  &:hover,
  &.is-active {
    border-color: rgb(96 165 250);
    box-shadow: 0 10px 22px rgb(37 99 235 / 10%);
  }

  &.is-active {
    color: #1d4ed8;
    background: linear-gradient(180deg, rgb(239 246 255), rgb(255 255 255));
  }
}

.task-toolbar-tip {
  font-size: 13px;
  color: var(--el-text-color-secondary);

  strong {
    color: var(--el-text-color-primary);
  }
}

.task-detail {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.task-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.task-detail-item,
.task-detail-block {
  padding: 16px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
  box-shadow: 0 8px 20px rgb(15 23 42 / 4%);
}

.task-detail-item {
  span,
  strong {
    display: block;
  }

  span {
    margin-bottom: 8px;
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }

  strong {
    font-size: 16px;
    color: var(--el-text-color-primary);
  }
}

.task-detail-block {
  span {
    display: block;
    margin-bottom: 8px;
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }

  p {
    margin: 0;
    line-height: 1.8;
    color: var(--el-text-color-primary);
  }
}

.participant-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.task-detail-foot {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

@media (width <= 1180px) {
  .hero-panel,
  .metrics-grid,
  .stages-grid,
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (width <= 768px) {
  .hero-panel {
    padding: 20px;
    border-radius: 18px;
  }

  .hero-copy h1 {
    font-size: 30px;
  }

  .hero-side-grid,
  .stage-metrics,
  .task-detail-grid {
    grid-template-columns: 1fr;
  }

  .loop-flow {
    flex-direction: column;
    align-items: stretch;
  }

  .loop-arrow {
    flex: 0 0 auto;
    width: 2px;
    height: 24px;
    margin: 0 auto;

    span {
      width: 2px;
      height: 100%;
      margin-top: 0;
      background: linear-gradient(180deg, #60a5fa, #0ea5e9);

      &::after {
        top: auto;
        right: -4px;
        bottom: -1px;
        border-top: 8px solid #0ea5e9;
        border-right: 5px solid transparent;
        border-bottom: 0;
        border-left: 5px solid transparent;
      }
    }
  }
}
</style>
