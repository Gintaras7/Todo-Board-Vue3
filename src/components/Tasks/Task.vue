<script setup lang="ts">
import type { TaskInterface } from "@/interfaces/tasks";
import type { PropType } from "vue";
import useTaskTransitions from "@/components/Tasks/compositions/useTaskTransitions";

defineEmits(["stateChanged"]);
const props = defineProps({
  task: {
    type: Object as PropType<TaskInterface>,
    required: true,
  },
});

const stateTransitions = useTaskTransitions(props.task.status);
</script>

<template>
  <div class="list-group-item text-start rounded-0 m-0">
    <div class="text-start">
      <h5 class="mb-1">{{ task.title }}</h5>
    </div>
    <div>{{ task.description }}</div>
    <div class="my-1">
      <button
        v-for="(val, key) in stateTransitions.allowedTransitionsList.value"
        :key="key"
        class="btn-primary btn-sm btn class ml-0 my-1 mr-1"
        @click.prevent="
          $emit('stateChanged', { task: task, transitionTo: val.key })
        "
      >
        {{ val.title }}
      </button>
    </div>
  </div>
</template>
