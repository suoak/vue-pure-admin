<script setup lang="ts">
import { computed, ref } from "vue";
import {
  aiCaseGenerationTasks,
  tagType,
  type AiCaseGenerationTask
} from "./data";

defineOptions({ name: "AiCaseGeneration" });

const selectedTask = ref<AiCaseGenerationTask>(aiCaseGenerationTasks[0]);
const stats = computed(() => [
  {
    label: "生成任务",
    value: aiCaseGenerationTasks.length,
    type: "primary" as const
  },
  {
    label: "生成用例",
    value: aiCaseGenerationTasks.reduce(
      (sum, item) => sum + item.generatedCases,
      0
    ),
    type: "info" as const
  },
  {
    label: "采纳用例",
    value: aiCaseGenerationTasks.reduce(
      (sum, item) => sum + item.adoptedCases,
      0
    ),
    type: "success" as const
  },
  {
    label: "待确认",
    value: aiCaseGenerationTasks.filter(
      item => item.manualConfirmation === "待确认"
    ).length,
    type: "warning" as const
  }
]);
</script>

<template>
  <div class="testing-page">
    <section class="page-hero">
      <div>
        <span>集成测试</span>
        <h1>AI 用例生成</h1>
        <p>
          展示 AI
          根据需求和代码变更生成的测试用例，覆盖核心场景、异常场景和边界场景。
        </p>
      </div>
      <el-tag type="primary" effect="dark" round>用例生成</el-tag>
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
      <el-card shadow="never" class="section-card">
        <template #header
          ><div class="card-head">
            <span>用例生成任务</span
            ><el-tag type="info" effect="plain">AI 生成结果</el-tag>
          </div></template
        >
        <el-table
          :data="aiCaseGenerationTasks"
          stripe
          highlight-current-row
          @row-click="row => (selectedTask = row)"
        >
          <el-table-column
            prop="generationTask"
            label="生成任务"
            min-width="230"
          />
          <el-table-column
            prop="requirement"
            label="关联需求"
            min-width="210"
          />
          <el-table-column
            prop="generatedCases"
            label="生成用例数"
            width="105"
          />
          <el-table-column prop="adoptedCases" label="采纳用例数" width="105" />
          <el-table-column
            prop="coveredModules"
            label="覆盖模块"
            min-width="220"
          />
          <el-table-column label="人工确认" width="110"
            ><template #default="{ row }"
              ><el-tag
                :type="tagType(row.manualConfirmation)"
                effect="light"
                round
                >{{ row.manualConfirmation }}</el-tag
              ></template
            ></el-table-column
          >
          <el-table-column prop="updatedAt" label="更新时间" width="130" />
        </el-table>
      </el-card>
      <el-card shadow="never" class="section-card detail-card">
        <template #header
          ><div class="card-head">
            <span>场景拆解</span
            ><el-tag
              :type="tagType(selectedTask.manualConfirmation)"
              effect="plain"
              >{{ selectedTask.manualConfirmation }}</el-tag
            >
          </div></template
        >
        <h2>{{ selectedTask.generationTask }}</h2>
        <p>{{ selectedTask.aiSummary }}</p>
        <div class="scenario-block">
          <h3>核心场景</h3>
          <ul>
            <li v-for="item in selectedTask.normalScenarios" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="scenario-block">
          <h3>异常场景</h3>
          <ul>
            <li v-for="item in selectedTask.abnormalScenarios" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="scenario-block">
          <h3>边界场景</h3>
          <ul>
            <li v-for="item in selectedTask.boundaryScenarios" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
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
.detail-card p,
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

.detail-card h2 {
  margin: 0 0 12px;
  font-size: 20px;
}

.detail-card p {
  margin: 0 0 14px;
  line-height: 1.85;
}

.scenario-block {
  padding: 14px;
  margin-top: 12px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
}

.scenario-block h3 {
  margin: 0 0 10px;
  font-size: 15px;
}

ul {
  padding-left: 18px;
  margin: 0;
  line-height: 1.85;
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
