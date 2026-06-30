<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import {
  aiDevopsPlatformMockData,
  type ProcessStageName,
  type ProcessTaskRecord
} from "@/mock-data/ai-devops-platform";

defineOptions({
  name: "AiDevopsProcessWorkspace"
});

const route = useRoute();
const selectedTask = ref<ProcessTaskRecord | null>(null);
const drawerVisible = ref(false);

const stageName = computed(() => {
  return (route.meta.stageName as ProcessStageName) || "需求与设计";
});

const pageTitle = computed(() => route.meta.title as string);
const stageData = computed(() => aiDevopsPlatformMockData[stageName.value]);

const progressValue = computed(() => {
  return Number(stageData.value.accessStatus.accessRate.replace("%", ""));
});

const statusSummary = computed(() => {
  const tasks = stageData.value.taskList;
  return [
    { label: "任务总数", value: tasks.length, type: "primary" },
    {
      label: "待人工确认",
      value: tasks.filter(item => item.status === "待确认").length,
      type: "warning"
    },
    {
      label: "高风险事项",
      value: tasks.filter(item => item.status === "高风险").length,
      type: "danger"
    },
    {
      label: "AI 产出",
      value: stageData.value.aiGeneratedContents.length,
      type: "success"
    }
  ];
});

const mainSections = computed(() => {
  const mapping: Record<ProcessStageName, string[]> = {
    需求与设计: ["需求列表", "AI 分析", "设计评审", "风险与待办"],
    编码与评审: [
      "开发任务",
      "Codex 编码记录",
      "代码评审",
      "构建验证",
      "重构进度"
    ],
    集成测试: ["测试任务", "AI 用例生成", "流水线结果", "失败原因分析"],
    内部测试: ["测试轮次", "问题跟踪", "缺陷分析", "回归建议", "测试报告"]
  };

  return mapping[stageName.value];
});

function tagType(value: string) {
  if (["高", "高风险", "退回修订"].includes(value)) return "danger";
  if (["中", "待确认", "补充说明", "试运行"].includes(value)) return "warning";
  if (["低", "已完成", "通过", "已接入"].includes(value)) return "success";
  return "primary";
}

function openTask(task: ProcessTaskRecord) {
  selectedTask.value = task;
  drawerVisible.value = true;
}
</script>

<template>
  <div class="process-page">
    <section class="process-hero">
      <div>
        <span class="hero-kicker">AI + DevOps 研发协作平台</span>
        <h1>{{ pageTitle }}</h1>
        <p>{{ stageData.description }}</p>
        <div class="hero-tags">
          <el-tag v-for="item in mainSections" :key="item" effect="plain" round>
            {{ item }}
          </el-tag>
        </div>
      </div>
      <aside class="access-panel">
        <div class="access-top">
          <span>研发流程 AI 接入率</span>
          <strong>{{ stageData.accessStatus.accessRate }}</strong>
        </div>
        <el-progress
          :percentage="progressValue"
          :stroke-width="10"
          :show-text="false"
          color="#2563eb"
        />
        <div class="access-meta">
          <span>{{ stageData.accessStatus.accessState }}</span>
          <el-tag :type="tagType(stageData.accessStatus.accessPhase)" round>
            {{ stageData.accessStatus.accessPhase }}
          </el-tag>
        </div>
        <p>{{ stageData.accessStatus.summary }}</p>
      </aside>
    </section>

    <section class="summary-grid">
      <el-card
        v-for="item in statusSummary"
        :key="item.label"
        shadow="never"
        class="summary-card"
      >
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
        <el-tag :type="item.type" effect="plain" round>实时同步</el-tag>
      </el-card>
    </section>

    <section class="content-grid">
      <el-card shadow="never" class="section-card task-card">
        <template #header>
          <div class="card-head">
            <span>{{ mainSections[0] }}</span>
            <el-tag type="primary" effect="plain">{{
              stageData.accessStatus.owner
            }}</el-tag>
          </div>
        </template>
        <el-table :data="stageData.taskList" stripe>
          <el-table-column prop="taskName" label="事项名称" min-width="220" />
          <el-table-column prop="owner" label="负责人" width="130" />
          <el-table-column label="状态" width="110">
            <template #default="{ row }">
              <el-tag :type="tagType(row.status)" effect="light" round>
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="优先级" width="100">
            <template #default="{ row }">
              <el-tag :type="tagType(row.priority)" effect="plain" round>
                {{ row.priority }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="aiOutput" label="AI 输出" min-width="260" />
          <el-table-column prop="updatedAt" label="更新时间" width="110" />
          <el-table-column label="操作" width="110" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="openTask(row)">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>AI 能力接入</span>
            <el-tag type="success" effect="plain">{{
              stageData.accessStatus.lastSync
            }}</el-tag>
          </div>
        </template>
        <div class="capability-list">
          <article
            v-for="item in stageData.aiCapabilities"
            :key="item.name"
            class="capability-item"
          >
            <div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
            </div>
            <strong>{{ item.value }}</strong>
            <span>{{ item.owner }}</span>
          </article>
        </div>
      </el-card>
    </section>

    <section class="content-grid bottom-grid">
      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>{{ mainSections[1] }}</span>
            <el-tag type="info" effect="plain">AI 协作记录</el-tag>
          </div>
        </template>
        <div class="generated-list">
          <article
            v-for="item in stageData.aiGeneratedContents"
            :key="item.id"
            class="generated-item"
          >
            <div class="generated-title">
              <h3>{{ item.title }}</h3>
              <el-tag effect="plain" round>{{ item.contentType }}</el-tag>
            </div>
            <p>{{ item.summary }}</p>
            <div class="generated-foot">
              <span>{{ item.outputBy }}</span>
              <span>{{ item.generatedAt }}</span>
              <strong>{{ item.adoptionStatus }}</strong>
            </div>
          </article>
        </div>
      </el-card>

      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>{{ mainSections[2] }}</span>
            <el-tag type="warning" effect="plain">人工确认</el-tag>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="item in stageData.manualReviewRecords"
            :key="item.id"
            :timestamp="item.reviewAt"
          >
            <div class="review-item">
              <div>
                <strong>{{ item.reviewTopic }}</strong>
                <p>{{ item.comment }}</p>
              </div>
              <el-tag :type="tagType(item.decision)" effect="light" round>
                {{ item.decision }}
              </el-tag>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </section>

    <section class="content-grid bottom-grid">
      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>{{ mainSections[mainSections.length - 1] }}</span>
            <el-tag type="danger" effect="plain">风险与待办</el-tag>
          </div>
        </template>
        <div class="risk-list">
          <article
            v-for="item in stageData.riskList"
            :key="item.title"
            class="risk-item"
          >
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <span>{{ item.todo }}</span>
            </div>
            <el-tag :type="tagType(item.level)" effect="dark" round>
              {{ item.level }}风险
            </el-tag>
          </article>
        </div>
      </el-card>

      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>DevOps 状态联动</span>
            <el-tag type="primary" effect="plain">{{
              stageData.devOpsStatus.projectName
            }}</el-tag>
          </div>
        </template>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="代码与资料">
            {{ stageData.devOpsStatus.repoStatus }}
          </el-descriptions-item>
          <el-descriptions-item label="流水线状态">
            {{ stageData.devOpsStatus.pipelineStatus }}
          </el-descriptions-item>
          <el-descriptions-item label="验证状态">
            {{ stageData.devOpsStatus.testStatus }}
          </el-descriptions-item>
          <el-descriptions-item label="发布判断">
            {{ stageData.devOpsStatus.releaseReadiness }}
          </el-descriptions-item>
          <el-descriptions-item label="风险摘要">
            {{ stageData.devOpsStatus.riskSummary }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </section>

    <el-drawer
      v-model="drawerVisible"
      :title="selectedTask?.taskName ?? '协作详情'"
      size="42%"
    >
      <template v-if="selectedTask">
        <div class="drawer-content">
          <el-alert
            :title="selectedTask.aiOutput"
            type="info"
            show-icon
            :closable="false"
          />
          <section>
            <span>AI 分析</span>
            <p>{{ selectedTask.analysis }}</p>
          </section>
          <section>
            <span>下一步动作</span>
            <p>{{ selectedTask.nextAction }}</p>
          </section>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.process-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.process-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.7fr);
  gap: 18px;
  padding: 26px;
  color: #fff;
  background: var(--ai-hero-gradient);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-md);

  h1 {
    margin: 10px 0 12px;
    font-size: 34px;
    line-height: 1.18;
  }

  p {
    max-width: 920px;
    margin: 0;
    line-height: 1.85;
    color: rgb(255 255 255 / 86%);
  }
}

