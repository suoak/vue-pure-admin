<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import {
  aiDevopsPlatformMockData,
  type ProcessStageName
} from "@/mock-data/ai-devops-platform";

defineOptions({
  name: "AiDevopsSkeletonPage"
});

const route = useRoute();

const title = computed(() => route.meta.title as string);
const stageName = computed(
  () => route.meta.stageName as ProcessStageName | string
);
const stageData = computed(() => {
  if (stageName.value in aiDevopsPlatformMockData) {
    return aiDevopsPlatformMockData[stageName.value as ProcessStageName];
  }
  return null;
});
</script>

<template>
  <div class="skeleton-page">
    <section class="skeleton-hero">
      <div>
        <span>AI + DevOps 研发协作平台</span>
        <h1>{{ title }}</h1>
        <p>
          当前页面已纳入协作工作台菜单，后续可基于主页面数据继续细化专题视图。
        </p>
      </div>
      <el-tag type="primary" effect="dark" round>{{ stageName }}</el-tag>
    </section>

    <section class="skeleton-grid">
      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>研发协作环节概览</span>
            <el-tag type="info" effect="plain">页面骨架</el-tag>
          </div>
        </template>
        <template v-if="stageData">
          <p class="desc">{{ stageData.description }}</p>
          <div class="mini-grid">
            <div>
              <span>负责人</span>
              <strong>{{ stageData.accessStatus.owner }}</strong>
            </div>
            <div>
              <span>AI 接入率</span>
              <strong>{{ stageData.accessStatus.accessRate }}</strong>
            </div>
            <div>
              <span>待处理任务</span>
              <strong>{{ stageData.taskList.length }}</strong>
            </div>
          </div>
        </template>
        <template v-else>
          <p class="desc">AI 协作记录专题页面将继续沉淀确认结论和复用资产。</p>
        </template>
      </el-card>

      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>后续扩展方向</span>
            <el-tag type="success" effect="plain">可演进</el-tag>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item timestamp="当前版本">
            完成菜单接入、页面骨架与本地 mock 数据承载。
          </el-timeline-item>
          <el-timeline-item timestamp="专题深化">
            按页面主题补齐筛选、明细抽屉、趋势图和审批流状态。
          </el-timeline-item>
          <el-timeline-item timestamp="系统联动">
            接入需求、代码、流水线、缺陷与知识沉淀系统数据。
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.skeleton-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.skeleton-hero {
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
    font-size: 32px;
  }

  p {
    max-width: 760px;
    margin: 0;
    line-height: 1.8;
    color: rgb(255 255 255 / 86%);
  }
}

.skeleton-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 0.8fr);
  gap: 18px;
}

.section-card {
  border: var(--ai-card-border);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-sm);
}

.card-head {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

.desc {
  margin: 0;
  line-height: 1.85;
  color: var(--el-text-color-secondary);
}

.mini-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;

  div {
    padding: 16px;
    background: var(--ai-surface-gradient);
    border: 1px solid rgb(226 232 240 / 88%);
    border-radius: var(--ai-card-radius-md);
  }

  span,
  strong {
    display: block;
  }

  span {
    color: var(--el-text-color-secondary);
  }

  strong {
    margin-top: 8px;
    font-size: 22px;
    color: var(--el-text-color-primary);
  }
}

@media (width <= 980px) {
  .skeleton-hero {
    flex-direction: column;
  }

  .skeleton-grid,
  .mini-grid {
    grid-template-columns: 1fr;
  }
}
</style>
