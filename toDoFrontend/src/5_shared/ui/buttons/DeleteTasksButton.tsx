import { deleteEndedTasks } from '../../../2_widgets/project/project-slice'
import { useAppDispatch } from '../../hooks/redux'
import './buttons.scss'

interface DeleteTasksButtonProps {
    id: number
}

const DeleteTasksButton: React.FC<DeleteTasksButtonProps> = ({id}) => {

    const dispatch = useAppDispatch()

    return (
        <span className="material-symbols-outlined" onClick={() => dispatch(deleteEndedTasks(id))}>
            delete_forever
        </span>
    )
}

export default DeleteTasksButton