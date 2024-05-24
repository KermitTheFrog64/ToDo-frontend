import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SubTask } from "../../5_shared/types";
import { addSubtasksRequest, deleteSubtasksRequest, fetchSubtasksRequest, toggleSubtasksRequest } from "../../5_shared/api/subtaskAPI";
import { ResponseOptions } from "../../5_shared/api";
import { AppState } from "../../0_app/store";

interface InitialState {
    subtasks: SubTask[]
}

const initialState: InitialState = {
    subtasks: []
}


export const fetchSubtasks = createAsyncThunk('subtasks/get', async (id: number) => {
    return await fetchSubtasksRequest(id)
})

export const toggleSubtask = createAsyncThunk('subtask/put', async (id: number) => {
    return await toggleSubtasksRequest(id)
})

export const addSubtask = createAsyncThunk('subtask/post', async ({ taskId, name }: { taskId: number, name: string }) => {    
    return await addSubtasksRequest(taskId, { name })
})

export const deleteSubtask = createAsyncThunk('subtask/delete', async (id: number) => {
    return await deleteSubtasksRequest(id)
})

export const subtaskSlice = createSlice({
    name: 'subtask',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubtasks.fulfilled, (state, {payload} : PayloadAction<ResponseOptions<SubTask[]>>) => {
                if (payload.data) {
                    state.subtasks = payload.data
                }
            })
            .addCase(toggleSubtask.fulfilled, (state, { payload }: PayloadAction<ResponseOptions<SubTask>>) => {
                if (payload.data) {
                    state.subtasks = state.subtasks.map((item) => item.id === payload?.data?.id ? item = payload.data : item)
                }
            })
            .addCase(addSubtask.fulfilled, (state, { payload }: PayloadAction<ResponseOptions<SubTask>>) => {
                if (payload.data) {
                    state.subtasks.push(payload.data)
                }
            })
            .addCase(deleteSubtask.fulfilled, (state, { payload }: PayloadAction<ResponseOptions<SubTask>>) => {
                if (payload?.data) {
                    state.subtasks = state.subtasks.filter((item) => item.id !== payload?.data?.id)
                }
            })
    }
})

export const getSubtasks = (state: AppState) => state.subtask.subtasks

export default subtaskSlice.reducer