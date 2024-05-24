import { ButtonHTMLAttributes } from 'react'
import './buttons.scss'

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    kind: string | string[]
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ kind, ...props }) => {

    let classList = ''

    if (kind === 'subtask') {
        classList = ["material-symbols-outlined", 'subtask-remove-button'].join(' ')
    }
    if (kind === 'projects') {
        classList = "material-symbols-outlined"
    }

    return (
        <button className={classList} {...props} >
            delete
        </button>
    )
}

export default DeleteButton