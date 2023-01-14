<script setup lang="ts">
import TaskBoard from "@/components/Tasks/TaskBoard.vue";
import { ref, computed, onMounted } from "vue";
</script>

<template>
  <header>
    <h1>Tasks</h1>
  </header>

  <TaskBoard></TaskBoard>
</template>

<style scoped>
header {
  margin-top: 100px;
}
</style>
