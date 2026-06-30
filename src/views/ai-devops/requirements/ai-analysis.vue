<script setup lang="ts">
import { computed, ref } from "vue";
import {
  requirementAnalysisRecords,
  requirementRecords,
  tagType
} from "./data";

defineOptions({
  name: "AiRequirementAnalysis"
});

const selectedRequirementId = ref(requirementAnalysisRecords[0].requirementId);

const selectedRequirement = computed(() => {
  return requirementRecords.find(
    item => item.id === selectedRequirementId.value
  );
});

const selectedAnalysis = computed(() => {
  return requirementAnalysisRecords.find(
    item => item.requirementId === selectedRequirementId.value
  );
});
</script>

<template>
  <div class="analysis-page">
    <section class="page-hero">
      <div>
        <span>需求与设计</span>
        <h1>AI 需求分析</h1>
        <p>
          展示 AI
          对需求的拆解、摘要、影响范围、验收标准和后续建议，辅助团队快速统一需求语义。
        </p>
      </div>
      <el-tag type="primary" effect="dark" round>AI 分析结果</el-tag>
    </section>

    <el-card shadow="never" class="section-card selector-card">
      <template #header>
        <div class="card-head">
          <span>需求选择区</span>
          <el-tag type="info" effect="plain">{{
            selectedRequirement?.project
          }}</el-tag>
        </div>
      </template>
      <el-segmented
        v-model="selectedRequirementId"
        :options="
          requirementAnalysisRecords.map(item => ({
            label: requirementRecords.find(req => req.id === item.requirementId)
              ?.requirementName,
            value: item.requirementId
          }))
        "
        block
      />
    </el-card>

    <template v-if="selectedAnalysis && selectedRequirement">
      <section class="content-grid">
        <el-card shadow="never" class="section-card result-card">
          <template #header>
            <div class="card-head">
              <span>AI 分析结果卡片</span>
              <el-tag
                :type="tagType(selectedRequirement.riskLevel)"
                effect="light"
                round
              >
                {{ selectedRequirement.riskLevel }}风险
              </el-tag>
            </div>
          </template>
          <h2>{{ selectedRequirement.requirementName }}</h2>
          <p>{{ selectedAnalysis.summary }}</p>
          <div class="meta-grid">
            <div>
              <span>来源</span>
              <strong>{{ selectedRequirement.source }}</strong>
            </div>
            <div>
              <span>负责人</span>
              <strong>{{ selectedRequirement.owner }}</strong>
            </div>
            <div>
              <span>AI 状态</span>
              <strong>{{ selectedRequirement.aiAnalysisStatus }}</strong>
            </div>
          </div>
        </el-card>

        <el-card shadow="never" class="section-card">
          <template #header>
            <div class="card-head">
              <span>影响范围</span>
              <el-tag type="warning" effect="plain">系统与业务</el-tag>
            </div>
          </template>
          <div class="impact-list">
            <article
              v-for="item in selectedAnalysis.impactScope"
              :key="item.area"
            >
              <div>
                <h3>{{ item.area }}</h3>
                <p>{{ item.description }}</p>
              </div>
              <el-tag :type="tagType(item.level)" effect="light" round>
                {{ item.level }}
              </el-tag>
            </article>
          </div>
        </el-card>
      </section>

      <section class="detail-grid">
        <el-card shadow="never" class="section-card">
          <template #header
            ><div class="card-head"><span>功能拆解</span></div></template
          >
          <ul>
            <li v-for="item in selectedAnalysis.coreFeatures" :key="item">
              {{ item }}
            </li>
          </ul>
        </el-card>
        <el-card shadow="never" class="section-card">
          <template #header
            ><div class="card-head"><span>边界场景</span></div></template
          >
          <ul>
            <li v-for="item in selectedAnalysis.boundaryScenarios" :key="item">
              {{ item }}
            </li>
          </ul>
        </el-card>
        <el-card shadow="never" class="section-card">
          <template #header
            ><div class="card-head"><span>验收标准</span></div></template
          >
          <ul>
            <li v-for="item in selectedAnalysis.acceptanceCriteria" :key="item">
              {{ item }}
            </li>
          </ul>
        </el-card>
        <el-card shadow="never" class="section-card">
          <template #header
            ><div class="card-head"><span>测试关注点</span></div></template
          >
          <ul>
            <li v-for="item in selectedAnalysis.testFocus" :key="item">
              {{ item }}
            </li>
          </ul>
        </el-card>
        <el-card shadow="never" class="section-card">
          <template #header
            ><div class="card-head"><span>设计注意事项</span></div></template
          >
          <ul>
            <li v-for="item in selectedAnalysis.designNotes" :key="item">
              {{ item }}
            </li>
          </ul>
        </el-card>
        <el-card shadow="never" class="section-card">
          <template #header
            ><div class="card-head">
              <span>潜在风险与建议下一步</span>
            </div></template
          >
          <div class="risk-next">
            <div>
              <h3>潜在风险</h3>
              <ul>
                <li v-for="item in selectedAnalysis.potentialRisks" :key="item">
                  {{ item }}
                </li>
              </ul>
            </div>
            <div>
              <h3>建议下一步</h3>
              <ul>
                <li v-for="item in selectedAnalysis.nextSteps" :key="item">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </el-card>
      </section>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.analysis-page {
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

.section-card {
  border: var(--ai-card-border);
  border-radius: var(--ai-card-radius-lg);
  box-shadow: var(--ai-card-shadow-sm);
}

.card-head,
.impact-list article {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.card-head {
  font-weight: 600;
}

.content-grid,
.detail-grid,
.meta-grid {
  display: grid;
  gap: 18px;
}

.content-grid {
  grid-template-columns: minmax(0, 1.2fr) minmax(360px, 0.8fr);
}

.detail-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.meta-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 20px;

  div {
    padding: 14px;
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
  }
}

.result-card {
  h2 {
    margin: 0 0 12px;
    font-size: 22px;
  }

  p {
    margin: 0;
    line-height: 1.85;
    color: var(--el-text-color-secondary);
  }
}

.impact-list {
  display: flex;
  flex-direction: column;
  gap: 12px;

  article {
    align-items: flex-start;
    padding: 14px;
    background: var(--ai-surface-gradient);
    border: 1px solid rgb(226 232 240 / 88%);
    border-radius: var(--ai-card-radius-md);
  }

  h3 {
    margin: 0;
    font-size: 15px;
  }

  p {
    margin: 8px 0 0;
    line-height: 1.7;
    color: var(--el-text-color-secondary);
  }
}

ul {
  padding-left: 18px;
  margin: 0;
  line-height: 1.85;
  color: var(--el-text-color-secondary);
}

.risk-next {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  h3 {
    margin: 0 0 10px;
    font-size: 15px;
  }
}

@media (width <= 1280px) {
  .detail-grid,
  .content-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width <= 768px) {
  .page-hero,
  .risk-next {
    flex-direction: column;
    grid-template-columns: 1fr;
  }

  .detail-grid,
  .content-grid,
  .meta-grid {
    grid-template-columns: 1fr;
  }
}
</style>
