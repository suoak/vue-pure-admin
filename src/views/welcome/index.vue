<script setup lang="ts">
import { computed } from "vue";
import {
  dashboardMetrics,
  collaborationStages,
  keyProjects,
  executiveFocus,
  loopHighlights
} from "@/views/collaboration/data";

defineOptions({
  name: "Welcome"
});

function progressColor(progress: number) {
  if (progress >= 85) return "#16a34a";
  if (progress >= 70) return "#2563eb";
  return "#d97706";
}

function riskTagType(risk: string) {
  if (risk === "高") return "danger";
  if (risk === "中") return "warning";
  return "success";
}

const summarySignals = computed(() => {
  const aiCoverage = Math.round(
    collaborationStages.reduce((sum, item) => {
      return sum + Number.parseInt(item.aiRate, 10);
    }, 0) / collaborationStages.length
  );
  const highRisk = keyProjects.filter(item => item.risk === "高").length;
  const averageProgress = Math.round(
    keyProjects.reduce((sum, item) => sum + item.progress, 0) /
      keyProjects.length
  );

  return [
    {
      label: "AI 覆盖率",
      value: `${aiCoverage}%`,
      helper: "覆盖四大研发协作环节"
    },
    {
      label: "高风险项目",
      value: `${highRisk}`,
      helper: "需持续复测和专项观察"
    },
    {
      label: "平均推进度",
      value: `${averageProgress}%`,
      helper: "整体交付节奏保持稳定"
    }
  ];
});

const attentionBoard = [
  {
    title: "交付节奏",
    value: "稳定",
    detail: "关键项目保持按周推进，评审阻塞时间继续下降。"
  },
  {
    title: "质量风险",
    value: "可控",
    detail: "高风险项集中在单一链路，便于专项验证与收口。"
  },
  {
    title: "AI 成效",
    value: "持续放大",
    detail: "需求拆解、评审解释、测试归因已形成闭环记录。"
  }
];

const stageOverview = computed(() => {
  return collaborationStages.map((item, index) => ({
    ...item,
    index: `0${index + 1}`
  }));
});
</script>

