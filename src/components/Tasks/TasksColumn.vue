<script setup lang="ts">
import type { TaskInterface } from "@/interfaces/tasks";
import type { PropType } from "vue";
import Task from "@/components/Tasks/Task.vue";

defineEmits(["stateChanged"]);
defineProps({
  title: { type: String, required: true },
  tasks: {
    type: Array as PropType<TaskInterface[]>,
    default: [],
  },
});
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h4 class="m-0 text-start">{{ title }}</h4>
    </div>
    <div class="list-group">
      <div class="list-group-item m-0 border-0" v-if="tasks.length === 0">
        <div class="text-start">None</div>
      </div>

      <Task
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        @state-changed="$emit('stateChanged', $event)"
      >
      </Task>
    </div>
  </div>
</template>
