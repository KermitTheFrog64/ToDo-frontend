import { Draggable } from "react-beautiful-dnd"
import { Task } from "../../5_shared/types"

interface TaskCardProps extends Task {
    handleTaskClick: (id: number) => void
    index: number
}

const TaskCard: React.FC<TaskCardProps> = ({ id, name, index, handleTaskClick }) => {   
    return (
        <Draggable draggableId={id.toString()} index={index} >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => handleTaskClick(id)}
                >
                    {name}
                </div>
            )}
        </Draggable>
    )
}

export default TaskCard