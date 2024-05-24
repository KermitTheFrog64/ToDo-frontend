import React, { useEffect, useState } from "react"
import { DragDropContext } from 'react-beautiful-dnd'
import { TasksColumn } from "../../5_shared/ui"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../5_shared/hooks/redux"
import { addTask, fetchCurrentProject, getCurrentProject, reorderTasks, reorderTasks2, reorderTasks3 } from "./project-slice"
import { TaskModal } from "../task"
import './project.scss'
import AddTaskModal from "./AddTaskModal"
import { AddButton } from "../../5_shared/ui/buttons"
import DeleteTasksButton from "../../5_shared/ui/buttons/DeleteTasksButton"
import { Error } from "../../5_shared/ui/error"
import { SearchBar } from "../../3_features"
import { Task } from "../../5_shared/types"
import filteredColumn from "./filteredColumn"
import Menu from "../../5_shared/ui/menu/Menu"

const Project: React.FC = () => {

    const { projectId } = useParams()

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCurrentProject(Number(projectId)))
    }, [])

    const project = useAppSelector(getCurrentProject)
      
    const handleDragEnd = (result: any) => {    
        dispatch(reorderTasks(result))
        dispatch(reorderTasks2())
        dispatch(reorderTasks3(result))
    }

    ////////////////////////////////////////////////////////////////////

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const [taskId, setTaskId] = useState<number>()

    const handleTaskClick = (id: number) => {
        setTaskId(id)
        setIsModalOpen(true)
    }

    /////////////////////////////////////////////////////////////////////

    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)

    const handleAddTaskClick = () => {
        setIsAddModalOpen(true)
    }

    /////////////////////////////////////////////////////////////////////

    const [search, setSearch] = useState<string>('')

    /////////////////////////////////////////////////////////////////////

    if (!project) return (
        <Error name="The project is unavailable" />
    )

    const { name, tasks } = project

    let queue: Task[] = []
    let dev: Task[] = []
    let done: Task[] = []

    if (tasks) {
        queue = filteredColumn('queue', tasks, search)
        dev = filteredColumn('dev', tasks, search)
        done = filteredColumn('done', tasks, search)
    }

    /////////////////////////////////////////////////////////////////////////////

    const onTaskModal = (task: Task) => {
        dispatch(addTask(task))
        dispatch(reorderTasks2())
    }
    
    return (
        <div>
            {name}
            <SearchBar search={search} setSearch={setSearch}/>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="columns" >
                    <TasksColumn
                        id={'queue'}
                        name="Queue"
                        tasks={queue}
                        handleTaskClick={handleTaskClick}
                    />
                    <TasksColumn
                        id={'dev'}
                        name="Development"
                        tasks={dev}
                        handleTaskClick={handleTaskClick}
                    />
                    <TasksColumn
                        id={'done'}
                        name="Done"
                        tasks={done}
                        handleTaskClick={handleTaskClick}
                    />
                </div>
            </DragDropContext>


            {taskId && isModalOpen && <TaskModal setIsModalOpen={setIsModalOpen} taskId={taskId} />}

            <AddButton handleClick={handleAddTaskClick} />

            <DeleteTasksButton id={Number(projectId)}/>

            {isAddModalOpen && <AddTaskModal setIsModalOpen={setIsAddModalOpen} projectId={Number(projectId)} onSave={onTaskModal} />}
        </div>
    )
}

export default Project