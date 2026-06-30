<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { type StageKey, stageConfigs, type StageConfig } from "./data";

defineOptions({
  name: "CollaborationWorkspace"
});

const route = useRoute();

const currentStage = computed<StageConfig>(() => {
  const stageKey = route.name as StageKey;
  return stageConfigs[stageKey] ?? stageConfigs.RequirementsDesign;
});

const heroStyle = computed(() => {
  const [start, end] = currentStage.value.theme;
  return {
    "--stage-start": start,
    "--stage-end": end
  };
});

function progressColor(progress: number) {
  if (progress >= 80) return "#16a34a";
  if (progress >= 60) return "#2563eb";
  return "#f97316";
}

function gateTagType(status: string) {
  if (status === "已达成") return "success";
  if (status === "观察中") return "warning";
  return "info";
}

function riskTagType(level: string) {
  if (level === "高") return "danger";
  if (level === "中") return "warning";
  return "success";
}
</script>

<template>
  <div class="stage-page">
    <section class="stage-hero" :style="heroStyle">
      <div class="stage-copy">
        <div class="hero-badge">{{ currentStage.badge }}</div>
        <h1>{{ currentStage.title }}</h1>
        <p>{{ currentStage.description }}</p>
        <div class="hero-tags">
          <el-tag
            v-for="tag in currentStage.tags"
            :key="tag"
            effect="dark"
            round
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
      <div class="hero-panel">
        <span class="panel-label">本环节目标</span>
        <h3>{{ currentStage.objective }}</h3>
        <div class="hero-grid">
          <div
            v-for="item in currentStage.stats"
            :key="item.label"
            class="hero-grid-item"
          >
            <div class="hero-grid-label">{{ item.label }}</div>
            <div class="hero-grid-value">{{ item.value }}</div>
            <div class="hero-grid-helper">{{ item.helper }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="stats-row">
      <el-card
        v-for="item in currentStage.stats"
        :key="item.label"
        shadow="hover"
        class="stats-card"
      >
        <span class="stats-card-label">{{ item.label }}</span>
        <strong class="stats-card-value">{{ item.value }}</strong>
        <span class="stats-card-helper">{{ item.helper }}</span>
      </el-card>
    </section>

    <section class="stage-grid">
      <el-card shadow="never" class="content-card">
        <template #header>
          <div class="card-head">
            <span>AI 协作动作</span>
            <el-tag type="primary" effect="plain">自动串联</el-tag>
          </div>
        </template>
        <div class="action-list">
          <div
            v-for="item in currentStage.aiActions"
            :key="item.title"
            class="action-item"
          >
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
            <span class="action-owner">{{ item.owner }}</span>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="content-card">
        <template #header>
          <div class="card-head">
            <span>环节质量门</span>
            <el-tag type="success" effect="plain">持续监测</el-tag>
          </div>
        </template>
        <div class="gate-list">
          <div
            v-for="item in currentStage.qualityGates"
            :key="item.name"
            class="gate-item"
          >
            <span>{{ item.name }}</span>
            <el-tag :type="gateTagType(item.status)" effect="light">
              {{ item.status }}
            </el-tag>
          </div>
        </div>
      </el-card>
    </section>

    <section class="stage-grid bottom-grid">
      <el-card shadow="never" class="content-card">
        <template #header>
          <div class="card-head">
            <span>在办事项</span>
            <span class="subtext">跨角色同步推进</span>
          </div>
        </template>
        <el-table :data="currentStage.workItems" stripe>
          <el-table-column prop="name" label="事项" min-width="180" />
          <el-table-column prop="owner" label="负责人" width="120" />
          <el-table-column prop="status" label="状态" width="120" />
          <el-table-column label="推进度" min-width="180">
            <template #default="{ row }">
              <el-progress
                :percentage="row.progress"
                :stroke-width="10"
                :show-text="false"
                :color="progressColor(row.progress)"
              />
              <span class="progress-label">{{ row.progress }}%</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card shadow="never" class="content-card">
        <template #header>
          <div class="card-head">
            <span>关键里程碑</span>
            <span class="subtext">协作节奏清晰可见</span>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="item in currentStage.milestones"
            :key="`${item.time}-${item.title}`"
            :timestamp="item.time"
            :type="item.type"
          >
            <div class="timeline-title">{{ item.title }}</div>
            <div class="timeline-desc">{{ item.desc }}</div>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </section>

    <el-card shadow="never" class="risk-card">
      <template #header>
        <div class="card-head">
          <span>当前风险与建议</span>
          <el-tag type="warning" effect="plain">面向领导决策</el-tag>
        </div>
      </template>
      <div class="risk-list">
        <div
          v-for="item in currentStage.risks"
          :key="item.title"
          class="risk-item"
        >
          <el-tag :type="riskTagType(item.level)" effect="dark">{{
            item.level
          }}</el-tag>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.stage-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.stage-hero {
  position: relative;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 18px;
  padding: 24px;
  overflow: hidden;
  color: #fff;
  background:
    radial-gradient(
      circle at top right,
      rgb(255 255 255 / 24%),
      transparent 32%
    ),
    linear-gradient(135deg, var(--stage-start), var(--stage-end));
  border-radius: 22px;

  &::after {
    position: absolute;
    right: -40px;
    bottom: -70px;
    width: 220px;
    height: 220px;
    content: "";
    background: rgb(255 255 255 / 10%);
    border-radius: 999px;
    filter: blur(8px);
  }
}

.hero-badge {
  display: inline-flex;
  padding: 6px 12px;
  margin-bottom: 14px;
  font-size: 12px;
  letter-spacing: 0.08em;
  background: rgb(255 255 255 / 16%);
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 999px;
}

.stage-copy {
  position: relative;
  z-index: 1;

  h1 {
    margin: 0 0 10px;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.15;
  }

  p {
    max-width: 720px;
    margin: 0;
    font-size: 15px;
    line-height: 1.8;
    color: rgb(255 255 255 / 88%);
  }
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;

  :deep(.el-tag) {
    color: #fff;
    background: rgb(15 23 42 / 18%);
    border-color: rgb(255 255 255 / 18%);
  }
}

.hero-panel {
  position: relative;
  z-index: 1;
  padding: 20px;
  background: rgb(255 255 255 / 12%);
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 18px;
  backdrop-filter: blur(10px);

  h3 {
    margin: 4px 0 18px;
    font-size: 20px;
    line-height: 1.5;
  }
}

.panel-label {
  font-size: 12px;
  color: rgb(255 255 255 / 70%);
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.hero-grid-item {
  padding: 14px;
  background: rgb(15 23 42 / 18%);
  border-radius: 14px;
}

.hero-grid-label,
.hero-grid-helper {
  display: block;
}

.hero-grid-label {
  font-size: 12px;
  color: rgb(255 255 255 / 72%);
}

.hero-grid-value {
  margin: 8px 0 6px;
  font-size: 22px;
  font-weight: 700;
}

.hero-grid-helper {
  font-size: 12px;
  line-height: 1.6;
  color: rgb(255 255 255 / 72%);
}

.stats-row,
.stage-grid {
  display: grid;
  gap: 18px;
}

.stats-row {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stage-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.stats-card {
  border: none;
  border-radius: 18px;

  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.stats-card-label,
.stats-card-helper,
.subtext,
.timeline-desc,
.action-item p,
.progress-label,
.risk-item p {
  color: var(--el-text-color-secondary);
}

.stats-card-label {
  font-size: 13px;
}

.stats-card-value {
  font-size: 28px;
  line-height: 1.2;
  color: var(--el-text-color-primary);
}

.stats-card-helper {
  font-size: 13px;
  line-height: 1.7;
}

.content-card,
.risk-card {
  border: none;
  border-radius: 18px;
}

.card-head {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

.action-list,
.gate-list,
.risk-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.action-item,
.gate-item,
.risk-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px;
  background: linear-gradient(180deg, rgb(248 250 252), rgb(255 255 255));
  border: 1px solid rgb(226 232 240);
  border-radius: 16px;
}

.action-item h3,
.risk-item h3,
.timeline-title {
  margin: 0 0 6px;
  font-size: 15px;
  color: var(--el-text-color-primary);
}

.action-item p,
.risk-item p,
.timeline-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
}

.action-owner {
  flex-shrink: 0;
  padding: 4px 10px;
  font-size: 12px;
  color: #1f6bff;
  background: rgb(31 107 255 / 10%);
  border-radius: 999px;
}

.gate-item {
  align-items: center;
}

.progress-label {
  display: inline-block;
  margin-top: 8px;
  font-size: 12px;
}

.risk-item {
  align-items: center;
}

@media (width <= 1080px) {
  .stage-hero,
  .stage-grid,
  .stats-row {
    grid-template-columns: 1fr;
  }

  .hero-grid {
    grid-template-columns: 1fr;
  }
}

@media (width <= 768px) {
  .stage-hero {
    padding: 20px;
    border-radius: 18px;
  }

  .stage-copy h1 {
    font-size: 28px;
  }
}
</style>
