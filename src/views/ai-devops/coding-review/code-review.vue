<script setup lang="ts">
import { computed, ref } from "vue";
import { codeReviewRecords, tagType, type CodeReviewRecord } from "./data";

defineOptions({
  name: "CodeReview"
});

const selectedReview = ref<CodeReviewRecord>(codeReviewRecords[0]);

const stats = computed(() => [
  {
    label: "评审任务",
    value: codeReviewRecords.length,
    type: "primary" as const
  },
  {
    label: "问题数",
    value: codeReviewRecords.reduce(
      (total, item) => total + item.issueCount,
      0
    ),
    type: "warning" as const
  },
  {
    label: "高风险评审",
    value: codeReviewRecords.filter(item => item.riskLevel === "高").length,
    type: "danger" as const
  },
  {
    label: "可合入",
    value: codeReviewRecords.filter(item => item.conclusion === "可合入")
      .length,
    type: "success" as const
  }
]);
</script>

<template>
  <div class="review-page">
    <section class="page-hero">
      <div>
        <span>编码与评审</span>
        <h1>代码评审</h1>
        <p>
          展示代码评审记录、AI
          评审建议、人工评审意见、风险代码提示和最终评审结论。
        </p>
      </div>
      <el-tag type="primary" effect="dark" round>质量把关</el-tag>
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
            <span>评审任务列表</span>
            <el-tag type="info" effect="plain">AI + 人工</el-tag>
          </div>
        </template>
        <el-table
          :data="codeReviewRecords"
          stripe
          highlight-current-row
          @row-click="row => (selectedReview = row)"
        >
          <el-table-column prop="reviewTask" label="评审任务" min-width="220" />
          <el-table-column prop="repository" label="代码仓库" width="150" />
          <el-table-column prop="commitRecord" label="提交记录" width="160" />
          <el-table-column label="AI 评审状态" width="120">
            <template #default="{ row }">
              <el-tag :type="tagType(row.aiReviewStatus)" effect="plain" round>
                {{ row.aiReviewStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="人工评审状态" width="130">
            <template #default="{ row }">
              <el-tag
                :type="tagType(row.manualReviewStatus)"
                effect="light"
                round
              >
                {{ row.manualReviewStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="issueCount" label="问题数" width="90" />
          <el-table-column label="风险等级" width="100">
            <template #default="{ row }">
              <el-tag :type="tagType(row.riskLevel)" effect="dark" round>{{
                row.riskLevel
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="结论" width="110">
            <template #default="{ row }">
              <el-tag :type="tagType(row.conclusion)" effect="light" round>
                {{ row.conclusion }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card shadow="never" class="section-card detail-card">
        <template #header>
          <div class="card-head">
            <span>评审结论</span>
            <el-tag :type="tagType(selectedReview.conclusion)" effect="plain">
              {{ selectedReview.conclusion }}
            </el-tag>
          </div>
        </template>
        <h2>{{ selectedReview.reviewTask }}</h2>
        <div class="detail-block">
          <h3>AI 评审建议</h3>
          <ul>
            <li v-for="item in selectedReview.aiSuggestions" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="detail-block">
          <h3>人工评审意见</h3>
          <ul>
            <li v-for="item in selectedReview.humanOpinions" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="detail-block risk-block">
          <h3>风险代码提示</h3>
          <ul>
            <li v-for="item in selectedReview.riskHints" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
      </el-card>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.review-page {
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
.content-grid {
  display: grid;
  gap: 18px;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.content-grid {
  grid-template-columns: minmax(0, 1.3fr) minmax(380px, 0.7fr);
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

.detail-block {
  padding: 14px;
  margin-top: 12px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);

  h3 {
    margin: 0 0 10px;
    font-size: 15px;
  }
}

.risk-block {
  border-color: rgb(220 38 38 / 20%);
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
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
