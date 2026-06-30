<script setup lang="ts">
import { computed, ref } from "vue";
import { resultAssets, tagType, type ResultAssetRecord } from "./data";

defineOptions({ name: "ResultAssets" });

const selectedAsset = ref<ResultAssetRecord>(resultAssets[0]);
const stats = computed(() => [
  { label: "沉淀成果", value: resultAssets.length, type: "primary" as const },
  {
    label: "复用次数",
    value: resultAssets.reduce((sum, item) => sum + item.reuseCount, 0),
    type: "info" as const
  },
  {
    label: "已发布",
    value: resultAssets.filter(item => item.status === "已发布").length,
    type: "success" as const
  },
  {
    label: "待复核",
    value: resultAssets.filter(item => item.status === "待复核").length,
    type: "warning" as const
  }
]);
</script>

<template>
  <div class="records-page">
    <section class="records-hero">
      <div>
        <span>AI 协作记录</span>
        <h1>结果沉淀</h1>
        <p>展示 AI 产出的内容如何沉淀为知识、规范、用例或报告，并持续复用。</p>
      </div>
      <el-tag type="success" effect="dark" round>可复用资产</el-tag>
    </section>
    <section class="stats-grid">
      <el-card
        v-for="item in stats"
        :key="item.label"
        shadow="never"
        class="stat-card"
        ><span>{{ item.label }}</span
        ><strong>{{ item.value }}</strong
        ><el-tag :type="item.type" effect="plain" round>当前</el-tag></el-card
      >
    </section>
    <section class="content-grid">
      <el-card shadow="never" class="section-card"
        ><template #header
          ><div class="card-head">
            <span>沉淀成果列表</span
            ><el-tag type="info" effect="plain"
              >知识 / 规范 / 用例 / 报告</el-tag
            >
          </div></template
        ><el-table
          :data="resultAssets"
          stripe
          highlight-current-row
          @row-click="row => (selectedAsset = row)"
          ><el-table-column
            prop="assetName"
            label="成果名称"
            min-width="220" /><el-table-column
            prop="assetType"
            label="成果类型"
            width="130" /><el-table-column
            prop="sourceStage"
            label="来源环节"
            width="130" /><el-table-column
            prop="sourceAiTask"
            label="来源 AI 任务"
            min-width="220" /><el-table-column
            prop="reuseCount"
            label="复用次数"
            width="95" /><el-table-column label="状态" width="100"
            ><template #default="{ row }"
              ><el-tag :type="tagType(row.status)" effect="light" round>{{
                row.status
              }}</el-tag></template
            ></el-table-column
          ><el-table-column
            prop="updatedAt"
            label="更新时间"
            width="130" /></el-table></el-card
      ><el-card shadow="never" class="section-card detail-card"
        ><template #header
          ><div class="card-head">
            <span>成果详情</span
            ><el-tag :type="tagType(selectedAsset.status)" effect="plain">{{
              selectedAsset.assetType
            }}</el-tag>
          </div></template
        >
        <h2>{{ selectedAsset.assetName }}</h2>
        <p>{{ selectedAsset.summary }}</p>
        <div class="asset-meta">
          <span>来源环节：{{ selectedAsset.sourceStage }}</span
          ><span>来源任务：{{ selectedAsset.sourceAiTask }}</span
          ><span>复用次数：{{ selectedAsset.reuseCount }}</span
          ><span>更新时间：{{ selectedAsset.updatedAt }}</span>
        </div></el-card
      >
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
.content-grid {
  display: grid;
  gap: 18px;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.content-grid {
  grid-template-columns: 1fr;
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
.detail-card p,
.asset-meta {
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
  margin: 0 0 12px;
  font-size: 20px;
}

.detail-card p {
  margin: 0;
  line-height: 1.85;
}

.asset-meta {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.asset-meta span {
  padding: 12px;
  background: var(--ai-surface-gradient);
  border: 1px solid rgb(226 232 240 / 88%);
  border-radius: var(--ai-card-radius-md);
}

@media (width <= 1280px) {
  .stats-grid,
  .asset-meta {
    grid-template-columns: 1fr 1fr;
  }
}

@media (width <= 768px) {
  .records-hero {
    flex-direction: column;
  }

  .stats-grid,
  .asset-meta {
    grid-template-columns: 1fr;
  }
}
</style>
