<script setup lang="ts">
import { computed, ref } from "vue";
import { integrationDefects, tagType, type IntegrationDefect } from "./data";

defineOptions({ name: "IntegrationDefectAnalysis" });

const selectedDefect = ref<IntegrationDefect>(integrationDefects[0]);
const stats = computed(() => [
  {
    label: "缺陷总数",
    value: integrationDefects.length,
    type: "primary" as const
  },
  {
    label: "高严重度",
    value: integrationDefects.filter(item =>
      ["严重", "高"].includes(item.severity)
    ).length,
    type: "danger" as const
  },
  {
    label: "处理中",
    value: integrationDefects.filter(item => item.processStatus === "处理中")
      .length,
    type: "warning" as const
  },
  {
    label: "已关闭",
    value: integrationDefects.filter(item => item.processStatus === "已关闭")
      .length,
    type: "success" as const
  }
]);
</script>

<template>
  <div class="testing-page">
    <section class="page-hero">
      <div>
        <span>集成测试</span>
        <h1>缺陷分析</h1>
        <p>展示集成测试中发现的缺陷、AI 原因分析、影响范围和修复建议。</p>
      </div>
      <el-tag type="danger" effect="dark" round>缺陷归因</el-tag>
    </section>
    <section class="stats-grid">
      <el-card
        v-for="item in stats"
        :key="item.label"
        shadow="never"
        class="stat-card"
        ><span>{{ item.label }}</span
        ><strong>{{ item.value }}</strong
        ><el-tag :type="item.type" effect="plain" round>当前</el-tag></el-card
      >
    </section>
    <section class="content-grid two-col">
      <el-card shadow="never" class="section-card"
        ><template #header
          ><div class="card-head">
            <span>缺陷列表</span
            ><el-tag type="info" effect="plain">AI 原因分析</el-tag>
          </div></template
        >
        <el-table
          :data="integrationDefects"
          stripe
          highlight-current-row
          @row-click="row => (selectedDefect = row)"
        >
          <el-table-column
            prop="defectTitle"
            label="缺陷标题"
            min-width="230"
          />
          <el-table-column prop="module" label="关联模块" width="130" />
          <el-table-column label="严重等级" width="100"
            ><template #default="{ row }"
              ><el-tag :type="tagType(row.severity)" effect="dark" round>{{
                row.severity
              }}</el-tag></template
            ></el-table-column
          >
          <el-table-column prop="defectType" label="缺陷类型" width="110" />
          <el-table-column prop="aiAnalysis" label="AI 分析" min-width="260" />
          <el-table-column label="处理状态" width="110"
            ><template #default="{ row }"
              ><el-tag
                :type="tagType(row.processStatus)"
                effect="light"
                round
                >{{ row.processStatus }}</el-tag
              ></template
            ></el-table-column
          >
          <el-table-column prop="owner" label="负责人" width="120" />
        </el-table>
      </el-card>
      <el-card shadow="never" class="section-card detail-card"
        ><template #header
          ><div class="card-head">
            <span>影响范围与修复建议</span
            ><el-tag :type="tagType(selectedDefect.severity)" effect="plain">{{
              selectedDefect.severity
            }}</el-tag>
          </div></template
        >
        <h2>{{ selectedDefect.defectTitle }}</h2>
        <div class="detail-block">
          <h3>AI 原因分析</h3>
          <p>{{ selectedDefect.aiAnalysis }}</p>
        </div>
        <div class="detail-block">
          <h3>影响范围</h3>
          <p>{{ selectedDefect.impactScope }}</p>
        </div>
        <div class="detail-block">
          <h3>修复建议</h3>
          <p>{{ selectedDefect.fixSuggestion }}</p>
        </div></el-card
      >
    </section>
  </div>
</template>

<style lang="scss" scoped>
.testing-page {
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
}

.page-hero h1 {
  margin: 10px 0 12px;
  font-size: 34px;
}

.page-hero p {
  max-width: 820px;
  margin: 0;
  line-height: 1.85;
  color: rgb(255 255 255 / 86%);
}

.stats-grid,
.content-grid {
  display: grid;
  gap: 18px;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.two-col {
  grid-template-columns: minmax(0, 1.35fr) minmax(380px, 0.65fr);
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

.stat-card span,
.detail-block p {
  color: var(--el-text-color-secondary);
}

.stat-card strong {
  font-size: 30px;
}

.card-head {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

.detail-card h2 {
  margin: 0 0 14px;
  font-size: 20px;
}

.detail-block {
  padding: 14px;
  margin-top: 12px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
}

.detail-block h3 {
  margin: 0 0 8px;
  font-size: 15px;
}

.detail-block p {
  margin: 0;
  line-height: 1.8;
}

@media (width <= 1280px) {
  .stats-grid,
  .two-col {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width <= 768px) {
  .page-hero {
    flex-direction: column;
  }

  .stats-grid,
  .two-col {
    grid-template-columns: 1fr;
  }
}
</style>
