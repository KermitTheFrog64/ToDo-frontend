import './buttons.scss'

interface AddButtonProps {
    handleClick: () => void
}

const AddButton: React.FC<AddButtonProps> = ({ handleClick }) => {
    return (
        <span className="material-icons add-icon" onClick={handleClick} >
            add_circle
        </span>
    )
}

export default AddButton