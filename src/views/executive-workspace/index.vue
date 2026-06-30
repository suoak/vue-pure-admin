<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { getExecutiveWorkspaceConfig } from "./data";
import type { ExecutiveFocus, ExecutiveRecord } from "./types";

defineOptions({
  name: "ExecutiveWorkspace"
});

const route = useRoute();
const detailVisible = ref(false);
const currentRecord = ref<ExecutiveRecord | null>(null);

const pageConfig = computed(() =>
  getExecutiveWorkspaceConfig(String(route.name))
);

function statusTagType(status: ExecutiveRecord["status"]) {
  if (status === "高风险") return "danger";
  if (status === "待确认") return "warning";
  if (status === "已完成") return "success";
  return "primary";
}

function priorityTagType(priority: ExecutiveRecord["priority"]) {
  if (priority === "高") return "danger";
  if (priority === "中") return "warning";
  return "success";
}

function focusTagType(level: ExecutiveFocus["level"]) {
  if (level === "高") return "danger";
  if (level === "中") return "warning";
  return "success";
}

function openRecordDetail(record: ExecutiveRecord) {
  currentRecord.value = record;
  detailVisible.value = true;
}
</script>

<template>
  <div class="workspace-page">
    <section class="hero-grid">
      <div class="hero-panel">
        <span class="hero-badge">{{ pageConfig.badge }}</span>
        <h1>{{ pageConfig.title }}</h1>
        <p>{{ pageConfig.description }}</p>
      </div>

      <el-card shadow="never" class="status-card">
        <div class="status-head">
          <div>
            <span class="status-label">{{ pageConfig.status.label }}</span>
            <h3>{{ pageConfig.status.value }}</h3>
          </div>
          <el-tag type="primary" effect="dark" round>
            最新同步 {{ pageConfig.status.updatedAt }}
          </el-tag>
        </div>
        <p class="status-summary">{{ pageConfig.status.summary }}</p>
        <div class="status-meta">
          <div class="status-meta-item">
            <span>责任团队</span>
            <strong>{{ pageConfig.status.owner }}</strong>
          </div>
          <div class="status-meta-item">
            <span>协作标签</span>
            <strong>{{ pageConfig.status.tags.length }} 项</strong>
          </div>
        </div>
        <div class="status-tags">
          <el-tag
            v-for="item in pageConfig.status.tags"
            :key="item"
            effect="plain"
            round
          >
            {{ item }}
          </el-tag>
        </div>
      </el-card>
    </section>

    <section class="metric-grid">
      <el-card
        v-for="item in pageConfig.metrics"
        :key="item.label"
        shadow="hover"
        class="metric-card"
      >
        <span class="metric-label">{{ item.label }}</span>
        <strong class="metric-value">{{ item.value }}</strong>
        <span class="metric-note">{{ item.note }}</span>
      </el-card>
    </section>

    <section class="content-grid">
      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>{{ pageConfig.capabilityTitle }}</span>
            <el-tag type="primary" effect="plain">核心支撑</el-tag>
          </div>
        </template>
        <div class="capability-list">
          <article
            v-for="item in pageConfig.capabilities"
            :key="item.title"
            class="capability-item"
          >
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
            <div class="capability-side">
              <strong>{{ item.value }}</strong>
              <span>{{ item.owner }}</span>
            </div>
          </article>
        </div>
      </el-card>

      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>{{ pageConfig.focusTitle }}</span>
            <el-tag type="warning" effect="plain">领导观察</el-tag>
          </div>
        </template>
        <div class="focus-list">
          <article
            v-for="item in pageConfig.focusItems"
            :key="item.title"
            class="focus-item"
          >
            <div class="focus-top">
              <h3>{{ item.title }}</h3>
              <el-tag :type="focusTagType(item.level)" effect="dark" round>
                {{ item.level }}优先
              </el-tag>
            </div>
            <p>{{ item.description }}</p>
            <div class="focus-action">建议动作：{{ item.action }}</div>
            <div class="focus-owner">责任人：{{ item.owner }}</div>
          </article>
        </div>
      </el-card>
    </section>

    <el-card shadow="never" class="section-card">
      <template #header>
        <div class="card-head">
          <span>{{ pageConfig.tableTitle }}</span>
          <el-tag type="info" effect="plain">本地 Mock 数据</el-tag>
        </div>
      </template>
      <el-table :data="pageConfig.records" stripe>
        <el-table-column prop="name" label="事项名称" min-width="240" />
        <el-table-column prop="owner" label="负责人" width="140" />
        <el-table-column label="状态" width="110">
          <template #default="{ row }">
            <el-tag :type="statusTagType(row.status)" effect="light" round>
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="优先级" width="100">
          <template #default="{ row }">
            <el-tag :type="priorityTagType(row.priority)" effect="plain" round>
              {{ row.priority }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="summary" label="摘要" min-width="280" />
        <el-table-column prop="updatedAt" label="最近更新时间" width="130" />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              @click="openRecordDetail(row as ExecutiveRecord)"
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-drawer
      v-model="detailVisible"
      :title="currentRecord?.name ?? '详情分析'"
      size="42%"
    >
      <template v-if="currentRecord">
        <div class="detail-panel">
          <div class="detail-grid">
            <div class="detail-item">
              <span>负责人</span>
              <strong>{{ currentRecord.owner }}</strong>
            </div>
            <div class="detail-item">
              <span>状态</span>
              <el-tag
                :type="statusTagType(currentRecord.status)"
                effect="light"
                round
              >
                {{ currentRecord.status }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span>优先级</span>
              <el-tag
                :type="priorityTagType(currentRecord.priority)"
                effect="plain"
                round
              >
                {{ currentRecord.priority }}
              </el-tag>
            </div>
            <div class="detail-item">
              <span>最近更新时间</span>
              <strong>{{ currentRecord.updatedAt }}</strong>
            </div>
          </div>
          <div class="detail-block">
            <span>当前摘要</span>
            <p>{{ currentRecord.summary }}</p>
          </div>
          <div class="detail-block">
            <span>分析结论</span>
            <p>{{ currentRecord.analysis }}</p>
          </div>
          <div class="detail-block">
            <span>下一步动作</span>
            <p>{{ currentRecord.nextAction }}</p>
          </div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.workspace-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 2px 0 12px;
}

.hero-grid,
.metric-grid,
.content-grid {
  display: grid;
  gap: 18px;
}

.hero-grid {
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
}

.hero-panel {
  padding: 26px;
  color: #fff;
  background: var(--ai-hero-gradient);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-md);

  h1 {
    margin: 10px 0 12px;
    font-size: 34px;
    line-height: 1.12;
  }

  p {
    max-width: 860px;
    margin: 0;
    font-size: 15px;
    line-height: 1.85;
    color: rgb(255 255 255 / 88%);
  }
}

