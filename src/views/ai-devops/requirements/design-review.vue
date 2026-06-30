<script setup lang="ts">
import { computed, ref } from "vue";
import { designReviewRecords, tagType, type DesignReviewRecord } from "./data";

defineOptions({
  name: "RequirementDesignReview"
});

const selectedReview = ref<DesignReviewRecord>(designReviewRecords[0]);

const reviewStats = computed(() => [
  {
    label: "评审主题",
    value: designReviewRecords.length,
    type: "primary" as const
  },
  {
    label: "待确认问题",
    value: designReviewRecords.reduce(
      (total, item) => total + item.pendingItems,
      0
    ),
    type: "warning" as const
  },
  {
    label: "已通过评审",
    value: designReviewRecords.filter(item => item.reviewStatus === "已通过")
      .length,
    type: "success" as const
  },
  {
    label: "需重点关注",
    value: designReviewRecords.filter(item => item.pendingItems >= 3).length,
    type: "danger" as const
  }
]);
</script>

<template>
  <div class="review-page">
    <section class="page-hero">
      <div>
        <span>需求与设计</span>
        <h1>设计评审</h1>
        <p>
          展示设计评审过程、评审项检查、待确认问题和评审结论，确保方案确认可追溯。
        </p>
      </div>
      <el-tag type="primary" effect="dark" round>设计确认</el-tag>
    </section>

    <section class="stats-grid">
      <el-card
        v-for="item in reviewStats"
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
            <span>设计评审列表</span>
            <el-tag type="info" effect="plain">评审过程</el-tag>
          </div>
        </template>
        <el-table
          :data="designReviewRecords"
          stripe
          highlight-current-row
          @row-click="row => (selectedReview = row)"
        >
          <el-table-column
            prop="reviewTopic"
            label="评审主题"
            min-width="230"
          />
          <el-table-column
            prop="relatedRequirement"
            label="关联需求"
            min-width="220"
          />
          <el-table-column label="评审状态" width="110">
            <template #default="{ row }">
              <el-tag :type="tagType(row.reviewStatus)" effect="light" round>
                {{ row.reviewStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="reviewer" label="评审人" width="120" />
          <el-table-column
            prop="aiConclusion"
            label="AI 辅助结论"
            min-width="260"
          />
          <el-table-column prop="pendingItems" label="待确认项" width="100" />
          <el-table-column prop="reviewTime" label="评审时间" width="130" />
        </el-table>
      </el-card>

      <el-card shadow="never" class="section-card detail-card">
        <template #header>
          <div class="card-head">
            <span>评审项检查</span>
            <el-tag :type="tagType(selectedReview.reviewStatus)" effect="plain">
              {{ selectedReview.reviewStatus }}
            </el-tag>
          </div>
        </template>
        <h2>{{ selectedReview.reviewTopic }}</h2>
        <div class="check-list">
          <article v-for="item in selectedReview.checklist" :key="item.item">
            <div>
              <h3>{{ item.item }}</h3>
              <p>{{ item.note }}</p>
            </div>
            <el-tag :type="tagType(item.status)" effect="light" round>
              {{ item.status }}
            </el-tag>
          </article>
        </div>
      </el-card>
    </section>

    <section class="content-grid bottom-grid">
      <el-card shadow="never" class="section-card">
        <template #header>
          <div class="card-head">
            <span>评审意见</span>
            <el-tag type="warning" effect="plain"
              >待确认问题 {{ selectedReview.pendingItems }}</el-tag
            >
          </div>
        </template>
        <ul>
          <li v-for="item in selectedReview.opinions" :key="item">
            {{ item }}
          </li>
        </ul>
      </el-card>

      <el-card shadow="never" class="section-card conclusion-card">
        <template #header>
          <div class="card-head">
            <span>评审结论</span>
            <el-tag type="success" effect="plain">结论沉淀</el-tag>
          </div>
        </template>
        <p>{{ selectedReview.conclusion }}</p>
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
  grid-template-columns: minmax(0, 1.25fr) minmax(380px, 0.75fr);
}

.bottom-grid {
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 1.05fr);
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

.stat-card span {
  color: var(--el-text-color-secondary);
}

.stat-card strong {
  font-size: 30px;
}

.card-head,
.check-list article {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.card-head {
  font-weight: 600;
}

.detail-card h2 {
  margin: 0 0 14px;
  font-size: 20px;
}

.check-list {
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
  line-height: 1.9;
  color: var(--el-text-color-secondary);
}

.conclusion-card p {
  margin: 0;
  line-height: 1.9;
  color: var(--el-text-color-secondary);
}

@media (width <= 1280px) {
  .stats-grid,
  .content-grid,
  .bottom-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width <= 768px) {
  .page-hero {
    flex-direction: column;
  }

  .stats-grid,
  .content-grid,
  .bottom-grid {
    grid-template-columns: 1fr;
  }
}
</style>
