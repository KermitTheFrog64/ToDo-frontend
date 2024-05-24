import { Droppable } from "react-beautiful-dnd"
import { Task } from "../../5_shared/types"
import { TaskCard } from "../../5_shared/ui"
import Column from "../../5_shared/ui/column/Column"


export interface TasksColumnProps {
    id: string
    name: string
    tasks?: Task[]
    handleTaskClick: (id: number) => void
}

const TasksColumn: React.FC<TasksColumnProps> = ({ id, name, tasks, handleTaskClick }) => {      
    return (
        <Column>
            <Droppable droppableId={id} >
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="test"
                    >
                        <h3>{name}</h3>
                       
                        {tasks?.map((task, index) =>
                            <TaskCard
                                key={index}
                                index={index}
                                {...task}
                                handleTaskClick={handleTaskClick}
                            />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Column>
    )
}

export default TasksColumn