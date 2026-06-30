<script setup lang="ts">
import ProcessWorkspace from "../components/ProcessWorkspace.vue";
import { codingReviewWorkspace } from "./data";

defineOptions({
  name: "CodingReviewPage"
});
</script>

<template>
  <ProcessWorkspace v-bind="codingReviewWorkspace" />
</template>
