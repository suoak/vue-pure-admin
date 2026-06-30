<script setup lang="ts">
import { computed, nextTick, ref, watch, type PropType } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";

const props = defineProps({
  labels: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  taskVolume: {
    type: Array as PropType<number[]>,
    default: () => []
  },
  confirmVolume: {
    type: Array as PropType<number[]>,
    default: () => []
  }
});

const { isDark } = useDark();
const theme = computed(() => (isDark.value ? "dark" : "light"));
const chartRef = ref();

const { setOptions } = useECharts(chartRef, {
  theme
});

watch(
  () => [props.labels, props.taskVolume, props.confirmVolume],
  async () => {
    await nextTick();
    setOptions({
      color: ["#2563eb", "#0ea5e9"],
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["AI 协作任务", "人工确认"],
        top: 0,
        textStyle: {
          color: "#606266"
        }
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 10,
        top: 40,
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: props.labels,
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            color: "rgba(148,163,184,0.18)"
          }
        }
      },
      series: [
        {
          name: "AI 协作任务",
          type: "bar",
          barMaxWidth: 18,
          itemStyle: {
            borderRadius: [8, 8, 0, 0]
          },
          data: props.taskVolume
        },
        {
          name: "人工确认",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: {
            width: 3
          },
          areaStyle: {
            opacity: 0.12
          },
          data: props.confirmVolume
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
