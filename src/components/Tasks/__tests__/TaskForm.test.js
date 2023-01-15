import { mount } from "@vue/test-utils";
import TaskForm from "../TaskForm.vue";
import { expect, test, vi } from "vitest";
import { TaskState } from "@/interfaces/tasks"

test("form emits output", async () => {
    expect(TaskForm).toBeTruthy();
    const wrapper = await mount(TaskForm, {});

    const expectedTitle = 'Test some code';
    const expectedDescription = "Testing is important"

    const title = wrapper.find('#title')
    await title.setValue(expectedTitle)

    const description = wrapper.find('#description')
    await description.setValue(expectedDescription)

    expect(title.element.value).toBe(expectedTitle)
    expect(description.element.value).toBe(expectedDescription)

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('submitted')[0][0]).toEqual({
        description: expectedDescription,
        title: expectedTitle,
        status: TaskState.OPENED
    })
})

