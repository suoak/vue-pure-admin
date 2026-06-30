<script setup lang="ts">
import { computed } from "vue";
import { aiBoardTasks, boardStatusOrder, tagType } from "./data";

defineOptions({ name: "AiTaskBoard" });

const boardColumns = computed(() =>
  boardStatusOrder.map(status => ({
    status,
    items: aiBoardTasks.filter(item => item.status === status)
  }))
);

const stats = computed(() => [
  { label: "AI 任务", value: aiBoardTasks.length, type: "primary" as const },
  {
    label: "待人工确认",
    value: aiBoardTasks.filter(item => item.status === "待人工确认").length,
    type: "warning" as const
  },
  {
    label: "已采纳",
    value: aiBoardTasks.filter(item => item.status === "已采纳").length,
    type: "success" as const
  },
  {
    label: "已归档",
    value: aiBoardTasks.filter(item => item.status === "已归档").length,
    type: "info" as const
  }
]);
</script>

<template>
  <div class="records-page">
    <section class="records-hero">
      <div>
        <span>AI 协作记录</span>
        <h1>AI 任务看板</h1>
        <p>统一展示 AI 任务从待分析、执行、人工确认、采纳到归档的状态流转。</p>
      </div>
      <el-tag type="primary" effect="dark" round>状态流转</el-tag>
    </section>

    <section class="stats-grid">
      <el-card
        v-for="item in stats"
        :key="item.label"
        shadow="never"
        class="stat-card"
      >
        <span>{{ item.label }}</span
        ><strong>{{ item.value }}</strong
        ><el-tag :type="item.type" effect="plain" round>当前</el-tag>
      </el-card>
    </section>

    <section class="board-grid">
      <article
        v-for="column in boardColumns"
        :key="column.status"
        class="board-column"
      >
        <div class="column-head">
          <h3>{{ column.status }}</h3>
          <el-tag :type="tagType(column.status)" round>{{
            column.items.length
          }}</el-tag>
        </div>
        <div class="task-list">
          <div v-for="item in column.items" :key="item.id" class="task-card">
            <div class="task-title">
              <strong>{{ item.taskName }}</strong
              ><el-tag :type="tagType(item.priority)" effect="light" round>{{
                item.priority
              }}</el-tag>
            </div>
            <p>{{ item.summary }}</p>
            <div class="field-list">
              <span>所属环节：{{ item.stage }}</span>
              <span>AI 能力：{{ item.aiCapability }}</span>
              <span>负责人：{{ item.owner }}</span>
              <span>更新时间：{{ item.updatedAt }}</span>
            </div>
          </div>
        </div>
      </article>
    </section>
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

.stats-grid,
.board-grid {
  display: grid;
  gap: 18px;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.board-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.stat-card,
.board-column,
.task-card {
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
.task-card p,
.field-list {
  color: var(--el-text-color-secondary);
}

.stat-card strong {
  font-size: 30px;
}

.board-column {
  padding: 16px;
  background: var(--ai-surface-gradient);
}

.column-head,
.task-title {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.column-head h3 {
  margin: 0;
  font-size: 16px;
}

.task-list,
.field-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 14px;
}

.task-card {
  padding: 14px;
  background: #fff;
}

.task-card p {
  margin: 10px 0 0;
  line-height: 1.75;
}

.field-list {
  gap: 7px;
  font-size: 12px;
}

@media (width <= 1440px) {
  .board-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (width <= 1024px) {
  .stats-grid,
  .board-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width <= 768px) {
  .records-hero {
    flex-direction: column;
  }

  .stats-grid,
  .board-grid {
    grid-template-columns: 1fr;
  }
}
</style>