.hero-badge {
  display: inline-flex;
  padding: 6px 12px;
  font-size: 12px;
  letter-spacing: 0.08em;
  background: rgb(255 255 255 / 12%);
  border: 1px solid rgb(255 255 255 / 16%);
  border-radius: 999px;
}

.status-card,
.metric-card,
.section-card {
  border: var(--ai-card-border);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-sm);
}

.status-card {
  background: transparent;

  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    padding: 22px;
    background: var(--ai-surface-gradient);
    border-radius: var(--ai-card-radius-lg);
  }
}

.status-head,
.card-head,
.focus-top {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  justify-content: space-between;
}

.status-label,
.status-summary,
.metric-label,
.metric-note,
.capability-item p,
.capability-side span,
.focus-item p,
.focus-action,
.focus-owner,
.detail-item span,
.detail-block span {
  color: var(--el-text-color-secondary);
}

.status-head h3,
.capability-item h3,
.focus-item h3 {
  margin: 0;
  color: var(--el-text-color-primary);
}

.status-head h3 {
  margin-top: 6px;
  font-size: 24px;
}

.status-summary,
.metric-note,
.capability-item p,
.focus-item p,
.focus-action,
.detail-block p {
  margin: 0;
  font-size: 13px;
  line-height: 1.8;
}

.status-meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.status-meta-item,
.detail-item {
  padding: 14px;
  background: rgb(248 250 252);
  border: 1px solid rgb(226 232 240 / 85%);
  border-radius: 16px;

  span,
  strong {
    display: block;
  }

  strong {
    margin-top: 8px;
    font-size: 16px;
    color: var(--el-text-color-primary);
  }
}

.status-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.metric-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.metric-card {
  background: var(--ai-surface-gradient);

  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.metric-label {
  font-size: 13px;
}

.metric-value {
  font-size: 28px;
  line-height: 1.2;
  color: var(--el-text-color-primary);
}

.content-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.card-head {
  font-weight: 600;
}

.capability-list,
.focus-list,
.detail-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.capability-item,
.focus-item,
.detail-block {
  padding: 16px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
  box-shadow: 0 8px 20px rgb(15 23 42 / 4%);
}

.capability-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  justify-content: space-between;
}

.capability-item h3,
.focus-item h3 {
  margin-bottom: 8px;
  font-size: 16px;
}

.capability-side {
  min-width: 96px;
  text-align: right;

  strong,
  span {
    display: block;
  }

  strong {
    font-size: 20px;
    color: #1d4ed8;
  }

  span {
    margin-top: 6px;
    font-size: 12px;
  }
}

.focus-action {
  margin-top: 10px;
}

.focus-owner {
  margin-top: 8px;
  font-size: 12px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.detail-block {
  span {
    display: block;
    margin-bottom: 8px;
    font-size: 12px;
  }

  p {
    color: var(--el-text-color-primary);
  }
}

@media (width <= 1180px) {
  .hero-grid,
  .metric-grid,
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (width <= 768px) {
  .hero-panel {
    padding: 20px;
    border-radius: 18px;

    h1 {
      font-size: 28px;
    }
  }

  .status-meta,
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .capability-item {
    flex-direction: column;
  }

  .capability-side {
    min-width: auto;
    text-align: left;
  }
}
</style>
