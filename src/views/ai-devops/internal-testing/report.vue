<script setup lang="ts">
import { computed, ref } from "vue";
import { testReports, tagType, type TestReportRecord } from "./data";

defineOptions({ name: "InternalTestReport" });

const selectedReport = ref<TestReportRecord>(testReports[0]);
const stats = computed(() => [
  { label: "报告数量", value: testReports.length, type: "primary" as const },
  {
    label: "问题数量",
    value: testReports.reduce((sum, item) => sum + item.issueCount, 0),
    type: "warning" as const
  },
  {
    label: "已生成",
    value: testReports.filter(item => item.generationStatus === "已生成")
      .length,
    type: "success" as const
  },
  {
    label: "待确认",
    value: testReports.filter(item => item.manualConfirmation === "待确认")
      .length,
    type: "info" as const
  }
]);
</script>

<template>
  <div class="internal-page">
    <section class="page-hero">
      <div>
        <span>内部测试</span>
        <h1>测试报告</h1>
        <p>
          展示 AI
          辅助生成的内部测试报告、测试摘要、问题分布、风险结论和改进建议。
        </p>
      </div>
      <el-tag type="primary" effect="dark" round>报告沉淀</el-tag>
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
    <section class="content-grid">
      <el-card shadow="never" class="section-card"
        ><template #header
          ><div class="card-head">
            <span>报告列表</span
            ><el-tag type="info" effect="plain">AI 生成</el-tag>
          </div></template
        ><el-table
          :data="testReports"
          stripe
          highlight-current-row
          @row-click="row => (selectedReport = row)"
          ><el-table-column
            prop="reportName"
            label="报告名称"
            min-width="220" /><el-table-column
            prop="testScope"
            label="测试范围"
            min-width="260" /><el-table-column
            prop="issueCount"
            label="问题数量"
            width="95" /><el-table-column label="风险等级" width="100"
            ><template #default="{ row }"
              ><el-tag :type="tagType(row.riskLevel)" effect="dark" round>{{
                row.riskLevel
              }}</el-tag></template
            ></el-table-column
          ><el-table-column label="生成状态" width="110"
            ><template #default="{ row }"
              ><el-tag
                :type="tagType(row.generationStatus)"
                effect="light"
                round
                >{{ row.generationStatus }}</el-tag
              ></template
            ></el-table-column
          ><el-table-column label="人工确认" width="110"
            ><template #default="{ row }"
              ><el-tag
                :type="tagType(row.manualConfirmation)"
                effect="plain"
                round
                >{{ row.manualConfirmation }}</el-tag
              ></template
            ></el-table-column
          ><el-table-column
            prop="generatedAt"
            label="生成时间"
            width="130" /></el-table></el-card
      ><el-card shadow="never" class="section-card summary-card"
        ><template #header
          ><div class="card-head">
            <span>报告摘要卡片</span
            ><el-tag :type="tagType(selectedReport.riskLevel)" effect="plain"
              >{{ selectedReport.riskLevel }}风险</el-tag
            >
          </div></template
        >
        <h2>{{ selectedReport.reportName }}</h2>
        <p>{{ selectedReport.summary }}</p>
        <div class="summary-grid">
          <div>
            <h3>问题分布</h3>
            <span
              v-for="item in selectedReport.issueDistribution"
              :key="item.type"
              >{{ item.type }}：{{ item.count }}</span
            >
          </div>
          <div>
            <h3>风险结论</h3>
            <p>{{ selectedReport.riskConclusion }}</p>
          </div>
          <div>
            <h3>改进建议</h3>
            <ul>
              <li v-for="item in selectedReport.improvements" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </div></el-card
      >
    </section>
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

.stats-grid,
.content-grid,
.summary-grid {
  display: grid;
  gap: 18px;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.content-grid {
  grid-template-columns: 1fr;
}

.summary-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
.summary-card p,
.summary-grid span,
ul {
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

.summary-card h2 {
  margin: 0 0 12px;
  font-size: 20px;
}

.summary-card p {
  margin: 0;
  line-height: 1.9;
}

.summary-grid div {
  padding: 14px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
}

.summary-grid h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

.summary-grid span {
  display: block;
  margin-top: 8px;
}

ul {
  padding-left: 18px;
  margin: 0;
  line-height: 1.85;
}

@media (width <= 1280px) {
  .stats-grid,
  .summary-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width <= 768px) {
  .page-hero {
    flex-direction: column;
  }

  .stats-grid,
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
