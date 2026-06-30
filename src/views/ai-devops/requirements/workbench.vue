<script setup lang="ts">
import { computed } from "vue";
import {
  requirementRecords,
  requirementRiskRecords,
  requirementUpdates,
  tagType
} from "./data";

defineOptions({
  name: "RequirementsWorkbench"
});

const stats = computed(() => [
  {
    label: "需求总数",
    value: requirementRecords.length,
    note: "本周进入协作工作台",
    type: "primary"
  },
  {
    label: "AI 分析完成",
    value: requirementRecords.filter(item => item.aiAnalysisStatus === "已完成")
      .length,
    note: "可进入设计评审",
    type: "success"
  },
  {
    label: "待处理事项",
    value: requirementRecords.filter(item => item.currentStatus !== "已确认")
      .length,
    note: "需要负责人推进",
    type: "warning"
  },
  {
    label: "高风险需求",
    value: requirementRecords.filter(item => item.riskLevel === "高").length,
    note: "需管理层关注",
    type: "danger"
  }
]);

const statusDistribution = computed(() => {
  const statuses = ["待评审", "AI 分析中", "设计评审中", "推进中", "已确认"];
  return statuses.map(status => ({
    status,
    count: requirementRecords.filter(item => item.currentStatus === status)
      .length
  }));
});

const pendingItems = computed(() => [
  ...requirementRecords
    .filter(item => ["高", "中"].includes(item.riskLevel))
    .map(item => ({
      title: item.requirementName,
      owner: item.owner,
      desc: item.latestUpdate,
      level: item.riskLevel
    })),
  ...requirementRiskRecords
    .filter(item => item.currentStatus !== "已缓解")
    .slice(0, 2)
    .map(item => ({
      title: item.riskName,
      owner: item.handler,
      desc: item.aiSuggestion,
      level: item.riskLevel
    }))
]);
</script>

<template>
  <div class="requirements-page">
    <section class="page-hero">
      <div>
        <span>需求与设计</span>
        <h1>需求工作台</h1>
        <p>
          管理需求输入、当前状态、关联设计和推进情况，支撑研发协作环节在同一页面完成跟踪。
        </p>
      </div>
      <el-tag type="primary" effect="dark" round>协作工作台</el-tag>
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
            <span>需求列表</span>
            <el-tag type="primary" effect="plain">本地 mock 数据</el-tag>
          </div>
        </template>
        <el-table :data="requirementRecords" stripe>
          <el-table-column
            prop="requirementName"
            label="需求名称"
            min-width="230"
          />
          <el-table-column prop="source" label="来源" width="130" />
          <el-table-column prop="project" label="所属项目" min-width="170" />
          <el-table-column label="当前状态" width="120">
            <template #default="{ row }">
              <el-tag :type="tagType(row.currentStatus)" effect="light" round>
                {{ row.currentStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="AI 分析状态" width="125">
            <template #default="{ row }">
              <el-tag
                :type="tagType(row.aiAnalysisStatus)"
                effect="plain"
                round
              >
                {{ row.aiAnalysisStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="设计评审状态" width="130">
            <template #default="{ row }">
              <el-tag
                :type="tagType(row.designReviewStatus)"
                effect="plain"
                round
              >
                {{ row.designReviewStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="风险等级" width="100">
            <template #default="{ row }">
              <el-tag :type="tagType(row.riskLevel)" effect="dark" round>
                {{ row.riskLevel }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="owner" label="负责人" width="100" />
          <el-table-column prop="updatedAt" label="更新时间" width="120" />
        </el-table>
      </el-card>

      <div class="side-stack">
        <el-card shadow="never" class="section-card">
          <template #header>
            <div class="card-head">
              <span>需求状态分布</span>
              <el-tag type="info" effect="plain">实时</el-tag>
            </div>
          </template>
          <div class="distribution-list">
            <div v-for="item in statusDistribution" :key="item.status">
              <div class="distribution-row">
                <span>{{ item.status }}</span>
                <strong>{{ item.count }}</strong>
              </div>
              <el-progress
                :percentage="
                  Math.round((item.count / requirementRecords.length) * 100)
                "
                :stroke-width="8"
                :show-text="false"
                color="#2563eb"
              />
            </div>
          </div>
        </el-card>

        <el-card shadow="never" class="section-card">
          <template #header>
            <div class="card-head">
              <span>最近更新记录</span>
              <el-tag type="success" effect="plain">同步</el-tag>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item v-for="item in requirementUpdates" :key="item">
              {{ item }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </div>
    </section>

    <el-card shadow="never" class="section-card">
      <template #header>
        <div class="card-head">
          <span>待处理事项</span>
          <el-tag type="warning" effect="plain">负责人推进</el-tag>
        </div>
      </template>
      <section class="pending-grid">
        <article
          v-for="item in pendingItems"
          :key="`${item.title}-${item.owner}`"
          class="pending-item"
        >
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
          <div class="pending-meta">
            <el-tag :type="tagType(item.level)" effect="light" round>
              {{ item.level }}风险
            </el-tag>
            <span>{{ item.owner }}</span>
          </div>
        </article>
      </section>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.requirements-page {
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
.pending-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.stat-card,
.section-card,
.pending-item {
  border: var(--ai-card-border);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-sm);
}

.stat-card {
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  span {
    color: var(--el-text-color-secondary);
  }

  strong {
    font-size: 30px;
    color: var(--el-text-color-primary);
  }
}

.content-grid {
  display: grid;
  gap: 18px;
}

.main-grid {
  grid-template-columns: minmax(0, 1.45fr) minmax(360px, 0.55fr);
}

.side-stack,
.distribution-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.card-head,
.distribution-row,
.pending-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.card-head {
  font-weight: 600;
}

.pending-item {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 16px;
  background: var(--ai-surface-gradient);

  h3 {
    margin: 0;
    font-size: 16px;
  }

  p {
    margin: 10px 0 0;
    line-height: 1.75;
    color: var(--el-text-color-secondary);
  }
}

.pending-meta {
  flex-direction: column;
  align-items: flex-end;
  min-width: 92px;
  color: var(--el-text-color-secondary);
}

@media (width <= 1280px) {
  .stats-grid,
  .pending-grid,
  .main-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width <= 768px) {
  .page-hero {
    flex-direction: column;
  }

  .stats-grid,
  .pending-grid,
  .main-grid {
    grid-template-columns: 1fr;
  }
}
</style>
