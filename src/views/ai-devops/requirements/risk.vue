<script setup lang="ts">
import { computed } from "vue";
import { requirementRiskRecords, riskTrendData, tagType } from "./data";

defineOptions({
  name: "RequirementRisk"
});

const riskStats = computed(() => [
  {
    label: "风险总数",
    value: requirementRiskRecords.length,
    type: "primary"
  },
  {
    label: "高风险",
    value: requirementRiskRecords.filter(item => item.riskLevel === "高")
      .length,
    type: "danger"
  },
  {
    label: "处理中",
    value: requirementRiskRecords.filter(
      item => item.currentStatus === "处理中"
    ).length,
    type: "warning"
  },
  {
    label: "已缓解",
    value: requirementRiskRecords.filter(
      item => item.currentStatus === "已缓解"
    ).length,
    type: "success"
  }
]);

const topSuggestions = computed(() => requirementRiskRecords.slice(0, 3));
</script>

<template>
  <div class="risk-page">
    <section class="page-hero">
      <div>
        <span>需求与设计</span>
        <h1>需求风险</h1>
        <p>
          展示需求阶段识别出的风险、AI
          处理建议、当前状态和趋势变化，帮助提前收敛不确定性。
        </p>
      </div>
      <el-tag type="danger" effect="dark" round>风险识别</el-tag>
    </section>

    <section class="stats-grid">
      <el-card
        v-for="item in riskStats"
        :key="item.label"
        shadow="never"
        class="stat-card"
      >
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
        <el-tag :type="item.type" effect="plain" round>当前</el-tag>
      </el-card>
    </section>

    <section class="content-grid">
      <el-card shadow="never" class="section-card table-card">
        <template #header>
          <div class="card-head">
            <span>风险列表</span>
            <el-tag type="danger" effect="plain">需求阶段</el-tag>
          </div>
        </template>
        <el-table :data="requirementRiskRecords" stripe>
          <el-table-column prop="riskName" label="风险名称" min-width="220" />
          <el-table-column
            prop="relatedRequirement"
            label="关联需求"
            min-width="230"
          />
          <el-table-column label="风险等级" width="100">
            <template #default="{ row }">
              <el-tag :type="tagType(row.riskLevel)" effect="dark" round>
                {{ row.riskLevel }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="riskType" label="风险类型" width="110" />
          <el-table-column
            prop="aiSuggestion"
            label="AI 建议"
            min-width="280"
          />
          <el-table-column prop="handler" label="处理人" width="100" />
          <el-table-column label="当前状态" width="110">
            <template #default="{ row }">
              <el-tag :type="tagType(row.currentStatus)" effect="light" round>
                {{ row.currentStatus }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <div class="side-stack">
        <el-card shadow="never" class="section-card">
          <template #header>
            <div class="card-head">
              <span>AI 风险建议</span>
              <el-tag type="warning" effect="plain">优先处理</el-tag>
            </div>
          </template>
          <div class="suggestion-list">
            <article v-for="item in topSuggestions" :key="item.id">
              <div>
                <h3>{{ item.riskName }}</h3>
                <p>{{ item.aiSuggestion }}</p>
              </div>
              <el-tag :type="tagType(item.riskLevel)" effect="light" round>
                {{ item.riskLevel }}
              </el-tag>
            </article>
          </div>
        </el-card>

        <el-card shadow="never" class="section-card">
          <template #header>
            <div class="card-head">
              <span>风险趋势</span>
              <el-tag type="info" effect="plain">近五日</el-tag>
            </div>
          </template>
          <div class="trend-list">
            <div
              v-for="item in riskTrendData"
              :key="item.day"
              class="trend-item"
            >
              <span>{{ item.day }}</span>
              <div class="trend-bars">
                <i class="high" :style="{ width: `${item.high * 18}%` }" />
                <i class="medium" :style="{ width: `${item.medium * 14}%` }" />
                <i class="low" :style="{ width: `${item.low * 12}%` }" />
              </div>
              <strong>{{ item.high + item.medium + item.low }}</strong>
            </div>
          </div>
        </el-card>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.risk-page {
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
.content-grid {
  display: grid;
  gap: 18px;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.content-grid {
  grid-template-columns: minmax(0, 1.35fr) minmax(360px, 0.65fr);
}

.stat-card,
.section-card {
  border: var(--ai-card-border);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-sm);
}

.stat-card :deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-card span {
  color: var(--el-text-color-secondary);
}

.stat-card strong {
  font-size: 30px;
}

.card-head,
.suggestion-list article,
.trend-item {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.card-head {
  font-weight: 600;
}

.side-stack,
.suggestion-list,
.trend-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.suggestion-list article {
  align-items: flex-start;
  padding: 14px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);

  h3 {
    margin: 0;
    font-size: 15px;
  }

  p {
    margin: 8px 0 0;
    line-height: 1.7;
    color: var(--el-text-color-secondary);
  }
}

.trend-item {
  span,
  strong {
    flex: none;
    width: 42px;
  }
}

.trend-bars {
  display: flex;
  flex: 1;
  gap: 4px;
  height: 10px;
  overflow: hidden;
  background: #eef2f7;
  border-radius: 999px;

  i {
    display: block;
    min-width: 10px;
    border-radius: 999px;
  }

  .high {
    background: #dc2626;
  }

  .medium {
    background: #d97706;
  }

  .low {
    background: #16a34a;
  }
}

@media (width <= 1280px) {
  .stats-grid,
  .content-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width <= 768px) {
  .page-hero {
    flex-direction: column;
  }

  .stats-grid,
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
