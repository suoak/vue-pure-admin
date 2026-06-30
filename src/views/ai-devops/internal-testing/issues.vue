<script setup lang="ts">
import { computed } from "vue";
import { internalIssues, tagType } from "./data";

defineOptions({ name: "IssueTracking" });

const stats = computed(() => [
  { label: "问题总数", value: internalIssues.length, type: "primary" as const },
  {
    label: "处理中",
    value: internalIssues.filter(item => item.processStatus === "处理中")
      .length,
    type: "warning" as const
  },
  {
    label: "待验证",
    value: internalIssues.filter(item => item.processStatus === "待验证")
      .length,
    type: "info" as const
  },
  {
    label: "已关闭",
    value: internalIssues.filter(item => item.processStatus === "已关闭")
      .length,
    type: "success" as const
  }
]);
</script>

<template>
  <div class="internal-page">
    <section class="page-hero">
      <div>
        <span>内部测试</span>
        <h1>问题跟踪</h1>
        <p>跟踪内部测试阶段的问题等级、处理状态、AI 建议、责任人和关闭情况。</p>
      </div>
      <el-tag type="warning" effect="dark" round>问题闭环</el-tag>
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
    <el-card shadow="never" class="section-card"
      ><template #header
        ><div class="card-head">
          <span>问题列表</span
          ><el-tag type="info" effect="plain">AI 建议</el-tag>
        </div></template
      ><el-table :data="internalIssues" stripe
        ><el-table-column
          prop="issueTitle"
          label="问题标题"
          min-width="230" /><el-table-column
          prop="module"
          label="所属模块"
          width="130" /><el-table-column label="问题等级" width="100"
          ><template #default="{ row }"
            ><el-tag :type="tagType(row.issueLevel)" effect="dark" round>{{
              row.issueLevel
            }}</el-tag></template
          ></el-table-column
        ><el-table-column
          prop="aiSuggestion"
          label="AI 建议"
          min-width="280" /><el-table-column label="处理状态" width="110"
          ><template #default="{ row }"
            ><el-tag :type="tagType(row.processStatus)" effect="light" round>{{
              row.processStatus
            }}</el-tag></template
          ></el-table-column
        ><el-table-column
          prop="owner"
          label="负责人"
          width="120" /><el-table-column
          prop="updatedAt"
          label="更新时间"
          width="130" /></el-table
    ></el-card>
  </div>
</template>

<style lang="scss" scoped>
.internal-page {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
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

.card-head {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

@media (width <= 1280px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width <= 768px) {
  .page-hero {
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
