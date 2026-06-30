<script setup lang="ts">
import { computed } from "vue";
import { regressionRecords, tagType } from "./data";

defineOptions({ name: "RegressionValidation" });

const stats = computed(() => [
  {
    label: "回归任务",
    value: regressionRecords.length,
    type: "primary" as const
  },
  {
    label: "通过",
    value: regressionRecords.filter(item => item.passed === "是").length,
    type: "success" as const
  },
  {
    label: "待确认",
    value: regressionRecords.filter(item => item.passed === "待确认").length,
    type: "warning" as const
  },
  {
    label: "失败",
    value: regressionRecords.filter(item => item.validationResult === "失败")
      .length,
    type: "danger" as const
  }
]);
</script>

<template>
  <div class="internal-page">
    <section class="page-hero">
      <div>
        <span>内部测试</span>
        <h1>回归验证</h1>
        <p>
          展示问题修复后的回归任务、关联问题、验证结果、失败原因和待确认项。
        </p>
      </div>
      <el-tag type="primary" effect="dark" round>修复复测</el-tag>
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
          <span>回归任务列表</span
          ><el-tag type="warning" effect="plain">待确认项</el-tag>
        </div></template
      ><el-table :data="regressionRecords" stripe
        ><el-table-column
          prop="regressionTask"
          label="回归任务"
          min-width="220" /><el-table-column
          prop="relatedIssue"
          label="关联问题"
          min-width="240" /><el-table-column
          prop="validationScope"
          label="验证范围"
          min-width="220" /><el-table-column label="验证结果" width="110"
          ><template #default="{ row }"
            ><el-tag
              :type="tagType(row.validationResult)"
              effect="light"
              round
              >{{ row.validationResult }}</el-tag
            ></template
          ></el-table-column
        ><el-table-column label="是否通过" width="100"
          ><template #default="{ row }"
            ><el-tag :type="tagType(row.passed)" effect="plain" round>{{
              row.passed
            }}</el-tag></template
          ></el-table-column
        ><el-table-column
          prop="validator"
          label="验证人"
          width="120" /><el-table-column
          prop="updatedAt"
          label="更新时间"
          width="130" /><el-table-column
          prop="pendingItems"
          label="待确认项"
          min-width="180" /></el-table
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
