<script setup lang="ts">
import { computed } from "vue";
import { pipelineRecords, pipelineTrend, tagType } from "./data";

defineOptions({ name: "PipelineValidation" });

const stats = computed(() => [
  {
    label: "运行记录",
    value: pipelineRecords.length,
    type: "primary" as const
  },
  {
    label: "成功",
    value: pipelineRecords.filter(item => item.executionStatus === "成功")
      .length,
    type: "success" as const
  },
  {
    label: "失败",
    value: pipelineRecords.filter(item => item.executionStatus === "失败")
      .length,
    type: "danger" as const
  },
  {
    label: "AI 已分析",
    value: pipelineRecords.filter(item => item.aiAnalysisStatus === "已完成")
      .length,
    type: "info" as const
  }
]);
</script>

<template>
  <div class="testing-page">
    <section class="page-hero">
      <div>
        <span>集成测试</span>
        <h1>流水线验证</h1>
        <p>展示流水线执行状态、构建结果、失败原因分析、修复建议和执行趋势。</p>
      </div>
      <el-tag type="primary" effect="dark" round>流水线</el-tag>
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
            <span>流水线运行记录</span
            ><el-tag type="info" effect="plain">构建结果</el-tag>
          </div></template
        >
        <el-table :data="pipelineRecords" stripe>
          <el-table-column
            prop="pipelineName"
            label="流水线名称"
            min-width="190"
          />
          <el-table-column
            prop="relatedTask"
            label="关联任务"
            min-width="220"
          />
          <el-table-column label="执行状态" width="100"
            ><template #default="{ row }"
              ><el-tag
                :type="tagType(row.executionStatus)"
                effect="light"
                round
                >{{ row.executionStatus }}</el-tag
              ></template
            ></el-table-column
          >
          <el-table-column prop="duration" label="耗时" width="90" />
          <el-table-column
            prop="failureReason"
            label="失败原因"
            min-width="230"
          />
          <el-table-column label="AI 分析状态" width="120"
            ><template #default="{ row }"
              ><el-tag
                :type="tagType(row.aiAnalysisStatus)"
                effect="plain"
                round
                >{{ row.aiAnalysisStatus }}</el-tag
              ></template
            ></el-table-column
          >
          <el-table-column
            prop="latestRunAt"
            label="最近执行时间"
            width="130"
          />
        </el-table>
      </el-card>
      <div class="side-stack">
        <el-card shadow="never" class="section-card"
          ><template #header
            ><div class="card-head">
              <span>失败原因分析与修复建议</span
              ><el-tag type="warning" effect="plain">AI 建议</el-tag>
            </div></template
          >
          <div class="suggestion-list">
            <article
              v-for="item in pipelineRecords.filter(
                row => row.executionStatus !== '成功'
              )"
              :key="item.id"
            >
              <h3>{{ item.pipelineName }}</h3>
              <p>{{ item.failureReason }}</p>
              <strong>{{ item.suggestion }}</strong>
            </article>
          </div></el-card
        >
        <el-card shadow="never" class="section-card"
          ><template #header
            ><div class="card-head">
              <span>执行趋势</span
              ><el-tag type="success" effect="plain">近五日</el-tag>
            </div></template
          >
          <div class="trend-list">
            <div
              v-for="item in pipelineTrend"
              :key="item.day"
              class="trend-item"
            >
              <span>{{ item.day }}</span>
              <div>
                <i
                  class="success"
                  :style="{ width: `${item.success * 7}%` }"
                /><i
                  class="failed"
                  :style="{ width: `${item.failed * 12}%` }"
                />
              </div>
              <strong>{{ item.success }}/{{ item.failed }}</strong>
            </div>
          </div></el-card
        >
      </div>
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
.suggestion-list p {
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

.side-stack,
.suggestion-list,
.trend-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.suggestion-list article {
  padding: 14px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
}

.suggestion-list h3 {
  margin: 0;
  font-size: 15px;
}

.suggestion-list p {
  margin: 8px 0;
  line-height: 1.75;
}

.trend-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

.trend-item span,
.trend-item strong {
  flex: none;
  width: 54px;
}

.trend-item div {
  display: flex;
  flex: 1;
  gap: 4px;
  height: 10px;
  overflow: hidden;
  background: #eef2f7;
  border-radius: 999px;
}

.trend-item i {
  display: block;
  min-width: 8px;
  border-radius: 999px;
}

.trend-item .success {
  background: #16a34a;
}

.trend-item .failed {
  background: #dc2626;
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
