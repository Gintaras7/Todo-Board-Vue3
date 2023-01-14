import { reactive, ref, computed, onMounted } from 'vue'
import { TaskState, type AllowedTaskTransitions } from "@/interfaces/tasks";

export default function useTaskTransitions(state: TaskState) {

  function transitionsMap(): AllowedTaskTransitions {
    return {
      [TaskState.OPENED]: [TaskState.IN_PROGRESS, TaskState.CLOSED],
      [TaskState.IN_PROGRESS]: [TaskState.CLOSED, TaskState.DONE],
      [TaskState.DONE]: [TaskState.CLOSED],
      [TaskState.CLOSED]: [TaskState.OPENED]
    }
  }

  function allTransitions(): { key: TaskState, title: string }[] {
    return [
      { key: TaskState.OPENED, title: "Opened" },
      { key: TaskState.IN_PROGRESS, title: "In progress" },
      { key: TaskState.DONE, title: "Done" },
      { key: TaskState.CLOSED, title: "Closed" }
    ]
  }
  
  function allowedTransitions(): TaskState[] {
    return transitionsMap()[state]

  }

  function canTransit(toState: TaskState): boolean {
    return allowedTransitions().includes(toState)
  }

  const allowedTransitionsList = computed(() => {
    return allTransitions().filter((transition: { key: TaskState }) => canTransit(transition.key))
  })

  return {
    allowedTransitions,
    allowedTransitionsList,
    canTransit
  }

}