import { TaskState, type TaskInterface } from "@/interfaces/tasks";
import { reactive, ref, computed, onMounted } from "vue";

export default function useTaskList(storageKey: string) {
  const allTasks = ref([] as TaskInterface[]);

  function loadFromStorage(): void {
    const storageContent: string | null = localStorage.getItem(storageKey);
    const tasks = storageContent === null ? [] : JSON.parse(storageContent);
    allTasks.value = tasks;
  }

  function saveStorage(): void {
    localStorage.setItem(storageKey, JSON.stringify(allTasks.value));
  }

  function add(task: TaskInterface): void {
    allTasks.value = [...allTasks.value, task];
    saveStorage();
  }

  function replaceTaskById(id: number, task: TaskInterface): void {
    const filteredList = allTasks.value.filter(
      (task: TaskInterface) => task.id !== id
    );
    allTasks.value = [...filteredList, task];
    saveStorage();
  }

  function filterByState(state: TaskState): TaskInterface[] {
    return allTasks.value.filter(
      (task: TaskInterface) => task.status === state
    );
  }

  return {
    all: allTasks,
    filterByState,
    replaceTaskById,
    loadFromStorage,
    add,
  };
}
