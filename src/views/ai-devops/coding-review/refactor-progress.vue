<script setup lang="ts">
import { computed, ref } from "vue";
import {
  refactorProgressRecords,
  tagType,
  type RefactorProgressRecord
} from "./data";

defineOptions({
  name: "RefactorProgress"
});

const selectedModule = ref<RefactorProgressRecord>(refactorProgressRecords[0]);

const stats = computed(() => {
  const totalLegacy = refactorProgressRecords.reduce(
    (total, item) => total + item.legacyPageCount,
    0
  );
  const migrated = refactorProgressRecords.reduce(
    (total, item) => total + item.migratedCount,
    0
  );
  return [
    { label: "旧页面数量", value: totalLegacy, type: "info" as const },
    { label: "已迁移数量", value: migrated, type: "success" as const },
    {
      label: "平均进度",
      value: `${Math.round((migrated / totalLegacy) * 100)}%`,
      type: "primary" as const
    },
    {
      label: "构建异常模块",
      value: refactorProgressRecords.filter(
        item => item.buildStatus === "失败待修复"
      ).length,
      type: "danger" as const
    }
  ];
});
</script>

<template>
  <div class="refactor-page">
    <section class="page-hero">
      <div>
        <span>编码与评审</span>
        <h1>重构进度</h1>
        <p>
          展示旧 Element Admin
          前端重构进度、页面迁移状态、构建验证情况、遗留问题和阶段性成果。
        </p>
      </div>
      <el-tag type="primary" effect="dark" round>旧系统重构</el-tag>
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
            <span>模块重构进度</span>
            <el-tag type="info" effect="plain">页面迁移状态</el-tag>
          </div>
        </template>
        <el-table
          :data="refactorProgressRecords"
          stripe
          highlight-current-row
          @row-click="row => (selectedModule = row)"
        >
          <el-table-column prop="moduleName" label="模块名称" min-width="180" />
          <el-table-column
            prop="legacyPageCount"
            label="旧页面数量"
            width="105"
          />
          <el-table-column
            prop="migratedCount"
            label="已迁移数量"
            width="105"
          />
          <el-table-column
            prop="aiParticipation"
            label="AI 参与"
            min-width="230"
          />
          <el-table-column label="完成进度" width="170">
            <template #default="{ row }">
              <el-progress :percentage="row.completionRate" :stroke-width="8" />
            </template>
          </el-table-column>
          <el-table-column label="构建状态" width="110">
            <template #default="{ row }">
              <el-tag :type="tagType(row.buildStatus)" effect="light" round>
                {{ row.buildStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="riskNote" label="风险说明" min-width="230" />
        </el-table>
      </el-card>

      <el-card shadow="never" class="section-card detail-card">
        <template #header>
          <div class="card-head">
            <span>阶段性成果</span>
            <el-tag :type="tagType(selectedModule.buildStatus)" effect="plain">
              {{ selectedModule.buildStatus }}
            </el-tag>
          </div>
        </template>
        <h2>{{ selectedModule.moduleName }}</h2>
        <div class="status-panel">
          <span>迁移状态</span>
          <strong>{{ selectedModule.migrationStatus }}</strong>
          <el-progress
            :percentage="selectedModule.completionRate"
            :stroke-width="10"
            color="#2563eb"
          />
        </div>
        <section class="detail-grid">
          <div>
            <h3>阶段性成果</h3>
            <ul>
              <li v-for="item in selectedModule.achievements" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
          <div>
            <h3>遗留问题</h3>
            <ul>
              <li v-for="item in selectedModule.legacyIssues" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </section>
      </el-card>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.refactor-page {
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
    max-width: 820px;
    margin: 0;
    line-height: 1.85;
    color: rgb(255 255 255 / 86%);
  }
}

.stats-grid,
.content-grid,
.detail-grid {
  display: grid;
  gap: 18px;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.content-grid {
  grid-template-columns: minmax(0, 1.35fr) minmax(380px, 0.65fr);
}

.detail-grid {
  grid-template-columns: 1fr 1fr;
  margin-top: 16px;
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
.status-panel span,
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
  margin: 0 0 16px;
  font-size: 20px;
}

.status-panel,
.detail-grid div {
  padding: 14px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
}

.status-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-grid h3 {
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
  .content-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width <= 768px) {
  .page-hero {
    flex-direction: column;
  }

  .stats-grid,
  .content-grid,
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
