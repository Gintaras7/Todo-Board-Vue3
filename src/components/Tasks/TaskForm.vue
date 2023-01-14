<script setup lang="ts">
import { TaskState } from "@/interfaces/tasks";
import { ref, computed, onMounted } from "vue";

const emit = defineEmits(["submitted"]);

const form = ref({
  title: "" as string,
  description: "" as string,
  status: TaskState.OPENED,
});

const formSubmitted = () => {
  emit('submitted', form.value)
  resetForm();
};

const resetForm = () => {
  form.value = {
    title: "",
    description: "",
    status: TaskState.OPENED,
  };
};

const canAddTask = computed<boolean>(() => {
  return form.value.title.length > 0 && form.value.description.length > 0;
});

</script>

<template>
    <form @submit.prevent="formSubmitted">
      <div class="mb-3 text-start">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="form.title"
        />
      </div>
      <div class="mb-3 text-start">
        <label for="description" class="form-label">Description</label>
        <textarea
          type="text"
          class="form-control"
          id="description"
          v-model="form.description"
        ></textarea>
      </div>
      <div class="text-end">
        <button
          type="submit"
          class="btn btn-primary d-block"
          :disabled="!canAddTask"
        >
          Submit
        </button>
      </div>
    </form>
</template>