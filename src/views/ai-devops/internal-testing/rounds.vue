<script setup lang="ts">
import { computed } from "vue";
import { testRounds, tagType } from "./data";

defineOptions({ name: "InternalTestRounds" });

const stats = computed(() => [
  { label: "测试轮次", value: testRounds.length, type: "primary" as const },
  {
    label: "发现问题",
    value: testRounds.reduce((sum, item) => sum + item.issueCount, 0),
    type: "warning" as const
  },
  {
    label: "回归中",
    value: testRounds.filter(item => item.regressionStatus === "回归中").length,
    type: "info" as const
  },
  {
    label: "已完成",
    value: testRounds.filter(item => item.currentStatus === "已完成").length,
    type: "success" as const
  }
]);
</script>

<template>
  <div class="internal-page">
    <section class="page-hero">
      <div>
        <span>内部测试</span>
        <h1>测试轮次</h1>
        <p>管理内部测试轮次和测试范围，集中查看缺陷数量、通过率和当前状态。</p>
      </div>
      <el-tag type="primary" effect="dark" round>轮次管理</el-tag>
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
          <span>测试轮次列表</span
          ><el-tag type="info" effect="plain">测试范围</el-tag>
        </div></template
      ><el-table :data="testRounds" stripe
        ><el-table-column
          prop="roundName"
          label="轮次名称"
          min-width="170" /><el-table-column
          prop="testScope"
          label="测试范围"
          min-width="260" /><el-table-column
          prop="startTime"
          label="开始时间"
          width="130" /><el-table-column label="当前状态" width="110"
          ><template #default="{ row }"
            ><el-tag :type="tagType(row.currentStatus)" effect="light" round>{{
              row.currentStatus
            }}</el-tag></template
          ></el-table-column
        ><el-table-column
          prop="issueCount"
          label="发现问题数"
          width="105" /><el-table-column label="回归状态" width="110"
          ><template #default="{ row }"
            ><el-tag
              :type="tagType(row.regressionStatus)"
              effect="plain"
              round
              >{{ row.regressionStatus }}</el-tag
            ></template
          ></el-table-column
        ><el-table-column
          prop="testOwner"
          label="测试负责人"
          width="120" /><el-table-column
          prop="passRate"
          label="通过率"
          width="90" /></el-table
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
