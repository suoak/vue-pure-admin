<script setup lang="ts">
import { computed } from "vue";
import { developmentTasks, iterationProgress, tagType } from "./data";

defineOptions({
  name: "DevelopmentTasks"
});

const stats = computed(() => [
  {
    label: "开发任务",
    value: developmentTasks.length,
    note: "当前迭代纳入跟踪",
    type: "primary" as const
  },
  {
    label: "构建通过",
    value: developmentTasks.filter(item => item.buildStatus === "已通过")
      .length,
    note: "可进入评审或合入",
    type: "success" as const
  },
  {
    label: "待评审任务",
    value: developmentTasks.filter(item => item.devStatus === "待评审").length,
    note: "需人工确认",
    type: "warning" as const
  },
  {
    label: "构建异常",
    value: developmentTasks.filter(item => item.buildStatus === "失败待修复")
      .length,
    note: "需优先处理",
    type: "danger" as const
  }
]);

const buildStatusList = computed(() => {
  const statuses = ["未触发", "构建中", "已通过", "失败待修复"];
  return statuses.map(status => ({
    status,
    count: developmentTasks.filter(item => item.buildStatus === status).length
  }));
});

const pendingReviews = computed(() =>
  developmentTasks.filter(
    item => item.devStatus === "待评审" || item.aiParticipation === "人工确认中"
  )
);
</script>

<template>
  <div class="coding-page">
    <section class="page-hero">
      <div>
        <span>编码与评审</span>
        <h1>开发任务</h1>
        <p>
          展示开发任务、负责人、当前进度和构建状态，帮助管理层快速判断本轮迭代交付节奏。
        </p>
      </div>
      <el-tag type="primary" effect="dark" round>当前迭代</el-tag>
    </section>

    <section class="stats-grid">
      <el-card
        v-for="item in stats"
        :key="item.label"
        shadow="never"
        class="stat-card"
      >
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
        <el-tag :type="item.type" effect="plain" round>{{ item.note }}</el-tag>
      </el-card>
    </section>

    <section class="content-grid main-grid">
      <el-card shadow="never" class="section-card table-card">
        <template #header>
          <div class="card-head">
            <span>任务列表</span>
            <el-tag type="primary" effect="plain">2026.06-R2</el-tag>
          </div>
        </template>
        <el-table :data="developmentTasks" stripe>
          <el-table-column prop="taskName" label="任务名称" min-width="220" />
          <el-table-column
            prop="requirement"
            label="关联需求"
            min-width="220"
          />
          <el-table-column prop="repository" label="代码仓库" width="150" />
          <el-table-column prop="branch" label="分支" min-width="190" />
          <el-table-column label="开发状态" width="110">
            <template #default="{ row }">
              <el-tag :type="tagType(row.devStatus)" effect="light" round>
                {{ row.devStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="AI 参与状态" width="130">
            <template #default="{ row }">
              <el-tag :type="tagType(row.aiParticipation)" effect="plain" round>
                {{ row.aiParticipation }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="构建状态" width="115">
            <template #default="{ row }">
              <el-tag :type="tagType(row.buildStatus)" effect="light" round>
                {{ row.buildStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="owner" label="负责人" width="100" />
        </el-table>
      </el-card>

      <div class="side-stack">
        <el-card shadow="never" class="section-card">
          <template #header>
            <div class="card-head">
              <span>当前迭代进度</span>
              <el-tag type="success" effect="plain">阶段推进</el-tag>
            </div>
          </template>
          <div class="progress-list">
            <div v-for="item in iterationProgress" :key="item.label">
              <div class="progress-row">
                <span>{{ item.label }}</span>
                <strong>{{ item.value }}%</strong>
              </div>
              <el-progress
                :percentage="item.value"
                :stroke-width="8"
                :show-text="false"
                :color="item.color"
              />
            </div>
          </div>
        </el-card>

        <el-card shadow="never" class="section-card">
          <template #header>
            <div class="card-head">
              <span>构建状态</span>
              <el-tag type="info" effect="plain">流水线</el-tag>
            </div>
          </template>
          <div class="status-list">
            <div
              v-for="item in buildStatusList"
              :key="item.status"
              class="status-item"
            >
              <span>{{ item.status }}</span>
              <strong>{{ item.count }}</strong>
            </div>
          </div>
        </el-card>
      </div>
    </section>

    <el-card shadow="never" class="section-card">
      <template #header>
        <div class="card-head">
          <span>待评审任务</span>
          <el-tag type="warning" effect="plain">人工确认</el-tag>
        </div>
      </template>
      <section class="task-card-grid">
        <article
          v-for="item in pendingReviews"
          :key="item.id"
          class="task-card"
        >
          <div>
            <h3>{{ item.taskName }}</h3>
            <p>{{ item.latestUpdate }}</p>
          </div>
          <div class="task-meta">
            <el-tag :type="tagType(item.buildStatus)" effect="light" round>{{
              item.buildStatus
            }}</el-tag>
            <span>{{ item.owner }}</span>
          </div>
        </article>
      </section>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.coding-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.page-hero {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 26px;
  color: #fff;
  background: var(--ai-hero-gradient);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-md);

  h1 {
    margin: 10px 0 12px;
    font-size: 34px;
  }

  p {
    max-width: 820px;
    margin: 0;
    line-height: 1.85;
    color: rgb(255 255 255 / 86%);
  }
}

.stats-grid,
.content-grid,
.task-card-grid {
  display: grid;
  gap: 18px;
}

.stats-grid,
.task-card-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.main-grid {
  grid-template-columns: minmax(0, 1.42fr) minmax(360px, 0.58fr);
}

.stat-card,
.section-card,
.task-card {
  border: var(--ai-card-border);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-sm);
}

.stat-card :deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-card span,
.task-card p {
  color: var(--el-text-color-secondary);
}

.stat-card strong {
  font-size: 30px;
}

.card-head,
.progress-row,
.status-item,
.task-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.card-head {
  font-weight: 600;
}

.side-stack,
.progress-list,
.status-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.status-item,
.task-card {
  padding: 14px;
  background: var(--ai-surface-gradient);
}

.task-card {
  display: flex;
  gap: 16px;
  justify-content: space-between;

  h3 {
    margin: 0;
    font-size: 16px;
  }

  p {
    margin: 10px 0 0;
    line-height: 1.75;
  }
}

.task-meta {
  flex-direction: column;
  align-items: flex-end;
  min-width: 100px;
}

@media (width <= 1280px) {
  .stats-grid,
  .task-card-grid,
  .main-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width <= 768px) {
  .page-hero {
    flex-direction: column;
  }

  .stats-grid,
  .task-card-grid,
  .main-grid {
    grid-template-columns: 1fr;
  }
}
</style>