<template>
  <div class="welcome-page">
    <section class="hero-panel">
      <div class="hero-copy">
        <span class="hero-badge">Executive Cockpit</span>
        <h1>AI + DevOps 研发协作驾驶舱</h1>
        <p>
          围绕需求、编码、测试与发布前验证，把流程状态、风险信号和 AI
          协作成效聚合到同一张高密度决策面板里。
        </p>

        <div class="signal-grid">
          <article
            v-for="item in summarySignals"
            :key="item.label"
            class="signal-card"
          >
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
            <p>{{ item.helper }}</p>
          </article>
        </div>
      </div>

      <aside class="hero-side">
        <div class="hero-side-head">
          <h2>本周总览</h2>
          <span>管理视角</span>
        </div>
        <div class="attention-list">
          <article
            v-for="item in attentionBoard"
            :key="item.title"
            class="attention-card"
          >
            <div class="attention-top">
              <span>{{ item.title }}</span>
              <strong>{{ item.value }}</strong>
            </div>
            <p>{{ item.detail }}</p>
          </article>
        </div>
      </aside>
    </section>

    <section class="metric-grid" aria-label="关键指标">
      <el-card
        v-for="item in dashboardMetrics"
        :key="item.label"
        shadow="hover"
        class="metric-card"
      >
        <div class="metric-label">{{ item.label }}</div>
        <div class="metric-value" :style="{ color: item.accent }">
          {{ item.value }}
        </div>
        <div class="metric-helper">{{ item.helper }}</div>
      </el-card>
    </section>

    <section class="content-grid">
      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="section-head">
            <div>
              <h2>研发流程总览</h2>
              <p>
                按汇报顺序展示四个关键协作环节，帮助快速定位节奏与责任主体。
              </p>
            </div>
            <el-tag type="primary" effect="plain" round>AI 协作闭环</el-tag>
          </div>
        </template>

        <div class="stage-list">
          <article
            v-for="item in stageOverview"
            :key="item.title"
            class="stage-item"
          >
            <div class="stage-index">{{ item.index }}</div>
            <div class="stage-content">
              <div class="stage-top">
                <h3>{{ item.title }}</h3>
                <el-tag effect="light" round>{{ item.status }}</el-tag>
              </div>
              <p>{{ item.summary }}</p>
              <div class="stage-meta">
                <span>AI 介入率 {{ item.aiRate }}</span>
                <span>{{ item.owner }}</span>
              </div>
            </div>
          </article>
        </div>
      </el-card>

      <div class="aside-stack">
        <el-card shadow="never" class="section-card compact-card">
          <template #header>
            <div class="section-head">
              <div>
                <h2>协作成效亮点</h2>
                <p>最适合被快速扫读的结果摘要。</p>
              </div>
            </div>
          </template>

          <div class="highlight-list">
            <article
              v-for="item in loopHighlights"
              :key="item.title"
              class="highlight-item"
            >
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
              </div>
              <strong>{{ item.value }}</strong>
            </article>
          </div>
        </el-card>

        <el-card shadow="never" class="section-card compact-card">
          <template #header>
            <div class="section-head">
              <div>
                <h2>管理关注事项</h2>
                <p>当前最值得被持续追踪的协作提醒。</p>
              </div>
            </div>
          </template>

          <div class="focus-list">
            <article
              v-for="(item, index) in executiveFocus"
              :key="item"
              class="focus-item"
            >
              <span class="focus-index">0{{ index + 1 }}</span>
              <p>{{ item }}</p>
            </article>
          </div>
        </el-card>
      </div>
    </section>

    <section class="content-grid wide-grid">
      <el-card shadow="never" class="section-card table-card">
        <template #header>
          <div class="section-head">
            <div>
              <h2>关键项目推进</h2>
              <p>以项目为主线查看当前环节、风险等级和推进速度。</p>
            </div>
            <el-tag type="warning" effect="plain" round>持续观察</el-tag>
          </div>
        </template>

        <div class="table-shell">
          <el-table :data="keyProjects" stripe>
            <el-table-column prop="project" label="项目" min-width="180" />
            <el-table-column prop="phase" label="当前环节" width="140" />
            <el-table-column prop="owner" label="责任团队" min-width="140" />
            <el-table-column label="风险" width="100">
              <template #default="{ row }">
                <el-tag :type="riskTagType(row.risk)" effect="dark" round>
                  {{ row.risk }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="推进度" min-width="200">
              <template #default="{ row }">
                <div class="progress-cell">
                  <el-progress
                    :percentage="row.progress"
                    :show-text="false"
                    :stroke-width="10"
                    :color="progressColor(row.progress)"
                  />
                  <span class="progress-label">{{ row.progress }}%</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <el-card shadow="never" class="section-card compact-card">
        <template #header>
          <div class="section-head">
            <div>
              <h2>驾驶舱提示</h2>
              <p>把页面信息压缩成三条更适合决策表达的结论。</p>
            </div>
          </div>
        </template>

        <div class="focus-list">
          <article
            v-for="(item, index) in attentionBoard"
            :key="item.title"
            class="focus-item focus-item-strong"
          >
            <span class="focus-index">0{{ index + 1 }}</span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.detail }}</p>
            </div>
          </article>
        </div>
      </el-card>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.welcome-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 2px 0 12px;
}

.hero-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.85fr);
  gap: 18px;
  padding: 26px;
  overflow: hidden;
  color: #fff;
  background: var(--ai-hero-gradient);
  border-radius: 26px;
  box-shadow: var(--ai-card-shadow-md);
}

.hero-copy h1,
.section-head h2,
.highlight-item h3,
.stage-top h3,
.focus-item-strong h3 {
  margin: 0;
}

.hero-badge {
  display: inline-flex;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  background: rgb(255 255 255 / 12%);
  border: 1px solid rgb(255 255 255 / 16%);
  border-radius: 999px;
}

.hero-copy h1 {
  margin-top: 14px;
  font-size: clamp(34px, 3vw, 46px);
  line-height: 1.04;
}

.hero-copy p {
  max-width: 820px;
  margin: 14px 0 0;
  font-size: 15px;
  line-height: 1.85;
  color: rgb(255 255 255 / 86%);
}

.signal-grid,
.metric-grid,
.content-grid {
  display: grid;
  gap: 18px;
}

.signal-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 22px;
}

.signal-card,
.attention-card {
  padding: 18px;
  background: rgb(255 255 255 / 10%);
  border: 1px solid rgb(255 255 255 / 14%);
  border-radius: 18px;
  backdrop-filter: blur(10px);
}

.signal-card span,
.signal-card strong,
.signal-card p,
.attention-card span,
.attention-card strong,
.attention-card p {
  display: block;
}

