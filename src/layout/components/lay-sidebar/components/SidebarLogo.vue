<script setup lang="ts">
import { computed } from "vue";
import { getTopMenu } from "@/router/utils";
import { useNav } from "@/layout/hooks/useNav";

defineProps({
  collapse: Boolean
});

const { title, getLogo } = useNav();
const sidebarDisplayTitle = computed(() => {
  return title.value.includes("AI + DevOps") ? "AI + DevOps" : title.value;
});
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapses: collapse }">
    <router-link
      :title="title"
      :aria-label="title"
      class="sidebar-logo-link"
      :to="getTopMenu()?.path ?? '/'"
    >
      <img :src="getLogo()" alt="logo" />
      <span class="sidebar-title">{{ sidebarDisplayTitle }}</span>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 48px;
  overflow: hidden;
  background:
    radial-gradient(circle at left top, rgb(96 165 250 / 12%), transparent 28%),
    linear-gradient(180deg, rgb(255 255 255 / 96%), rgb(248 250 252 / 98%));
  border-bottom: 1px solid rgb(148 163 184 / 12%);

  .sidebar-logo-link {
    box-sizing: border-box;
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 12px;

    img {
      display: block;
      flex: none;
      height: 30px;
      border-radius: 10px;
      filter: drop-shadow(0 10px 20px rgb(15 23 42 / 24%));
    }

    .sidebar-title {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: var(--app-font-sans);
      font-size: 15px;
      font-weight: 700;
      line-height: 1;
      color: var(--pure-theme-sub-menu-active-text);
      letter-spacing: 0.02em;
      white-space: nowrap;
    }
  }

  &.collapses {
    .sidebar-logo-link {
      justify-content: center;
      padding: 0;
    }

    .sidebar-title {
      display: none;
    }
  }
}
</style>
