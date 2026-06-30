<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { platformPageConfigs } from "./data";

defineOptions({
  name: "PlatformPage"
});

const route = useRoute();

const pageConfig = computed(() => {
  return (
    platformPageConfigs[String(route.name)] ?? {
      badge: "研发协作平台",
      title: String(route.meta.title ?? "页面骨架"),
      description:
        "该页面用于承接 AI + DevOps 研发协作平台的后续业务内容建设。",
      cards: [
        { label: "页面状态", value: "可访问", note: "已纳入平台菜单与路由" },
        {
          label: "内容阶段",
          value: "骨架版",
          note: "支持后续继续扩展业务能力"
        },
        { label: "协作定位", value: "已定义", note: "适合作为领导演示承载页面" }
      ],
      sections: [
        {
          title: "页面说明",
          desc: "该页面已完成基础占位，可继续叠加图表、表格和流程卡片。"
        },
        {
          title: "协作价值",
          desc: "建议围绕研发流程、AI 协作闭环和决策指标继续完善。"
        },
        {
          title: "后续扩展",
          desc: "可逐步接入真实数据、权限策略和联动动作。"
        }
      ]
    }
  );
});
</script>

<template>
  <div class="platform-page">
    <section class="hero-panel">
      <div class="hero-badge">{{ pageConfig.badge }}</div>
      <h1>{{ pageConfig.title }}</h1>
      <p>{{ pageConfig.description }}</p>
    </section>

    <section class="card-grid">
      <el-card
        v-for="item in pageConfig.cards"
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
      <el-card shadow="never" class="content-card">
        <template #header>
          <div class="card-head">
            <span>页面说明</span>
            <el-tag type="primary" effect="plain">领导演示骨架</el-tag>
          </div>
        </template>
        <div class="section-list">
          <div
            v-for="(item, index) in pageConfig.sections"
            :key="item.title"
            class="section-item"
          >
            <span class="section-index">0{{ index + 1 }}</span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="content-card">
        <template #header>
          <div class="card-head">
            <span>协作建议</span>
            <el-tag type="success" effect="plain">可继续扩展</el-tag>
          </div>
        </template>
        <div class="suggestion-panel">
          <div class="suggestion-item">
            <h3>围绕研发流程组织内容</h3>
            <p>建议优先补充本页面与上下游协作环节的输入、输出和责任边界。</p>
          </div>
          <div class="suggestion-item">
            <h3>强化 AI 协作闭环</h3>
            <p>可增加 AI 生成、人工确认和结果回写等联动信息，让价值更直观。</p>
          </div>
          <div class="suggestion-item">
            <h3>补充管理指标</h3>
            <p>适合增加进度、风险、效率和质量类指标，用于领导视角汇报。</p>
          </div>
        </div>
      </el-card>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.platform-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.hero-panel {
  padding: 24px;
  color: #fff;
  background:
    radial-gradient(
      circle at top right,
      rgb(255 255 255 / 18%),
      transparent 28%
    ),
    linear-gradient(135deg, #0f172a, #1f6bff 55%, #1099ae);
  border-radius: 22px;

  h1 {
    margin: 10px 0 12px;
    font-size: 32px;
    line-height: 1.15;
  }

  p {
    max-width: 880px;
    margin: 0;
    line-height: 1.8;
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

.card-grid,
.content-grid {
  display: grid;
  gap: 18px;
}

.card-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.content-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.metric-card,
.content-card {
  border: none;
  border-radius: 18px;
}

.metric-card {
  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.metric-label,
.metric-note,
.section-item p,
.suggestion-item p {
  color: var(--el-text-color-secondary);
}

.metric-label {
  font-size: 13px;
}

.metric-value {
  font-size: 30px;
  line-height: 1.2;
  color: var(--el-text-color-primary);
}

.metric-note,
.section-item p,
.suggestion-item p {
  font-size: 13px;
  line-height: 1.8;
}

.card-head {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

.section-list,
.suggestion-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-item,
.suggestion-item {
  display: flex;
  gap: 14px;
  padding: 16px;
  background: linear-gradient(180deg, rgb(248 250 252), rgb(255 255 255));
  border: 1px solid rgb(226 232 240);
  border-radius: 16px;
}

.section-index {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-weight: 700;
  color: #1f6bff;
  background: rgb(31 107 255 / 10%);
  border-radius: 12px;
}

.section-item h3,
.suggestion-item h3 {
  margin: 0 0 6px;
  font-size: 15px;
  color: var(--el-text-color-primary);
}

.section-item p,
.suggestion-item p {
  margin: 0;
}

@media (width <= 1080px) {
  .card-grid,
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
}
</style>