.signal-card span,
.attention-card span {
  font-size: 12px;
  color: rgb(255 255 255 / 72%);
}

.signal-card strong,
.attention-card strong {
  margin-top: 10px;
  font-family: var(--app-font-mono);
  font-size: 28px;
}

.signal-card p,
.attention-card p {
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.75;
  color: rgb(255 255 255 / 82%);
}

.hero-side {
  padding: 20px;
  background: rgb(255 255 255 / 9%);
  border: 1px solid rgb(255 255 255 / 14%);
  border-radius: 22px;
  backdrop-filter: blur(10px);
}

.hero-side-head {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;

  h2 {
    margin: 0;
    font-size: 18px;
  }

  span {
    font-size: 12px;
    color: rgb(255 255 255 / 72%);
  }
}

.attention-list,
.stage-list,
.highlight-list,
.focus-list,
.aside-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.attention-top,
.section-head,
.stage-top,
.highlight-item {
  display: flex;
}

.attention-top,
.stage-top,
.highlight-item {
  gap: 12px;
  align-items: flex-start;
  justify-content: space-between;
}

.metric-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.content-grid {
  grid-template-columns: minmax(0, 1.42fr) minmax(320px, 0.88fr);
}

.wide-grid {
  grid-template-columns: minmax(0, 1.55fr) minmax(300px, 0.75fr);
}

.metric-card,
.section-card {
  overflow: hidden;
  background: var(--ai-surface-gradient);
  border: var(--ai-card-border);
  border-radius: 22px;
  box-shadow: var(--ai-card-shadow-sm);
}

.metric-label,
.metric-helper,
.section-head p,
.stage-content p,
.stage-meta,
.highlight-item p,
.focus-item p,
.progress-label {
  color: var(--el-text-color-secondary);
}

.metric-value {
  margin: 10px 0 8px;
  font-family: var(--app-font-mono);
  font-size: 30px;
  font-weight: 700;
}

.section-head {
  gap: 12px;
  align-items: flex-start;
  justify-content: space-between;

  h2 {
    font-size: 18px;
    line-height: 1.2;
  }

  p {
    margin: 6px 0 0;
    font-size: 13px;
    line-height: 1.65;
  }
}

.stage-item,
.highlight-item,
.focus-item {
  gap: 14px;
  padding: 16px;
  background: var(--ai-surface-strong);
  border: 1px solid rgb(219 234 254 / 86%);
  border-radius: 18px;
}

.stage-item,
.focus-item {
  display: flex;
}

.stage-index,
.focus-index {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-family: var(--app-font-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--color-primary);
  background: rgb(30 64 175 / 10%);
  border-radius: 14px;
}

.stage-content,
.focus-item p,
.focus-item-strong div {
  flex: 1;
}

.stage-top h3,
.highlight-item h3,
.focus-item-strong h3 {
  font-size: 15px;
  color: var(--el-text-color-primary);
}

.stage-content p,
.highlight-item p,
.focus-item p,
.focus-item-strong p {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.8;
}

.stage-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 10px;
  font-size: 12px;
}

.highlight-item strong {
  flex-shrink: 0;
  font-family: var(--app-font-mono);
  font-size: 24px;
  color: var(--el-text-color-primary);
}

.focus-item-strong {
  align-items: flex-start;
}

.table-shell {
  overflow-x: auto;
}

.progress-cell {
  min-width: 140px;
}

.progress-label {
  display: inline-block;
  margin-top: 8px;
  font-size: 12px;
}

:deep(.el-card__header) {
  padding: 20px 22px 0;
  border-bottom: 0;
}

:deep(.el-card__body) {
  padding: 18px 22px 22px;
}

:deep(.el-table) {
  --el-table-border-color: rgb(226 232 240 / 82%);
  --el-table-header-bg-color: rgb(248 250 252 / 86%);
  --el-table-row-hover-bg-color: rgb(239 246 255 / 76%);
}

@media (width <= 1180px) {
  .hero-panel,
  .content-grid,
  .wide-grid,
  .metric-grid {
    grid-template-columns: 1fr;
  }

  .signal-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (width <= 840px) {
  .signal-grid {
    grid-template-columns: 1fr;
  }
}

@media (width <= 768px) {
  .hero-panel {
    padding: 22px;
    border-radius: 22px;
  }

  .hero-copy h1 {
    font-size: 30px;
  }

  .section-head,
  .stage-top,
  .highlight-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
