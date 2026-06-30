<script setup lang="ts">
import { useNav } from "@/layout/hooks/useNav";
import LaySearch from "../lay-search/index.vue";
import LayNotice from "../lay-notice/index.vue";
import LayNavMix from "../lay-sidebar/NavMix.vue";
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import LaySidebarFullScreen from "../lay-sidebar/components/SidebarFullScreen.vue";
import LaySidebarBreadCrumb from "../lay-sidebar/components/SidebarBreadCrumb.vue";
import LaySidebarTopCollapse from "../lay-sidebar/components/SidebarTopCollapse.vue";

import GlobalizationIcon from "@/assets/svg/globalization.svg?component";
import AccountSettingsIcon from "~icons/ri/user-settings-line";
import LogoutCircleRLine from "~icons/ri/logout-circle-r-line";
import Setting from "~icons/ri/settings-3-line";
import Check from "~icons/ep/check";

const {
  layout,
  device,
  logout,
  onPanel,
  pureApp,
  username,
  userAvatar,
  avatarsStyle,
  toggleSideBar,
  toAccountSettings,
  getDropdownItemStyle,
  getDropdownItemClass
} = useNav();

const { t, locale, translationCh, translationEn } = useTranslationLang();
</script>

<template>
  <div class="navbar">
    <LaySidebarTopCollapse
      v-if="device === 'mobile'"
      class="hamburger-container"
      :is-active="pureApp.sidebar.opened"
      @toggleClick="toggleSideBar"
    />

    <LaySidebarBreadCrumb
      v-if="layout !== 'mix' && device !== 'mobile'"
      class="breadcrumb-container"
    />

    <LayNavMix v-if="layout === 'mix'" />

    <div v-if="layout === 'vertical'" class="vertical-header-right">
      <!-- 菜单搜索 -->
      <LaySearch id="header-search" />
      <!-- 国际化 -->
      <el-dropdown id="header-translation" trigger="click">
        <button
          type="button"
          aria-label="Change language"
          class="globalization-icon navbar-bg-hover hover:[&>svg]:animate-scale-bounce"
        >
          <IconifyIconOffline :icon="GlobalizationIcon" />
        </button>
        <template #dropdown>
          <el-dropdown-menu class="translation">
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'zh')"
              :class="['dark:text-white!', getDropdownItemClass(locale, 'zh')]"
              @click="translationCh"
            >
              <IconifyIconOffline
                v-show="locale === 'zh'"
                class="check-zh"
                :icon="Check"
              />
              简体中文
            </el-dropdown-item>
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'en')"
              :class="['dark:text-white!', getDropdownItemClass(locale, 'en')]"
              @click="translationEn"
            >
              <span v-show="locale === 'en'" class="check-en">
                <IconifyIconOffline :icon="Check" />
              </span>
              English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 全屏 -->
      <LaySidebarFullScreen id="full-screen" />
      <!-- 消息通知 -->
      <LayNotice id="header-notice" />
      <!-- 退出登录 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link navbar-bg-hover select-none">
          <img :src="userAvatar" :style="avatarsStyle" />
          <p v-if="username" class="dark:text-white">{{ username }}</p>
        </span>
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="toAccountSettings">
              <IconifyIconOffline
                :icon="AccountSettingsIcon"
                style="margin: 5px"
              />
              {{ t("buttons.pureAccountSettings") }}
            </el-dropdown-item>
            <el-dropdown-item @click="logout">
              <IconifyIconOffline
                :icon="LogoutCircleRLine"
                style="margin: 5px"
              />
              {{ t("buttons.pureLoginOut") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <button
        type="button"
        class="set-icon navbar-bg-hover hover:[&>svg]:animate-scale-bounce"
        :title="t('buttons.pureOpenSystemSet')"
        :aria-label="t('buttons.pureOpenSystemSet')"
        @click="onPanel"
      >
        <IconifyIconOffline :icon="Setting" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 52px;
  overflow: hidden;
  background: rgb(255 255 255 / 76%);
  border-bottom: 1px solid rgb(148 163 184 / 14%);
  box-shadow: 0 8px 24px rgb(15 23 42 / 4%);
  backdrop-filter: blur(14px);

  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 52px;
    cursor: pointer;
  }

  .vertical-header-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 280px;
    height: 52px;
    color: rgb(15 23 42 / 82%);

    .el-dropdown-link {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 44px;
      padding: 0 12px;
      color: rgb(15 23 42 / 82%);
      cursor: pointer;
      border-radius: 14px;
      transition:
        background-color 0.2s ease,
        color 0.2s ease;

      p {
        font-size: 14px;
        font-weight: 600;
      }

      img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
      }
    }
  }

  .breadcrumb-container {
    float: left;
    margin-left: 16px;
  }
}

.globalization-icon,
.set-icon {
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 14px;
}

:deep(.search-container),
:deep(.globalization-icon),
:deep(.fullscreen-icon),
:deep(.dropdown-badge),
:deep(.el-dropdown-link),
:deep(.set-icon) {
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.translation {
  :deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}

.logout {
  width: 120px;

  :deep(.el-dropdown-menu__item) {
    display: inline-flex;
    flex-wrap: wrap;
    min-width: 100%;
  }
}
</style>
