<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rule";
import { debounce } from "@pureadmin/utils";
import { useEventListener } from "@vueuse/core";
import type { FormInstance } from "element-plus";
import { $t, transformI18n } from "@/plugins/i18n";
import { useLayout } from "@/layout/hooks/useLayout";
import LoginUpdate from "./components/LoginUpdate.vue";
import { useUserStoreHook } from "@/store/modules/user";
import { initRouter, getTopMenu } from "@/router/utils";
import { ref, reactive, watch, computed } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import platformIllustration from "@/assets/login/illustration.svg?url";

import Lock from "~icons/ri/lock-fill";
import User from "~icons/ri/user-3-fill";

defineOptions({
  name: "Login"
});

const platformTitle = "AI + DevOps 研发协作平台";
const platformSubtitle = "统一支撑需求、研发、测试与验证协作";
const brandLogo = "/logo.svg";

const router = useRouter();
const loading = ref(false);
const checked = ref(false);
const disabled = ref(false);
const ruleFormRef = ref<FormInstance>();
const isUpdatePage = computed(() => useUserStoreHook().currentPage === 4);

const { t } = useI18n();
const { initStorage } = useLayout();
initStorage();
useUserStoreHook().SET_LOGINDAY(7);

const ruleForm = reactive({
  username: "admin",
  password: "admin123"
});

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      loading.value = true;
      useUserStoreHook()
        .loginByUsername({
          username: ruleForm.username,
          password: ruleForm.password
        })
        .then(async () => {
          await initRouter();
          disabled.value = true;
          router.push(getTopMenu(true).path).then(() => {
            message(t("login.pureLoginSuccess"), { type: "success" });
          });
        })
        .catch(_err => {
          message(t("login.pureLoginFail"), { type: "error" });
        })
        .finally(() => {
          disabled.value = false;
          loading.value = false;
        });
    }
  });
};

const immediateDebounce: any = debounce(
  formRef => onLogin(formRef),
  1000,
  true
);

useEventListener(document, "keydown", ({ code }) => {
  if (
    ["Enter", "NumpadEnter"].includes(code) &&
    !disabled.value &&
    !loading.value
  ) {
    immediateDebounce(ruleFormRef.value);
  }
});

watch(checked, bool => {
  useUserStoreHook().SET_ISREMEMBERED(bool);
});
</script>

<template>
  <div class="login-page select-none">
    <div class="login-shell">
      <div class="login-toolbar">
        <div class="toolbar-brand">
          <img :src="brandLogo" alt="AI + DevOps logo" class="toolbar-logo" />
          <span>{{ platformTitle }}</span>
        </div>
      </div>

      <div class="login-layout">
        <section class="brand-panel">
          <div class="brand-stage">
            <div class="brand-illustration-panel" aria-hidden="true">
              <div class="brand-illustration-wrap">
                <img
                  :src="platformIllustration"
                  alt=""
                  class="brand-illustration-img"
                />
              </div>
            </div>

            <div class="brand-copy">
              <h1>
                <span>AI + DevOps</span>
                <span>研发协作平台</span>
              </h1>
              <p>{{ platformSubtitle }}</p>
            </div>
          </div>
        </section>

        <section class="form-panel">
          <div class="login-card">
            <div class="login-card-head">
              <span class="card-kicker">{{ platformTitle }}</span>
              <h2>欢迎登录</h2>
              <p>{{ platformSubtitle }}</p>
            </div>

            <el-form
              v-if="!isUpdatePage"
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="loginRules"
              class="login-form"
              label-position="top"
              size="large"
              status-icon
            >
              <el-form-item
                :label="t('login.pureUsername')"
                :rules="[
                  {
                    required: true,
                    message: transformI18n($t('login.pureUsernameReg')),
                    trigger: 'blur'
                  }
                ]"
                prop="username"
              >
                <el-input
                  v-model="ruleForm.username"
                  clearable
                  :placeholder="t('login.pureUsername')"
                  :prefix-icon="useRenderIcon(User)"
                />
              </el-form-item>

              <el-form-item :label="t('login.purePassword')" prop="password">
                <el-input
                  v-model="ruleForm.password"
                  clearable
                  show-password
                  :placeholder="t('login.purePassword')"
                  :prefix-icon="useRenderIcon(Lock)"
                />
              </el-form-item>

              <el-form-item>
                <div class="remember-row">
                  <el-checkbox v-model="checked">
                    <span class="remember-copy">7天内免登录</span>
                  </el-checkbox>
                  <el-button
                    link
                    type="primary"
                    @click="useUserStoreHook().SET_CURRENTPAGE(4)"
                  >
                    {{ t("login.pureForget") }}
                  </el-button>
                </div>

                <el-button
                  class="submit-button"
                  size="default"
                  type="primary"
                  :loading="loading"
                  :disabled="disabled"
                  @click="onLogin(ruleFormRef)"
                >
                  登录平台
                </el-button>
              </el-form-item>
            </el-form>

            <div v-else class="secondary-form">
              <div class="login-card-head login-card-head-secondary">
                <span class="card-kicker">{{ platformTitle }}</span>
                <h2>欢迎登录</h2>
              </div>
              <LoginUpdate />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  padding-bottom: 8px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.4;
  color: rgb(51 65 85 / 82%);
  letter-spacing: 0.04em;
}

:deep(.el-checkbox__label) {
  color: inherit;
}

:deep(.el-input__wrapper) {
  background: rgb(255 255 255 / 88%);
  border-radius: 14px;
  box-shadow:
    inset 0 0 0 1px rgb(203 213 225 / 86%),
    0 10px 18px rgb(148 163 184 / 7%);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease,
    background-color 0.2s ease;
}

:deep(.el-input__wrapper:hover) {
  background: #fff;
  box-shadow:
    inset 0 0 0 1px rgb(147 197 253 / 92%),
    0 12px 20px rgb(59 130 246 / 9%);
}

:deep(.el-input__wrapper.is-focus) {
  background: #fff;
  box-shadow:
    inset 0 0 0 1px #60a5fa,
    0 0 0 4px rgb(96 165 250 / 14%),
    0 16px 28px rgb(59 130 246 / 12%);
}

:deep(.el-input__inner) {
  color: #0f172a;
}

:deep(.el-button--primary.submit-button) {
  background: linear-gradient(135deg, #3b82f6, #4f46e5);
}

:deep(.el-button--primary.submit-button:hover) {
  background: linear-gradient(135deg, #2563eb, #4338ca);
}

:deep(.secondary-action) {
  color: #334155;
  background: rgb(255 255 255 / 72%);
  border-color: rgb(203 213 225 / 88%);
  box-shadow: 0 10px 18px rgb(148 163 184 / 7%);
}

:deep(.secondary-action:hover) {
  color: #1d4ed8;
  background: rgb(239 246 255 / 92%);
  border-color: rgb(147 197 253 / 92%);
}
</style>
