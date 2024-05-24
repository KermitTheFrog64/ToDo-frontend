import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../5_shared/hooks/redux"
import { addSubtask, deleteSubtask, fetchSubtasks, getSubtasks, toggleSubtask } from "./subtask-slice"
import './subtasks.scss'
import DeleteButton from "../../5_shared/ui/buttons/DeleteButton"

interface TaskSubtasksProps {
    id: number
}

const TaskSubtasks: React.FC<TaskSubtasksProps> = ({ id }) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchSubtasks(id))
      }, [])

      const subtasks = useAppSelector(getSubtasks)

    const [inputValue, setInputValue] = useState<string>('')

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value)
    }

    const handleAddClick = () => {
        dispatch(addSubtask({ taskId: id, name: inputValue }))        
        setInputValue('')
    }

    const handleSubtaskClick = (id: number) => {
        dispatch(toggleSubtask(id))
        
    }

    const handleDeleteClick = (event: React.MouseEvent, id: number) => {
      event.stopPropagation()
      dispatch(deleteSubtask(id))
    }

    //TODO: добавить сортировку по выполненным и невыполненным, сокрытие выполненных и удаление всех выполненных

    if (!subtasks) return

    return (
        <>
            <div>Subtasks:</div>
            <ul>
                {subtasks.map((item) => <li
                    key={item.id}
                    onClick={() => handleSubtaskClick(item.id)}
                    className={item.isEnded ? 'checked' : ''}
                >
                    <span>{item.name}</span>
                    <DeleteButton kind='subtask' onClick={(event) => handleDeleteClick(event, item.id)}/>
                </li>)}
            </ul>
            <input
                type="text"
                placeholder="Subtusk"
                value={inputValue}
                onChange={handleInputChange}
            />
            <span onClick={handleAddClick} >Add</span>
        </>
    )
}

export default TaskSubtasks