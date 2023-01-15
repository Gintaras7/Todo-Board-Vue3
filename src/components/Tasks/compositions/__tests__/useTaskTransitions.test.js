import useTaskTransitions from "../useTaskTransitions.ts";
import { expect, test } from "vitest";
import { TaskState } from "@/interfaces/tasks";

test("allowed transitions", async () => {
    const { allowedTransitions } = useTaskTransitions(TaskState.OPENED)
    expect(allowedTransitions()).toEqual([TaskState.IN_PROGRESS, TaskState.CLOSED]);
})

test("opened allowed transitions", async () => {
    const { canTransit } = useTaskTransitions(TaskState.OPENED)

    expect(canTransit(TaskState.IN_PROGRESS)).toBeTruthy();
    expect(canTransit(TaskState.DONE)).toBeFalsy();
    expect(canTransit(TaskState.CLOSED)).toBeTruthy();
})

test("in progress allowed transitions", async () => {
    const { canTransit } = useTaskTransitions(TaskState.IN_PROGRESS)

    expect(canTransit(TaskState.OPENED)).toBeFalsy();
    expect(canTransit(TaskState.DONE)).toBeTruthy();
    expect(canTransit(TaskState.CLOSED)).toBeTruthy();
})

test("done allowed transitions", async () => {
    const { canTransit } = useTaskTransitions(TaskState.DONE)

    expect(canTransit(TaskState.OPENED)).toBeFalsy();
    expect(canTransit(TaskState.IN_PROGRESS)).toBeFalsy();
    expect(canTransit(TaskState.CLOSED)).toBeTruthy();
})

test("closed allowed transitions", async () => {
    const { canTransit } = useTaskTransitions(TaskState.CLOSED)

    expect(canTransit(TaskState.OPENED)).toBeTruthy();
    expect(canTransit(TaskState.IN_PROGRESS)).toBeFalsy();
    expect(canTransit(TaskState.DONE)).toBeFalsy();
})