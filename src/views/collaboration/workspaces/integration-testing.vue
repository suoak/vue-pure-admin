<script setup lang="ts">
import ProcessWorkspace from "../components/ProcessWorkspace.vue";
import { integrationTestingWorkspace } from "./data";

defineOptions({
  name: "IntegrationTestingPage"
});
</script>

<template>
  <ProcessWorkspace v-bind="integrationTestingWorkspace" />
</template>
