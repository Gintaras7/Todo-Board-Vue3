import useTaskList from "../useTaskList";
import { expect, test, describe, vi, afterEach } from "vitest";
import { TaskState, type TaskInterface } from "@/interfaces/tasks";

const TODO_LOCAL_STORAGE_KEY = "testing"

describe('Task list', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')

    afterEach(() => {
        localStorage.clear()
    })

    test("load from storage", async () => {
        const tasksList = useTaskList(TODO_LOCAL_STORAGE_KEY);
        tasksList.loadFromStorage()
        expect(getItemSpy).toHaveBeenCalledWith(TODO_LOCAL_STORAGE_KEY)
        expect(tasksList.all.value).toHaveLength(0);
    })


    test('adds new todo', () => {
        const tasksList = useTaskList(TODO_LOCAL_STORAGE_KEY);

        const todo: TaskInterface = {
            id: 2,
            title: "Testing app",
            description: "Tests are important",
            status: TaskState.IN_PROGRESS,
        }

        tasksList.add(todo)

        expect(setItemSpy).toHaveBeenCalledWith(TODO_LOCAL_STORAGE_KEY, JSON.stringify([todo]))
        expect(tasksList.all.value).toStrictEqual([todo])
    })



    test('replace task in list', () => {
        const tasksList = useTaskList(TODO_LOCAL_STORAGE_KEY);

        const todo: TaskInterface = {
            id: 2,
            title: "Testing app",
            description: "Tests are important",
            status: TaskState.IN_PROGRESS,
        }

        const updatedTask = { ...todo, status: TaskState.DONE };

        tasksList.add(todo)
        tasksList.replaceTaskById(todo.id,updatedTask)

        expect(tasksList.all.value[0].status).toStrictEqual(updatedTask.status)
    })

    test('filter tasks by state', () => {
        const tasksList = useTaskList(TODO_LOCAL_STORAGE_KEY);

        const todo: TaskInterface = {
            id: 2,
            title: "Testing app",
            description: "Tests are important",
            status: TaskState.IN_PROGRESS,
        }

        const updatedTask = { ...todo, status: TaskState.DONE };

        tasksList.add(todo)
        tasksList.add(updatedTask)

        const tasksInProgress = tasksList.filterByState(TaskState.IN_PROGRESS);

        expect(tasksInProgress).toHaveLength(1);
        expect(tasksInProgress[0].status).toBe(TaskState.IN_PROGRESS)
    })
})