.hero-kicker {
  display: inline-flex;
  padding: 6px 12px;
  font-size: 12px;
  color: rgb(255 255 255 / 86%);
  background: rgb(255 255 255 / 12%);
  border: 1px solid rgb(255 255 255 / 16%);
  border-radius: 999px;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.access-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  background: rgb(255 255 255 / 10%);
  border: 1px solid rgb(255 255 255 / 16%);
  border-radius: 18px;
  backdrop-filter: blur(10px);

  p {
    margin: 0;
    font-size: 13px;
  }
}

.access-top,
.access-meta,
.card-head,
.generated-title,
.generated-foot,
.review-item,
.risk-item {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.access-top strong {
  font-size: 30px;
}

.summary-grid,
.content-grid {
  display: grid;
  gap: 18px;
}

.summary-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.content-grid {
  grid-template-columns: minmax(0, 1.35fr) minmax(360px, 0.65fr);
}

.bottom-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.section-card,
.summary-card {
  border: var(--ai-card-border);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-sm);
}

.summary-card {
  background: var(--ai-surface-gradient);

  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  span {
    color: var(--el-text-color-secondary);
  }

  strong {
    font-size: 30px;
    color: var(--el-text-color-primary);
  }
}

.card-head {
  font-weight: 600;
}

.capability-list,
.generated-list,
.risk-list,
.drawer-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.capability-item,
.generated-item,
.risk-item,
.drawer-content section {
  padding: 16px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
}

.capability-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px 14px;

  h3,
  p {
    margin: 0;
  }

  h3 {
    margin-bottom: 8px;
    font-size: 16px;
  }

  p,
  span {
    font-size: 13px;
    line-height: 1.75;
    color: var(--el-text-color-secondary);
  }

  strong {
    font-size: 22px;
    color: #2563eb;
  }

  span {
    grid-column: 1 / -1;
  }
}

.generated-item h3,
.risk-item h3 {
  margin: 0;
  font-size: 16px;
}

.generated-item p,
.risk-item p,
.review-item p,
.drawer-content p {
  margin: 8px 0 0;
  line-height: 1.75;
  color: var(--el-text-color-secondary);
}

.generated-foot {
  margin-top: 12px;
  font-size: 12px;
  color: var(--el-text-color-secondary);

  strong {
    color: #1d4ed8;
  }
}

.review-item {
  align-items: flex-start;
}

.risk-item {
  align-items: flex-start;

  span {
    display: block;
    margin-top: 10px;
    color: #b45309;
  }
}

.drawer-content section span {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

@media (width <= 1180px) {
  .process-hero,
  .summary-grid,
  .content-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }
}

@media (width <= 768px) {
  .process-hero {
    padding: 20px;

    h1 {
      font-size: 28px;
    }
  }
}
</style>
