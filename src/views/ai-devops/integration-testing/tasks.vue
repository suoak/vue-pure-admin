<script setup lang="ts">
import { computed } from "vue";
import { integrationTestTasks, tagType } from "./data";

defineOptions({ name: "IntegrationTestTasks" });

const stats = computed(() => [
  {
    label: "测试任务",
    value: integrationTestTasks.length,
    type: "primary" as const
  },
  {
    label: "用例总数",
    value: integrationTestTasks.reduce((sum, item) => sum + item.caseCount, 0),
    type: "info" as const
  },
  {
    label: "执行中",
    value: integrationTestTasks.filter(
      item => item.executionStatus === "执行中"
    ).length,
    type: "warning" as const
  },
  {
    label: "高风险",
    value: integrationTestTasks.filter(item => item.riskLevel === "高").length,
    type: "danger" as const
  }
]);
</script>

<template>
  <div class="testing-page">
    <section class="page-hero">
      <div>
        <span>集成测试</span>
        <h1>测试任务</h1>
        <p>
          展示集成测试任务、关联需求、执行进度和风险提示，统一跟踪跨模块验证状态。
        </p>
      </div>
      <el-tag type="primary" effect="dark" round>执行进度</el-tag>
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
        <el-tag :type="item.type" effect="plain" round>当前</el-tag>
      </el-card>
    </section>

    <section class="content-grid">
      <el-card shadow="never" class="section-card">
        <template #header
          ><div class="card-head">
            <span>测试任务列表</span
            ><el-tag type="info" effect="plain">关联需求</el-tag>
          </div></template
        >
        <el-table :data="integrationTestTasks" stripe>
          <el-table-column prop="taskName" label="测试任务" min-width="220" />
          <el-table-column
            prop="requirement"
            label="关联需求"
            min-width="220"
          />
          <el-table-column prop="testScope" label="测试范围" min-width="260" />
          <el-table-column prop="caseCount" label="用例数量" width="95" />
          <el-table-column label="执行状态" width="110"
            ><template #default="{ row }"
              ><el-tag
                :type="tagType(row.executionStatus)"
                effect="light"
                round
                >{{ row.executionStatus }}</el-tag
              ></template
            ></el-table-column
          >
          <el-table-column prop="passRate" label="通过率" width="90" />
          <el-table-column prop="owner" label="负责人" width="110" />
          <el-table-column label="风险等级" width="100"
            ><template #default="{ row }"
              ><el-tag :type="tagType(row.riskLevel)" effect="dark" round>{{
                row.riskLevel
              }}</el-tag></template
            ></el-table-column
          >
        </el-table>
      </el-card>

      <el-card shadow="never" class="section-card">
        <template #header
          ><div class="card-head">
            <span>执行进度与风险提示</span
            ><el-tag type="warning" effect="plain">重点关注</el-tag>
          </div></template
        >
        <section class="card-grid">
          <article
            v-for="item in integrationTestTasks"
            :key="item.id"
            class="info-card"
          >
            <div class="info-title">
              <h3>{{ item.taskName }}</h3>
              <el-tag :type="tagType(item.riskLevel)" effect="light" round>{{
                item.riskLevel
              }}</el-tag>
            </div>
            <el-progress :percentage="item.progress" :stroke-width="8" />
            <p>{{ item.riskHint }}</p>
          </article>
        </section>
      </el-card>
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
.content-grid,
.card-grid {
  display: grid;
  gap: 18px;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.content-grid {
  grid-template-columns: 1fr;
}

.card-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.stat-card,
.section-card,
.info-card {
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
.info-card p {
  color: var(--el-text-color-secondary);
}

.stat-card strong {
  font-size: 30px;
}

.card-head,
.info-title {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

.info-card {
  padding: 16px;
  background: var(--ai-surface-gradient);
}

.info-card h3 {
  margin: 0;
  font-size: 16px;
}

.info-card p {
  margin: 12px 0 0;
  line-height: 1.75;
}

@media (width <= 1280px) {
  .stats-grid,
  .card-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width <= 768px) {
  .page-hero {
    flex-direction: column;
  }

  .stats-grid,
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
