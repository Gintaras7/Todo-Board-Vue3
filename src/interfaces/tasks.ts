export enum TaskState {
    OPENED = 1,
    IN_PROGRESS = 2,
    DONE = 3,
    CLOSED = 4
}


export interface TaskInterface {
    id: number,
    title: string,
    description: string,
    status: TaskState
}

export interface AllowedTaskTransitions {
    [name: number]: TaskState[]
}