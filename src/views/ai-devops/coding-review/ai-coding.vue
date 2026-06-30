<script setup lang="ts">
import { computed, ref } from "vue";
import { aiCodingTasks, tagType, type AiCodingTaskRecord } from "./data";

defineOptions({
  name: "AiCodingAssistant"
});

const selectedTask = ref<AiCodingTaskRecord>(aiCodingTasks[0]);

const stats = computed(() => [
  {
    label: "AI 编码任务",
    value: aiCodingTasks.length,
    type: "primary" as const
  },
  {
    label: "变更文件",
    value: aiCodingTasks.reduce((total, item) => total + item.changedFiles, 0),
    type: "info" as const
  },
  {
    label: "构建通过",
    value: aiCodingTasks.filter(
      item => item.executionStatus === "构建验证已通过"
    ).length,
    type: "success" as const
  },
  {
    label: "待人工确认",
    value: aiCodingTasks.filter(item => item.manualConfirmation === "待确认")
      .length,
    type: "warning" as const
  }
]);
</script>

<template>
  <div class="ai-coding-page">
    <section class="page-hero">
      <div>
        <span>编码与评审</span>
        <h1>AI 编码辅助</h1>
        <p>
          展示 Codex 或其他 AI
          工具参与编码的过程，包括生成内容摘要、变更文件、执行结果和人工确认状态。
        </p>
      </div>
      <el-tag type="primary" effect="dark" round>Codex 协作</el-tag>
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
        <template #header>
          <div class="card-head">
            <span>AI 编码任务列表</span>
            <el-tag type="primary" effect="plain">生成与验证</el-tag>
          </div>
        </template>
        <el-table
          :data="aiCodingTasks"
          stripe
          highlight-current-row
          @row-click="row => (selectedTask = row)"
        >
          <el-table-column prop="aiTask" label="AI 任务" min-width="220" />
          <el-table-column
            prop="relatedDevTask"
            label="关联开发任务"
            min-width="220"
          />
          <el-table-column prop="aiTool" label="AI 工具" width="120" />
          <el-table-column prop="generationType" label="生成类型" width="110" />
          <el-table-column prop="changedFiles" label="变更文件数" width="105" />
          <el-table-column label="执行状态" width="140">
            <template #default="{ row }">
              <el-tag :type="tagType(row.executionStatus)" effect="light" round>
                {{ row.executionStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="人工确认" width="110">
            <template #default="{ row }">
              <el-tag
                :type="tagType(row.manualConfirmation)"
                effect="plain"
                round
              >
                {{ row.manualConfirmation }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="updatedAt" label="更新时间" width="130" />
        </el-table>
      </el-card>

      <el-card shadow="never" class="section-card detail-card">
        <template #header>
          <div class="card-head">
            <span>生成内容摘要</span>
            <el-tag
              :type="tagType(selectedTask.executionStatus)"
              effect="plain"
            >
              {{ selectedTask.executionStatus }}
            </el-tag>
          </div>
        </template>
        <h2>{{ selectedTask.aiTask }}</h2>
        <p>{{ selectedTask.summary }}</p>
        <div class="highlight-box">
          <strong>变更文件 {{ selectedTask.changedFiles }} 个</strong>
          <span>{{ selectedTask.result }}</span>
        </div>
        <div class="file-list">
          <span v-for="item in selectedTask.files" :key="item">{{ item }}</span>
        </div>
      </el-card>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.ai-coding-page {
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
    max-width: 840px;
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
.highlight-box span {
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

.detail-card {
  h2 {
    margin: 0 0 12px;
    font-size: 20px;
  }

  p {
    margin: 0;
    line-height: 1.85;
  }
}

.highlight-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  margin-top: 18px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
}

.file-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;

  span {
    padding: 7px 10px;
    font-family: var(--app-font-mono);
    font-size: 12px;
    background: #eef2f7;
    border-radius: 8px;
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
