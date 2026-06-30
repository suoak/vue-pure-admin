<script setup lang="ts">
import { computed, nextTick, ref, watch, type PropType } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";
import type { ConfirmationDistributionItem } from "../data";

const props = defineProps({
  data: {
    type: Array as PropType<ConfirmationDistributionItem[]>,
    default: () => []
  }
});

const { isDark } = useDark();
const theme = computed(() => (isDark.value ? "dark" : "light"));
const chartRef = ref();

const { setOptions } = useECharts(chartRef, {
  theme,
  renderer: "svg"
});

watch(
  () => props.data,
  async () => {
    await nextTick();
    setOptions({
      tooltip: {
        trigger: "item"
      },
      legend: {
        bottom: 0,
        icon: "circle",
        textStyle: {
          color: "#606266"
        }
      },
      series: [
        {
          name: "人工确认分布",
          type: "pie",
          radius: ["56%", "78%"],
          center: ["50%", "46%"],
          label: {
            formatter: "{b}\n{d}%",
            fontSize: 12
          },
          itemStyle: {
            borderRadius: 8,
            borderColor: "#fff",
            borderWidth: 3
          },
          data: props.data.map(item => ({
            value: item.value,
            name: item.name,
            itemStyle: {
              color: item.color
            }
          }))
        }
      ]
    });
  },
  {
    deep: true,
    immediate: true
  }
);
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 300px" />
</template>
