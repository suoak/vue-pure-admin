<script setup lang="ts">
import ProcessWorkspace from "../components/ProcessWorkspace.vue";
import { internalTestingWorkspace } from "./data";

defineOptions({
  name: "InternalTestingPage"
});
</script>

<template>
  <ProcessWorkspace v-bind="internalTestingWorkspace" />
</template>
