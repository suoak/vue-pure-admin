<script setup lang="ts">
import { computed } from "vue";
import { manualConfirmationRecords, tagType } from "./data";

defineOptions({ name: "ManualConfirmationRecords" });

const stats = computed(() => [
  {
    label: "确认记录",
    value: manualConfirmationRecords.length,
    type: "primary" as const
  },
  {
    label: "已采纳",
    value: manualConfirmationRecords.filter(
      item => item.adoptionStatus === "已采纳"
    ).length,
    type: "success" as const
  },
  {
    label: "部分采纳",
    value: manualConfirmationRecords.filter(
      item => item.adoptionStatus === "部分采纳"
    ).length,
    type: "warning" as const
  },
  {
    label: "退回修订",
    value: manualConfirmationRecords.filter(
      item => item.confirmationConclusion === "退回修订"
    ).length,
    type: "danger" as const
  }
]);
</script>

<template>
  <div class="records-page">
    <section class="records-hero">
      <div>
        <span>AI 协作记录</span>
        <h1>人工确认记录</h1>
        <p>展示 AI 结果经过人工确认后的结论、修改建议和采纳状态。</p>
      </div>
      <el-tag type="warning" effect="dark" round>人工确认</el-tag>
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
          <span>确认记录列表</span
          ><el-tag type="info" effect="plain">确认人 / 结论 / 建议</el-tag>
        </div></template
      ><el-table :data="manualConfirmationRecords" stripe
        ><el-table-column
          prop="aiTask"
          label="AI 任务"
          min-width="220" /><el-table-column
          prop="stage"
          label="所属环节"
          width="130" /><el-table-column
          prop="generatedResult"
          label="生成结果"
          min-width="280" /><el-table-column
          prop="confirmer"
          label="确认人"
          width="120" /><el-table-column label="确认结论" width="110"
          ><template #default="{ row }"
            ><el-tag
              :type="tagType(row.confirmationConclusion)"
              effect="light"
              round
              >{{ row.confirmationConclusion }}</el-tag
            ></template
          ></el-table-column
        ><el-table-column label="采纳状态" width="110"
          ><template #default="{ row }"
            ><el-tag :type="tagType(row.adoptionStatus)" effect="plain" round>{{
              row.adoptionStatus
            }}</el-tag></template
          ></el-table-column
        ><el-table-column prop="confirmedAt" label="确认时间" width="130"
      /></el-table>
      <div class="advice-list">
        <article v-for="item in manualConfirmationRecords" :key="item.id">
          <h3>{{ item.aiTask }}</h3>
          <p>{{ item.modificationAdvice }}</p>
        </article>
      </div></el-card
    >
  </div>
</template>

<style lang="scss" scoped>
.records-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.records-hero {
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

.records-hero h1 {
  margin: 10px 0 12px;
  font-size: 34px;
}

.records-hero p {
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
.section-card,
.advice-list article {
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
.advice-list p {
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

.advice-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.advice-list article {
  padding: 14px;
  background: var(--ai-surface-gradient);
}

.advice-list h3 {
  margin: 0;
  font-size: 15px;
}

.advice-list p {
  margin: 8px 0 0;
  line-height: 1.75;
}

@media (width <= 1280px) {
  .stats-grid,
  .advice-list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width <= 768px) {
  .records-hero {
    flex-direction: column;
  }

  .stats-grid,
  .advice-list {
    grid-template-columns: 1fr;
  }
}
</style>
