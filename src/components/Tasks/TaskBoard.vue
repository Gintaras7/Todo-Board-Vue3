<script setup lang="ts">
import TasksColumn from "@/components/Tasks/TasksColumn.vue";
import TaskForm from "@/components/Tasks/TaskForm.vue";
import { TaskState, type TaskInterface } from "@/interfaces/tasks";
import { ref, computed, onMounted } from "vue";
import useTaskList from "./compositions/useTaskList";

const tasks = useTaskList("tasks");

onMounted(() => tasks.loadFromStorage());

const tasksOpened = computed(() => tasks.filterByState(TaskState.OPENED));
const tasksInProgress = computed(() =>
  tasks.filterByState(TaskState.IN_PROGRESS)
);
const tasksDone = computed(() => tasks.filterByState(TaskState.DONE));
const tasksClosed = computed(() => tasks.filterByState(TaskState.CLOSED));

const addTask = (formTask: TaskInterface) => {
  const taskToSave = { ...formTask, id: tasks.all.value.length + 1 };
  tasks.add(taskToSave);
};

const stateChanged = (event: {
  task: TaskInterface;
  transitionTo: TaskState;
}): void => {
  const updatedTask = { ...event.task, status: event.transitionTo };
  tasks.replaceTaskById(event.task.id, updatedTask);
};
</script>

<template>
  <TaskForm class="form-width margin-bottom-50" @submitted="addTask" />

  <!-- display tasks -->
  <div class="row">
    <div class="col-12 col-md-6 col-lg-3">
      <TasksColumn
        title="Opened"
        class="my-2"
        :type="TaskState.OPENED"
        :tasks="tasksOpened"
        @state-changed="stateChanged"
      />
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <TasksColumn
        title="In Progress"
        class="my-2"
        :type="TaskState.IN_PROGRESS"
        :tasks="tasksInProgress"
        @state-changed="stateChanged"
      />
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <TasksColumn
        title="Done"
        class="my-2"
        :type="TaskState.DONE"
        :tasks="tasksDone"
        @state-changed="stateChanged"
      />
    </div>
    <div class="col-12 col-md-6 col-lg-3">
      <TasksColumn
        title="Closed"
        class="my-2"
        :type="TaskState.CLOSED"
        :tasks="tasksClosed"
        @state-changed="stateChanged"
      />
    </div>
  </div>
</template>

<style scoped>
header {
  margin-top: 100px;
}

.margin-bottom-50 {
  margin-bottom: 50px;
}

.form-width {
  max-width: 400px;
}
</style>
