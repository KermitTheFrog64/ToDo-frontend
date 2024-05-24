import { useState } from "react"
import { Priority } from "../../5_shared/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchPrioritiesRequest, updateTaskRequest } from "../../5_shared/api/taskAPI"

interface TaskPriorityProps {
    priority?: Priority
    id: number
}

const TaskPriority: React.FC<TaskPriorityProps> = ({ priority, id }) => {

    const { data } = useQuery({
        queryFn: () => fetchPrioritiesRequest(),
        queryKey: ['priorities']
    })

    const { mutate } = useMutation({
        mutationFn: (selectedPriority: number) => updateTaskRequest( id, {priority: selectedPriority} )
    })

    const priorities = data?.data || []

    const [selectedValue, setSelectedValue] = useState<number>(priority ? priority.id : 0)

    const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const priorityId = Number(event.target.value)
        setSelectedValue(priorityId)
        const selectedPriority = priorities.find((item) => item.id === priorityId)
        selectedPriority && mutate(selectedPriority.id)
    }

    return (
        <div>
            <label htmlFor="priority">Priority</label>

            <select name="priority" id="priority" onChange={handlePriorityChange} value={selectedValue} >
                {priorities.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
            </select>
        </div>
    )
}

//TODO: Группировка по приоритетам? Поиск по приоритетам?

export default TaskPriority