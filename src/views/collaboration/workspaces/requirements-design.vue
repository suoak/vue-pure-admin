<script setup lang="ts">
import ProcessWorkspace from "../components/ProcessWorkspace.vue";
import { requirementsDesignWorkspace } from "./data";

defineOptions({
  name: "RequirementsDesignPage"
});
</script>

<template>
  <ProcessWorkspace v-bind="requirementsDesignWorkspace" />
</template>
