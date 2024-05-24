import { fetchData } from "."
import { AddSubtaskPayload, SubTask } from "../types"

export const fetchSubtasksRequest = (taskId: number) => {
    return fetchData<number, SubTask[]>({
        path: `/subtasks/${taskId}`, method: 'GET'
    })
}

export const toggleSubtasksRequest = (id: number) => {
    return fetchData<number, SubTask>({
        path: `/subtasks/${id}`, method: 'PUT'
    })
}

export const addSubtasksRequest = (taskId: number, payload: AddSubtaskPayload) => {
    return fetchData<any, SubTask>({
        path: `/subtasks/${taskId}`, method: 'POST', payload
    })
}

export const deleteSubtasksRequest = (id: number) => {
    return fetchData<number, SubTask>({
        path: `/subtasks/${id}`, method: 'DELETE'
    })
}